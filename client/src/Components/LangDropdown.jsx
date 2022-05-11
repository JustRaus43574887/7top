import { useRef, useEffect, useState } from "react";
import M from "materialize-css";
import "../css/langDropdown.css";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage, setCurrentLang } from "../redux/actions/mainActions";

import Us from "../img/united-states.png";
import Ge from "../img/germany.png";
import Ru from "../img/russia.png";
import Sp from "../img/spain.png";
import Ch from "../img/china.png";

import "semantic-ui-css/semantic.min.css";
import { Dropdown } from "semantic-ui-react";

const arr = [
  { name: "english", src: Us },
  { name: "german", src: Ge },
  { name: "russian", src: Ru },
  { name: "spanish", src: Sp },
  { name: "chinese", src: Ch },
];

const LangDropdown = () => {
  const dispatch = useDispatch();
  const currentLang = useSelector(({ currentLang }) => currentLang);
  const dropdownRef = useRef(null);
  const [country, setCountry] = useState({ name: "english", src: Us });

  useEffect(() => {
    const current = arr.find((ell) => ell.name === currentLang);
    setCountry(current);
  }, [currentLang]);

  useEffect(() => {
    if (dropdownRef.current)
      M.Dropdown.init(dropdownRef.current, { coverTrigger: false });
  }, [dropdownRef]);

  useEffect(() => {
    dispatch(changeLanguage(country.name));
  }, [country, dispatch]);

  return (
    <div
      className="input-field"
      style={{ position: "fixed", zIndex: 1, right: 10 }}
    >
      <img src={country.src} width={40} height={40} />

      <Dropdown className="sem-drop" direction="left" icon={false}>
        <Dropdown.Menu>
          {arr.map((c, i) => (
            <Dropdown.Item
              key={i}
              image={c.src}
              onClick={() => {
                dispatch(setCurrentLang(c.name));
                localStorage.setItem("lang", c.name);
              }}
            />
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default LangDropdown;
