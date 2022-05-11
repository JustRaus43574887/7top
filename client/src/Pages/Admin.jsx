import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useHttp from "../hooks/http.hook";

import Account from "../Components/Account";
import Week5 from "../Components/Admin/Week5";
import Week50 from "../Components/Admin/Week50";
import Month5 from "../Components/Admin/Month5";
import Year5 from "../Components/Admin/Year5";

import "../css/game.css";
import "../css/account.css";

const Admin = () => {
  const { request } = useHttp();

  const [winNumber, setWinNumber] = useState();
  const [admin, setAdmin] = useState(false);
  const { instance, SevenTOP } = useSelector(({ tronWeb }) => tronWeb);
  const me = useSelector(({ me }) => me);

  const getWinNumber = useCallback(async () => {
    if (instance) {
      const sevenTOP = await instance.contract().at(SevenTOP);
      let number = await sevenTOP.winNumberOne().call();
      number = instance.toDecimal(number._hex);
      setWinNumber(number);
    }
  }, [instance, SevenTOP]);

  useEffect(() => {
    getWinNumber();
  }, [getWinNumber]);

  useEffect(() => {
    (async () => {
      try {
        if (instance && me) {
          const result = await request(
            "/api/auth/admin",
            "POST",
            {
              userId: me._id,
            },
            { Authorization: `Bearer ${localStorage.getItem("token")}` }
          );

          if (result.admin && me.wallet === instance.defaultAddress.base58)
            setAdmin(result.admin);
          else setAdmin(result.admin);
        }
      } catch (e) {}
    })();
  }, [instance, me, request]);

  if (!instance)
    return (
      <p
        style={{
          color: "white",
        }}
      >
        Check TronLink
      </p>
    );

  if (!admin)
    return (
      <p
        style={{
          color: "white",
        }}
      >
        You are not an admin
      </p>
    );

  return (
    <div className="row game">
      <section>
        <Account backBtn showWallet />
      </section>
      <p className="p2">{winNumber}</p>
      <section>
        <div className="container">
          <div className="acc-wrap">
            <Week5 getWinNumber={getWinNumber} />
            <Week50 getWinNumber={getWinNumber} />
          </div>
        </div>
      </section>
      <br />
      <section>
        <div className="container">
          <div className="acc-wrap">
            <Month5 />
          </div>
        </div>
      </section>
      <br />
      <section>
        <div className="container">
          <div className="acc-wrap">
            <Year5 />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin;
