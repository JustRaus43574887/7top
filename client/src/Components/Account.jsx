import { useEffect, useState } from "react";
import styles from "../css/account.module.css";
import "../css/acc.css";

import useHttp from "../hooks/http.hook";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getFriends, getMe } from "../redux/actions/mainActions";

import Left from "../img/left.png";
import Place1 from "../img/place1.png";
import Logo from "../img/noavatar.jpg";
import { ImageUpload } from "./Upload";

const Account = ({ backBtn = false, showWallet = false, winnerList }) => {
  const allUsersLength = useSelector(({ users }) => users.allUsersLength);
  const language = useSelector(({ language }) => language);
  const total = useSelector(({ friends }) => friends.total);
  const me = useSelector(({ me }) => me);
  const { request } = useHttp();
  const [admin, isAdmin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!me) dispatch(getMe());
  }, [dispatch, me]);

  useEffect(() => {
    if (me)
      (async () => {
        try {
          const result = await request(
            "/api/auth/admin",
            "POST",
            { userId: me._id },
            {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          );
          isAdmin(result.admin);
        } catch (e) {
          console.log(e.message);
        }
      })();
  }, [me, request]);

  useEffect(() => {
    if (!allUsersLength) dispatch(getUsers());
  }, [dispatch, allUsersLength]);

  useEffect(() => {
    if (me && !allUsersLength) dispatch(getFriends(me.wallet));
  }, [me, allUsersLength, dispatch]);

  const logoutHandler = () => localStorage.removeItem("token");

  return (
    <header className="header" id="header">
      <div className={styles.container + " container"}>
        <div className={styles.account}>
          {backBtn && (
            <NavLink to="/allgames" className={styles.left}>
              <img src={Left} alt="left" />
            </NavLink>
          )}

          <div className={styles.profile}>
            {me ? (
              <>
                {" "}
                <div className={styles.elipse}>
                  {
                    <ImageUpload
                      img={me.avatar}
                      id={me._id}
                      token={localStorage.getItem("token")}
                    />
                  }
                </div>
                <p className={styles.p1}>{me.name}</p>
              </>
            ) : (
              <img src={Logo} alt="logo" className="prev-logo" />
            )}
          </div>

          {winnerList && (
            <NavLink to="/winners" className={styles.winnersBtn}>
              <img src={Place1} alt="star" />
              <span>{language.result.page.account[0]}</span>
            </NavLink>
          )}

          {me && (
            <a href="/" onClick={logoutHandler} className={styles.logout}>
              <i className="fa fa-sign-out fa-2x" aria-hidden="true"></i>
            </a>
          )}
        </div>

        <div className={styles.info}>
          <div className={styles.links}>
            {me && (
              <NavLink to="/friends">
                {total} {language.result.page.account[1]}
              </NavLink>
            )}
            <NavLink to="/people">
              {allUsersLength} {language.result.page.account[2]}
            </NavLink>
            {showWallet && me ? (
              <a>
                {language.result.page.account[3]}:{" "}
                {me.wallet.substr(0, 6) + "..." + me.wallet.substr(30, 4)}
              </a>
            ) : (
              <>
                {!me && (
                  <>
                    {" "}
                    <NavLink to="/login">
                      {language ? language.result.page.account[4] : "Login"}
                    </NavLink>
                    <NavLink to="/register">
                      {language
                        ? language.result.page.account[5]
                        : "Registration"}
                    </NavLink>
                  </>
                )}
                <a
                  href="https://t.me/joinchat/HSApdhx_OO301lltbkyfhw"
                  className={styles.chat}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa fa-telegram" aria-hidden="true"></i>
                  <span>{language.result.page.account[6]}</span>
                </a>
              </>
            )}
            {admin ? <NavLink to="/admin">Admin</NavLink> : ""}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Account;
