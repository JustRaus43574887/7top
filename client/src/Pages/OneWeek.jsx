import { useEffect, useState } from "react";
import Slider from "react-slick";
import io from "socket.io-client";
import "../css/game.css";

import useHttp from "../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentContract } from "../redux/actions/tronActions";

import Game from "../Components/Game/Game";
import Banner from "../Components/Game/Banner";

const OneWeek = () => {
  useEffect(() => {
    document.title =
      "Еженедельная лотерея с гарантированным розыгрышем джекпота (Собирается в криптовалюте Tron)!";
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        "content",
        "С пятницы на субботу проводится розыгрыш банка, выплаты выигрыша происходят автоматически. Прозрачное определение победителя, простая проверка выигрышного билета."
      );
  }, []);

  const { request } = useHttp();
  const dispatch = useDispatch();
  const language = useSelector(({ language }) => language);
  const tronWeb = useSelector(({ tronWeb }) => tronWeb);
  const { contract } = useSelector(({ contract }) => ({
    contract,
  }));
  const [time, setTime] = useState(0);
  const [bannerCfg, setBannerCfg] = useState({
    showBanner: false,
    showButtons: true,
  });

  useEffect(() => {
    const socket = io();
    socket.on("sell", (data) => {
      if (contract in data)
        setBannerCfg({
          showBanner: !data[contract],
          showButtons: data[contract],
        });
      if ("drawing" in data) window.location.reload();
    });
    return () => socket.off("sell");
  }, [contract]);

  useEffect(() => {
    if (tronWeb.instance)
      (async () => {
        let sell = await tronWeb.instance.contract().at(tronWeb[contract]);
        sell = await sell.sellTickets().call();
        setBannerCfg({ showBanner: !sell, showButtons: sell });
      })();
  }, [tronWeb, contract]);

  useEffect(() => {
    dispatch(setCurrentContract({ contract: "Everyweek5" }));
    return () => dispatch(setCurrentContract({ contract: null }));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const data = await request("/api/main/time/weekTime");
      setTime(data.time);
    })();
  }, [request]);

  const arrayOfSlides = [{ value: "5 $" }, { value: "50 $" }];
  const setting = {
    centerMode: true,
    slidesToShow: 1,
    dots: false,
    autoplay: false,
    beforeChange: (_, newId) => {
      dispatch(setCurrentContract({ contract: setCurrentSlide(newId) }));
    },
  };

  return (
    <div className="row game">
      {bannerCfg.showBanner && (
        <Banner
          onClose={() => setBannerCfg((cfg) => ({ ...cfg, showBanner: false }))}
        />
      )}
      <Game
        title={language.result.page.allgames[5]}
        time={time}
        showButtons={bannerCfg.showButtons}
      >
        <Slider {...setting}>
          {arrayOfSlides.map((item, index) => (
            <div className="item" key={index}>
              <p>{item.value}</p>
            </div>
          ))}
        </Slider>
      </Game>
    </div>
  );
};

const setCurrentSlide = (id) => {
  switch (id) {
    case 0:
      return "Everyweek5";
    case 1:
      return "Everyweek50";
    default:
      return "Everyweek5";
  }
};

export default OneWeek;
