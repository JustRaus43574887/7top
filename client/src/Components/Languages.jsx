import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentLang } from "../redux/actions/mainActions";

const Languages = ({ changeLanguage, languages }) => {
  const dispatch = useDispatch();
  const currentLang = useSelector(({ currentLang }) => currentLang);

  return (
    <div className="languages">
      <ul>
        {languages.map((obj, i) => (
          <li
            key={i}
            className={obj.lang === currentLang ? "active" : ""}
            onClick={() => {
              changeLanguage(obj.lang);
              dispatch(setCurrentLang(obj.lang));
              localStorage.setItem("lang", obj.lang);
            }}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default Languages;
