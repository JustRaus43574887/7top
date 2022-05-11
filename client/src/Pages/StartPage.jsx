import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeLanguage } from "../redux/actions/mainActions";
import { useHistory } from "react-router-dom";

import "../css/main.css";
import "../css/preloader.css";

import Logo from "../img/img1.png";
import Section1 from "../img/section1.png";
import Section2 from "../img/section2.png";
import Banner from "../img/banner.jpg";
import { NavLink } from "react-router-dom";
import Languages from "../Components/Languages";
import Preloader from "../Components/Preloader";

const StartPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { me, language, instance } = useSelector(
    ({ me, language, tronWeb }) => ({
      me,
      language,
      instance: tronWeb.instance,
    })
  );

  useEffect(() => {
    console.log(language);
  }, [language]);

  const languages = [
    { lang: "german", margin: 205 },
    { lang: "russian", margin: 185 },
    { lang: "spanish", margin: 205 },
    { lang: "english", margin: 245 },
    { lang: "chinese", margin: 160 },
  ];
  const videos = {
    english: "https://www.youtube.com/embed/hx0HORJcpV0?rel=0",
    russian: "https://www.youtube.com/embed/60cDwnn_-f4?rel=0",
  };
  const changeLang = async (lang) => dispatch(changeLanguage(lang));

  useEffect(() => {
    document.title = "Международная лотерея 7TOP.org на основе смар";
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        "content",
        "С помощью децентрализованной блокчейн сети Tron Вы сможете поучаствовать в четной лотерее, четность определения победителя которой, можно легко проверить. Вы можете пообщаться с другими игроками в телеграмм."
      );
  }, []);

  useEffect(() => {
    if (me) history.push("/allgames");
  }, [me, history]);

  if (language === null) return <Preloader />;

  return (
    <div className="row startpage">
      <header className="header" id="header">
        <div className="container">
          <div className="logo">
            <img src={Logo} alt="logo" />
          </div>

          <div className="buttons">
            <NavLink className="entrance" to="/register">
              {language.result.page.account[7]}
            </NavLink>
            {instance && instance.ready ? (
              <NavLink className="login" to="/login">
                {language.result.page.account[4]}
              </NavLink>
            ) : (
              <NavLink className="login" to="/allgames">
                {language.result.page.account[8]}
              </NavLink>
            )}
          </div>

          <div className="video">
            <iframe
              allowFullScreen
              title="video"
              src={
                Object.keys(videos).indexOf(language.result.language) > -1
                  ? videos[language.result.language]
                  : videos["english"]
              }
            />
          </div>
        </div>
      </header>

      <section className="section1" id="section1">
        <div className="container">
          <Languages changeLanguage={changeLang} languages={languages} />
          <div className="div"></div>
          <h2>{language.result.translation.header.text}</h2>
          <div className="work">
            <div className="left">
              {language.result.translation.header.left.map((text, i) => (
                <p key={i} className={"p" + (i + 1)}>
                  {text}
                </p>
              ))}
            </div>
            <img
              src={language.result.language === "chinese" ? Section2 : Section1}
              alt="work"
            />
            <div className="right">
              {language.result.translation.header.right.map((text, i) => (
                <p
                  key={i}
                  className={"p" + (i + 1)}
                  style={
                    i === 2
                      ? {
                          marginTop: languages.filter(
                            (o) => o.lang === language.result.language
                          )[0].margin,
                        }
                      : {}
                  }
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
          <div className="work_">
            {language.result.translation.header.left.map((text, i) => [
              <p key={i} className="p1">
                {text}
              </p>,
              <p key={i + 1} className="p2">
                {language.result.translation.header.right[i]}
              </p>,
            ])}
          </div>
          <div className="div2"></div>
        </div>
      </section>

      <section className="section2" id="section2">
        <div className="container">
          <h2>{language.result.translation.guarantee.text}</h2>
          <div className="priem">
            <div className="top">
              {language.result.translation.guarantee.left.map((text, i) => (
                <div key={i}>
                  <p className={"p" + (i + 1)}>{text}</p>
                </div>
              ))}
            </div>
            <div className="bottom">
              {language.result.translation.guarantee.right.map((text, i) => (
                <div key={i}>
                  <p className={"p" + (i + 1)}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section3" id="section3">
        <div className="container">
          <div className="icon">
            <a
              href="https://t.me/joinchat/HSApdhx_OO301lltbkyfhw"
              target="_blank"
              rel="noreferrer"
              className="telegram"
            >
              <i className="fa fa-telegram" aria-hidden="true"></i>
            </a>
            {/* <a href="#" className="fb">
                              <i className="fa fa-facebook-official" aria-hidden="true"></i>
                          </a> */}
            <a
              href="https://www.youtube.com/channel/UCnCfdRrnlF8LZWNe0N44uog/"
              target="_blank"
              rel="noreferrer"
              className="tube"
            >
              <i className="fa fa-youtube-play" aria-hidden="true"></i>
            </a>
          </div>
          <a
            href="https://ychanger.net/?R=16100409488763"
            target="_blank"
            rel="noreferrer"
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            <img src={Banner} alt="banner" style={{ maxWidth: 320 }} />
          </a>
        </div>
      </section>

      <footer className="footer" id="footer">
        <div className="container">
          <p className="footer-text">Адрес смарт-контракта: 7top</p>
        </div>
      </footer>
    </div>
  );
};

export default StartPage;
