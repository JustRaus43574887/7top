const router = require("express").Router();
const TronWeb = require("tronweb");
const TronGrid = require("trongrid");
const User = require("../models/User");
const Ball = require("../models/Ball");
const ListBall = require("../models/ListBall");
const { paginateResults, getAvatarPath } = require("../utils");

const TRONGRID_API = "https://api.shasta.trongrid.io";
const DEFAULT_ADDRESS = "TBm1ymSid31J4LBbUQ6dnCMem5tTYWc4Fg";

const tronweb = new TronWeb(TRONGRID_API, TRONGRID_API, TRONGRID_API);
tronweb.defaultAddress = {
  hex: tronweb.address.toHex(DEFAULT_ADDRESS),
  base58: DEFAULT_ADDRESS,
};

const trongrid = new TronGrid(tronweb);

const gamesAddress = {
  LimitLottery5: "TRGCoM8ForcJhHXCE3RsWouF14V3rPixSu",
  LimitLottery15: "TArRpQXzAutbdn3rZfPmMQzHx2rn4uRGy5",
  LimitLottery50: "TSmijEjGX7F2MY9nUJbaiB1xqgVbN7bYvX",
  Everyweek5: "TYk1bmKpaASD8MHLXr6QipNYdtUAAHno4f",
  Everyweek50: "TKF9zmQpKHPgA9FxuSVHpogiucTGVRHBWN",
  Month5: "TVGniJKSx13v74zfwZL16pjvGUVf4xQynD",
  EveryYear5: "TBcYVCEM5Y2dXVGg7ojTyN6pHeuWnRThBf",
};

const games = {
  LimitLottery5: "TRGCoM8ForcJhHXCE3RsWouF14V3rPixSu",
  LimitLottery15: "TArRpQXzAutbdn3rZfPmMQzHx2rn4uRGy5",
  LimitLottery50: "TSmijEjGX7F2MY9nUJbaiB1xqgVbN7bYvX",
  Everyweek5: "TYk1bmKpaASD8MHLXr6QipNYdtUAAHno4f",
  Everyweek50: "TKF9zmQpKHPgA9FxuSVHpogiucTGVRHBWN",
  Month5: "TVGniJKSx13v74zfwZL16pjvGUVf4xQynD",
  EveryYear5: "TBcYVCEM5Y2dXVGg7ojTyN6pHeuWnRThBf",
};

const addresses = {
  RefStorage: "TA2kGcLfZJhW8Mf6nBEjAQL2HLS8KwToE6",
  SevenTOP: "TQUWfMQmhuGGqYXfa3LNWXKAtoc1RZcgMV",
};

(async () => {
  for (const [key, value] of Object.entries(games)) {
    games[key] = await tronweb.contract().at(value);
  }
})();

(async () => {
  for (const [key, value] of Object.entries(addresses)) {
    addresses[key] = await tronweb.contract().at(value);
  }
})();

router.get("/allgames", async (_, res) => {
  try {
    const data = [];
    for (const [_, value] of Object.entries(games)) {
      const obj = {
        sum: Math.floor(
          tronweb.toDecimal((await value.getSumOnContract().call())._hex) / 1e12
        ),
        ticketsLength: tronweb.toDecimal(
          (await value.getTicketsLength().call())._hex
        ),
      };
      data.push(obj);
    }
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error!" });
  }
});

router.get("/owners/:contract", async (req, res) => {
  try {
    const data = await (await games[req.params.contract])
      .ownersOfTickets()
      .call();
    const wallets = data.map((wallet) => tronweb.address.fromHex(wallet));
    const users = await User.find({ wallet: wallets });

    const result = wallets.map((wallet, index) => {
      const temp = users.filter((user) => wallet === user.wallet)[0];
      if (temp)
        return {
          name: temp.name,
          cursorKey: index,
          avatar: getAvatarPath({ id: temp._id }),
        };
      else
        return {
          name: wallet.substr(0, 6) + "..." + wallet.substr(30, 4),
          cursorKey: index,
          avatar: getAvatarPath({ id: 0 }),
        };
    });

    const pagResult = paginateResults({
      results: result,
      pageSize: 10,
      after: req.query.after,
      cursorKey: "cursorKey",
    });

    res.json({
      total: wallets.length,
      cursor: pagResult.length
        ? pagResult[pagResult.length - 1].cursorKey
        : null,
      hasMore: pagResult.length
        ? pagResult[pagResult.length - 1].cursorKey !==
          result[result.length - 1].cursorKey
        : false,
      owners: pagResult,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error!" });
  }
});

router.get("/balance/:contract", async (req, res) => {
  try {
    const data = await (await games[req.params.contract])
      .getSumOnContract()
      .call();

    const balance = tronweb.toDecimal(data._hex);
    res.json({ balance: Math.floor(balance / 1e12) });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error!" });
  }
});

router.get("/winners/:contract", async (req, res) => {
  try {
    const { contract } = req.params;
    const names = ["firstWinner", "secondWinner"];

    const trxPrice = tronweb.toDecimal(
      (await addresses.SevenTOP.trxPrice().call())._hex
    );
    const data = [];

    for (let i in names) {
      const trans = await trongrid.contract.getEvents(gamesAddress[contract], {
        event_name: names[i],
        limit: 1,
      });
      if (trans.data[0])
        data.push({
          amount: ((trans.data[0].result.amount * trxPrice) / 1e12).toFixed(2),
          timestapmt: trans.data[0].result.timestapmt,
          user: tronweb.address.fromHex(trans.data[0].result.user),
        });
    }

    if (data[1] && data[0].timestapmt - data[1].timestapmt >= 1000)
      data.splice(1, 1);

    const result = [];
    for (let i in data) {
      result.push({
        ...data[i],
        user: (({ _id, name }) => ({
          _id,
          name,
          avatar: getAvatarPath({ id: _id }),
        }))(await User.findOne({ wallet: data[i].user })),
      });
    }

    res.json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error!" });
  }
});

router.get("/friends/:wallet", async (req, res) => {
  try {
    const wallets = (
      await (await addresses.RefStorage).getReferals(req.params.wallet).call()
    ).map((wallet) => tronweb.address.fromHex(wallet));

    const friends = [];
    for (let i in wallets) {
      const user = await User.findOne({ wallet: wallets[i] });
      friends.push({
        cursorKey: i,
        name: user ? user.name : wallets[i],
        avatar: getAvatarPath({ id: user ? user._id : "noavatar" }),
      });
    }

    const pagFriends = paginateResults({
      results: friends,
      pageSize: 10,
      after: req.query.after,
      cursorKey: "cursorKey",
    });

    res.json({
      total: friends.length,
      cursor: pagFriends.length
        ? pagFriends[pagFriends.length - 1].cursorKey
        : null,
      hasMore: pagFriends.length
        ? pagFriends[pagFriends.length - 1].cursorKey !==
          friends[friends.length - 1].cursorKey
        : false,
      friends: pagFriends,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error!" });
  }
});

router.get("/winners", async (req, res) => {
  try {
    const trxPrice = tronweb.toDecimal(
      (await addresses.SevenTOP.trxPrice().call())._hex
    );

    const data = await trongrid.contract.getEvents(
      gamesAddress[req.query.contract],
      {
        event_name: req.query.name,
        max_timestamp:
          req.query.after.length === 0 ? req.query.after : req.query.after + 1,
        limit: 10,
      }
    );

    const result = data.data.map(({ event_name, block_timestamp, result }) => ({
      block_timestamp,
      event_name,
      amount: ((result.amount * trxPrice) / 1e12).toFixed(2),
      timestapmt: result.timestapmt,
      user: tronweb.address.fromHex(result.user),
    }));

    const wallets = result.map(({ user }) => user);
    const users = await User.find({ wallet: wallets });

    const results = result.map((res) => ({
      ...res,
      user: ((user) => ({
        name: user
          ? user.name
          : res.user.substr(0, 6) + "..." + res.user.substr(30, 40),
        avatar: getAvatarPath({ id: user ? user._id : "noavatar" }),
      }))(users.find(({ wallet }) => wallet === res.user)),
    }));

    res.json({
      cursor: results.length
        ? results[results.length - 1].block_timestamp
        : null,
      currentContract: req.query.contract,
      currentName: req.query.name,
      winners: results,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error!" });
  }
});

router.get("/balls/:contract", async (req, res) => {
  try {
    const players = await (await games[req.params.contract])
      .getTicketsLength()
      .call();

    const balls = await (await addresses.SevenTOP).winNumberOne().call();

    const result = await Ball.findOneAndUpdate(
      { name: req.params.contract },
      { balls, players },
      { useFindAndModify: false }
    );
    if (result) res.json({ message: "Success!" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error!" });
  }
});

router.get("/balls/list/all", async (_, res) => {
  try {
    const listBall = await ListBall.find();
    if (listBall) res.json(listBall);
    else res.json({ message: "Mongo error!" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error!" });
  }
});

router.get("/balls/list/:contract", async (req, res) => {
  try {
    const listBall = await ListBall.find({ name: req.params.contract })
      .limit(1)
      .sort({ _id: -1 });
    if (listBall) res.json(listBall);
    else res.json({ message: "Mongo error!" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error!" });
  }
});

router.post("/balls/list/:contract", async (req, res) => {
  try {
    const ball = await Ball.findOne({ name: req.params.contract });
    if (ball) {
      const listItem = new ListBall({
        name: ball.name,
        balls: ball.balls,
        players: ball.players,
        timestapmt: req.body.time,
      });
      await listItem.save();
      if (listItem) res.json({ message: "Success!" });
      else res.status(400).json({ messsage: "Mongo error!" });
    } else res.status(404).json({ message: "Ball not found" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error!" });
  }
});

router.post("/sell", (req, res) => {
  const io = req.app.get("io");
  io.emit("sell", req.body);
  res.status(200);
});

module.exports = router;
