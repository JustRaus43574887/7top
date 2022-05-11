import { useCallback } from "react";
import { useSelector } from "react-redux";
import useMessage from "../../../hooks/message.hook";
import useHttp from "../../../hooks/http.hook";

const Buttons = ({ form, getWinNumber, name, setSellTicks, sellTicks }) => {
  const tronWeb = useSelector(({ tronWeb }) => tronWeb);

  const message = useMessage();
  const { request } = useHttp();

  const drawing = useCallback(async () => {
    if (tronWeb.instance) {
      if (sellTicks) return message("Stop selling tickets");
      try {
        const contract = await tronWeb.instance.contract().at(tronWeb[name]);
        await contract.drawing().send({
          feeLimit: 200_000_000,
        });
        const result = await request(`/api/tron/balls/list/${name}`, "POST", {
          time: Date.now(),
        });
        if (result) {
          message(result.message);
          await request("/api/tron/sell", "POST", { drawing: true });
        }
      } catch (e) {
        message(e);
      }
    }
  }, [tronWeb, message, request, sellTicks, name]);

  const handleSend = useCallback(async () => {
    if (tronWeb.instance && tronWeb.SevenTOP) {
      if (sellTicks) return message("Stop selling tickets");
      let string = "";
      for (const [_, value] of Object.entries(form)) string += value;
      try {
        const sevenTOP = await tronWeb.instance.contract().at(tronWeb.SevenTOP);
        await sevenTOP.sendAndGetwinNumber(parseInt(string, 10)).send({
          feeLimit: 200_000_000,
        });
        getWinNumber();
        const res = request(`/api/tron/balls/${name}`);
        if (res) message(res.message);
      } catch (e) {
        message(e);
      }
    }
  }, [tronWeb, form, getWinNumber, sellTicks, message, name, request]);

  const sellOrStopSellTickets = useCallback(async () => {
    if (tronWeb.instance)
      try {
        const contract = await tronWeb.instance.contract().at(tronWeb[name]);
        await contract.sellOrStopSellTickets().send();
        setSellTicks((ticks) => {
          (async () =>
            await request("/api/tron/sell", "POST", { [name]: !ticks }))();
          return !ticks;
        });
      } catch (e) {
        console.log(e);
      }
  }, [tronWeb, setSellTicks, request, name]);

  return (
    <div className="row">
      <div className="col s3">
        <button
          onClick={drawing}
          className="acc-btn acc-darwing"
          style={{ float: "right" }}
        >
          DRAWING
        </button>
      </div>
      <div className="col s3">
        <button onClick={handleSend} className="acc-btn acc-send">
          Send
        </button>
      </div>
      <div className="col s3">
        <button
          onClick={sellOrStopSellTickets}
          className="acc-btn acc-stop"
          style={{ float: "right" }}
        >
          Stop
        </button>
      </div>

      <div className="col s3">
        <button onClick={sellOrStopSellTickets} className="acc-btn acc-sell">
          Start
        </button>
      </div>
    </div>
  );
};

export default Buttons;
