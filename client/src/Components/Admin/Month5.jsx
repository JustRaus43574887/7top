import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Pannel from "./Control/Pannel";
import Form from "./Control/Form";
import Buttons from "./Control/Buttons";

const Week5 = ({ getWinNumber }) => {
  const { instance, Month5 } = useSelector(({ tronWeb }) => tronWeb);
  const [contract, setContract] = useState(null);
  const [sellTicks, setSellTicks] = useState(false);

  useEffect(() => {
    if (instance)
      (async () => {
        const contract = await instance.contract().at(Month5);
        setContract(contract);
      })();
  }, [instance, Month5]);

  const [form, setForm] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    six: "",
  });

  return (
    <>
      <Pannel
        contract={contract}
        sellTicks={sellTicks}
        setSellTicks={setSellTicks}
        name="Month5"
      />
      <Form form={form} setForm={setForm} />
      <Buttons
        form={form}
        getWinNumber={getWinNumber}
        sellTicks={sellTicks}
        setSellTicks={setSellTicks}
        name="Month5"
      />
    </>
  );
};

export default Week5;
