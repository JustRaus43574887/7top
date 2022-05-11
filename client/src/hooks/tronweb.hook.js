import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { buyAction, getBalance } from "../redux/actions/tronActions";

import useMessage from "./message.hook";

const useTronWeb = () => {
  const [myTickets, setMyTickets] = useState([]);

  const message = useMessage();
  const dispatch = useDispatch();
  const { tronWeb, me, contract } = useSelector(
    ({ tronWeb, me, contract, owners }) => ({
      tronWeb,
      me,
      contract,
      owners,
    })
  );

  const checkAuth = useCallback(() => {
    if (me) return false;
    else message("Please, authorize");
    return true;
  }, [me, message]);

  const checkTronWeb = useCallback(() => {
    if (tronWeb.instance === null) {
      message("Please, install tronLink");
      return true;
    }
    if (tronWeb.instance === false) {
      message("Please, login tronLink");
      return true;
    }
    if (tronWeb.instance.fullNode.host !== "https://api.shasta.trongrid.io") {
      message("Please, change node to Shasta TronGrid");
      return true;
    }
    return false;
  }, [tronWeb, message]);

  useEffect(() => {
    (async () => {
      try {
        if (tronWeb.instance && !me.wallet) return;
        const lottery = await tronWeb.instance.contract().at(tronWeb[contract]);
        const ticks = await lottery.getMyTickets(me.wallet).call();
        const arrayOfTicks = [];
        for (let i in ticks) {
          arrayOfTicks.push(tronWeb.instance.toDecimal(ticks[i]._hex));
        }
        setMyTickets(arrayOfTicks);
      } catch (e) {}
    })();
  }, [checkTronWeb, me, contract, tronWeb]);

  const buyTicket = useCallback(async () => {
    try {
      if (checkTronWeb() || checkAuth()) return;
      const lottery = await tronWeb.instance.contract().at(tronWeb[contract]);
      await lottery.buyTicket().send({
        feeLimit: 30_000_000,
        callValue: await lottery.calculateTrx(1).call(),
      });
      message("Success!");
      dispatch(buyAction({ me }));
      dispatch(getBalance({ contract }));
      setMyTickets((ticks) => [ticks[0] + 1, ...ticks]);
    } catch (e) {
      message(typeof e === "object" ? e.message : e);
    }
  }, [checkTronWeb, checkAuth, dispatch, me, contract, message, tronWeb]);

  return { buyTicket, myTickets };
};

export default useTronWeb;
