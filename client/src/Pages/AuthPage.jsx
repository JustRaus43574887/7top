import React, { useEffect, useState } from "react";
import useHttp from "../hooks/http.hook";
import useMessage from "../hooks/message.hook";
import { NavLink, useHistory } from "react-router-dom";
import "../css/register.css";

import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../redux/actions/mainActions";

import Img1 from "../img/img1.png";
import Logo from "../img/logo.png";

const AuthPage = () => {
  const history = useHistory();
  const message = useMessage();
  const dispatch = useDispatch();
  const { RefStorage } = useSelector(({ tronWeb }) => tronWeb);
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    wallet: "",
    friendId: "",
  });

  useEffect(() => {
    document.title =
      "Зарегистрируйся на сайте 7top.org для участия в лотереи. Выиграть джекпот может каждый";
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        "content",
        "Для регистрации потребуется ввести логин, электронную почту, пароль,  и адрес крипто кошелька Tron который вы сможете получить, скачав приложение Tronlink, а также логин или кошелек друга, если он Вас пригласил."
      );
  }, []);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const refStorage = await window.tronWeb.contract().at(RefStorage);
      const data = await request("/api/auth/register/valid", "POST", {
        ...form,
      });
      message(data.message);

      if (data.message === "User is valid!") {
        try {
          if (data.friendId.length !== 0) {
            await refStorage.addReferer(data.friendId).send();
          } else {
            await refStorage.regNewUser().send();
          }
        } catch (e) {
          if (e.error === "CONTRACT_VALIDATE_ERROR") return message(e.message);
          return message(e);
        }
      }

      let name = "";
      if (form.name[form.name.length - 1] === " ") {
        name = form.name.substring(0, form.name.length - 1);
      } else {
        name = form.name;
      }

      const result = await request("/api/auth/register", "POST", {
        ...form,
        name,
      });
      message(result.message);
      await loginHandler();
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("api/auth/login", "POST", { ...form });
      localStorage.setItem("token", data.token);
      dispatch(getMe());
      history.push("/allgames");
    } catch (e) {}
  };

  return (
    <div className="register">
      <header className="header" id="header">
        <div className="container">
          <img className="logo-mob" src={Img1} alt="logo-mobile" />
          <div className="content">
            <img className="logo2" src={Logo} alt="logo" />
            <form action="#">
              <div className="input-container">
                <i className="fa fa-user icon1"></i>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={changeHandler}
                />
              </div>

              <div className="input-container">
                <i className="fa fa-user icon1"></i>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Email"
                  name="email"
                  onChange={changeHandler}
                />
              </div>

              <div className="input-container">
                <i className="fa fa-key icon1"></i>
                <input
                  className="input-field"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={changeHandler}
                />
              </div>

              <div className="input-container">
                <i className="fa fa-key icon1"></i>
                <input
                  className="input-field"
                  type="password"
                  placeholder="Password"
                  name="macthPassword"
                  onChange={changeHandler}
                />
              </div>

              <div className="input-container">
                <i className="fa fa-user icon1"></i>
                <input
                  className="input-field"
                  type="text"
                  placeholder="My wallet"
                  name="wallet"
                  onChange={changeHandler}
                />
              </div>

              <div className="input-container">
                <i className="fa fa-user icon1"></i>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Friend ID or wallet"
                  name="friendId"
                  onChange={changeHandler}
                />
              </div>

              <button
                type="submit"
                className="btn"
                onClick={registerHandler}
                disabled={loading}
              >
                Sign in
              </button>
              <div className="links">
                <NavLink to="/restore-password" className="forget">
                  Forget Password
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
};

export default AuthPage;
