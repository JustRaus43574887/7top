const router = require("express").Router();
const Language = require("../models/Language");
const User = require("../models/User");
const { paginateResults, getAvatarPath } = require("../utils");

//-------------Timer-----------------------------------
let weekTime = 0;
let monthTime = 0;
let yearTime = 0;
//-----------------------------------------------------

router.get("/language/:lang", async (req, res) => {
  const language = req.params.lang;

  try {
    const result = await Language.findOne({ language });
    if (result === null) throw new Error("Requested language not found");
    return res.status(200).json({ ok: true, result });
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "Requested language not found" });
  }
});

router.get("/time/:name", async (req, res) => {
  try {
    res.json({ time: eval(req.params.name) });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.get("/time", async (req, res) => {
  try {
    res.json({ weekTime, monthTime, yearTime });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.get("/allusers", async (req, res) => {
  try {
    const users = await User.find();
    const allUsers = paginateResults({
      results: users,
      pageSize: 10,
      after: req.query.after,
    });

    res.json({
      allUsersLength: users.length,
      cursor: allUsers.length ? allUsers[allUsers.length - 1]._id : null,
      hasMore: allUsers.length
        ? allUsers[allUsers.length - 1]._id !== users[users.length - 1]._id
        : false,
      allUsers: allUsers.map(({ _doc }) => ({
        ...(({ password, friendId, ...rest }) => rest)(_doc),
        avatar: getAvatarPath({ id: _doc._id }),
      })),
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

module.exports = router;

//--------------------------------------------------------------------------

function diffSubtract(date1, date2) {
  return date2 - date1;
}

const end_date_month = {
  full_year: "2021", // Год
  month: "02", // Номер месяца
  day: "13", // День
  hours: "07", // Час
  minutes: "00", // Минуты
  seconds: "00", // Секунды
};
const end_date_str_month = `${end_date_month.full_year}-${end_date_month.month}-${end_date_month.day}T${end_date_month.hours}:${end_date_month.minutes}:${end_date_month.seconds}`;

const funcaMonth = (date, timer) => {
  let now = new Date();
  //new Date(end_date_str_week);
  let ms_left = diffSubtract(now, date);
  if (ms_left <= 0) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 28);
    clearInterval(timer);
    timer = setInterval(() => funcaMonth(newDate, timer), 1000);
  } else monthTime = ms_left;
};

const monthtimer = setInterval(
  () => funcaMonth(new Date(end_date_str_month), monthtimer),
  1000
);

const end_date_week = {
  full_year: "2021", // Год
  month: "02", // Номер месяца
  day: "13", // День
  hours: "07", // Час
  minutes: "00", // Минуты
  seconds: "00", // Секунды
};
const end_date_str_week = `${end_date_week.full_year}-${end_date_week.month}-${end_date_week.day}T${end_date_week.hours}:${end_date_week.minutes}:${end_date_week.seconds}`;

const funcaWeek = (date, timer) => {
  let now = new Date();
  //new Date(end_date_str_week);
  let ms_left = diffSubtract(now, date);
  if (ms_left <= 0) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 7);
    clearInterval(timer);
    timer = setInterval(() => funcaWeek(newDate, timer), 1000);
  } else weekTime = ms_left;
};

const weektimer = setInterval(
  () => funcaWeek(new Date(end_date_str_week), weektimer),
  1000
);

const end_date = {
  full_year: "2022", // Год
  month: "01", // Номер месяца
  day: "01", // День
  hours: "07", // Час
  minutes: "00", // Минуты
  seconds: "00", // Секунды
};
const end_date_str = `${end_date.full_year}-${end_date.month}-${end_date.day}T${end_date.hours}:${end_date.minutes}:${end_date.seconds}`;

const funcaYear = (date, timer) => {
  let now = new Date();
  //new Date(end_date_str_week);
  let ms_left = diffSubtract(now, date);
  if (ms_left <= 0) {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + 1);
    clearInterval(timer);
    timer = setInterval(() => funcaYear(newDate, timer), 1000);
  } else yearTime = ms_left;
};

const yeartimer = setInterval(
  () => funcaYear(new Date(end_date_str), yeartimer),
  1000
);
