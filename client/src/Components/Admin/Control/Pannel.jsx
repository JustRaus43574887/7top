import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Pannel = ({ contract, sellTicks, setSellTicks, name }) => {
  const instance = useSelector(({ tronWeb }) => tronWeb.instance);

  const [sum, setSum] = useState(0);
  const [ticksCount, setTicksCount] = useState(0);

  useEffect(() => {
    if (instance && contract)
      (async () => {
        let sumCont = await contract.getSumOnContract().call();
        sumCont = instance.toDecimal(sumCont._hex);
        setSum(Math.floor(sumCont / 1e12));
      })();
  }, [instance, contract]);

  useEffect(() => {
    if (contract)
      (async () => {
        const sell = await contract.sellTickets().call();
        setSellTicks(sell);
      })();
  }, [contract, setSellTicks]);

  useEffect(() => {
    if (instance && contract)
      (async () => {
        let tick = await contract.countOfTicket().call();
        tick = instance.toDecimal(tick._hex);
        setTicksCount(tick);
      })();
  }, [instance, contract]);

  return (
    <div className="row">
      <div className="col s4">
        <p className="p2">{sum} $</p>
      </div>
      <div className="col s4">
        <p className="p2">
          {name}{" "}
          <span style={{ color: sellTicks ? "greenyellow" : "red" }}>
            ({sellTicks ? "true" : "false"})
          </span>
        </p>
      </div>
      <div className="col s4">
        <p className="p2">{ticksCount} Tickets</p>
      </div>
    </div>
  );
};

export default Pannel;
