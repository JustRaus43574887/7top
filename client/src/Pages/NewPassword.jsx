import React, { useState, useEffect } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import useHttp from "../hooks/http.hook";
import useMessage from "../hooks/message.hook";
import "../css/register.css";
import "../css/forgetPass.css";

import Img1 from "../img/img1.png";
import Logo from "../img/logo.png";

const NewPassword = () => {
  const [passwords, setPasswords] = useState({
    password1: "",
    password2: "",
  });
  const [email, setEmail] = useState("");
  const history = useHistory();
  const { token } = useParams();

  const message = useMessage();
  const { request } = useHttp();

  useEffect(() => {
    (async () => {
      try {
        const data = await request("/api/auth/verify-restore-token", "POST", {
          token,
        });
        if (data.ok) setEmail(data.email);
      } catch (e) {
        console.error(e);
        history.push("/");
      }
    })();
  }, [history, request, token]);

  const confirmPassword = async (e) => {
    e.preventDefault();
    if (passwords.password1 === passwords.password2 && email !== "") {
      try {
        const data = await request("/api/auth/confirm-password", "POST", {
          password: passwords.password1,
          email,
        });
        if (data.ok) {
          message("Your password has been successfully changed");
          setTimeout(() => history.push("/login"), 1000);
        }
      } catch (err) {
        message(err.message);
      }
    } else {
      message("Passwords don't match, or token is missing");
    }
  };

  if (email === "")
    return (
      <div className="holder">
        <div className="preloader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );

  return (
    <div className="newPass register">
      <header className="header" id="header">
        <div className="container">
          <img className="logo-mob" src={Img1} alt="logo-mobile" />
          <div className="content">
            <img className="logo2" src={Logo} alt="logo" />
            <form>
              <div className="input-container">
                <i className="fa fa-key icon1"></i>
                <input
                  className="input-field"
                  type="password"
                  placeholder="Your new password"
                  name="password"
                  value={passwords.password1}
                  onChange={(e) => {
                    const target = e.target;
                    setPasswords((prevPasswords) => {
                      return { ...prevPasswords, password1: target.value };
                    });
                  }}
                />
              </div>
              <div className="input-container">
                <i className="fa fa-key icon1"></i>
                <input
                  className="input-field"
                  type="password"
                  placeholder="Repeat your new password"
                  name="password"
                  value={passwords.password2}
                  onChange={(e) => {
                    const target = e.target;
                    setPasswords((prevPasswords) => {
                      return { ...prevPasswords, password2: target.value };
                    });
                  }}
                />
              </div>
              <button type="submit" className="btn" onClick={confirmPassword}>
                Confirm password
              </button>
              <div className="links">
                <NavLink to="/login" className="forget">
                  Login
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
};

export default NewPassword;
