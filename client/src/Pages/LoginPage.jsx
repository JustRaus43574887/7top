import { useEffect, useState } from "react";
import useHttp from "../hooks/http.hook";
import useMessage from "../hooks/message.hook";
import "../css/login.css";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import { getMe } from "../redux/actions/mainActions";

import Img1 from "../img/img1.png";
import Logo from "../img/logo.png";

const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const message = useMessage();

  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  useEffect(() => {
    document.title = "Страница входа на сайт крипто лотереи SevenTop";
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

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      localStorage.setItem("token", data.token);
      dispatch(getMe());
      history.push("/allgames");
    } catch (e) {}
  };

  return (
    <div className="loginpage">
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
                <i className="fa fa-key icon1"></i>
                <input
                  className="input-field"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={changeHandler}
                />
              </div>

              <button
                type="submit"
                className="btn"
                onClick={loginHandler}
                disabled={loading}
              >
                Login
              </button>
              <div className="register">
                <a href="/restore-password" className="forget">
                  Forget Password
                </a>
                <a href="/register">Create an account</a>
              </div>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
};

export default LoginPage;
