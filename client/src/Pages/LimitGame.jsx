import { useEffect } from "react";
import Slider from "react-slick";
import "../css/game.css";

import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentContract,
  getOwners,
  getWinners,
} from "../redux/actions/tronActions";

import Game from "../Components/Game/Game";

const LimitGame = () => {
  useEffect(() => {
    document.title =
      "Лотерея 1 из 10 – игра с ограниченным количеством участников. Победит 1 игрок";
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        "content",
        "Сделайте ставку в 5 долларов, десятая ставка проведет розыгрыш, определив рандомно 1победителя, им сможете стать Вы. Испытай удачу!"
      );
  }, []);

  const language = useSelector(({ language }) => language);
  const { contract, owners } = useSelector(({ contract, owners }) => ({
    contract,
    owners,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentContract({ contract: "LimitLottery5" }));
    return () => dispatch(setCurrentContract({ contract: null }));
  }, [dispatch]);

  useEffect(() => {
    if (owners.total === 10) {
      dispatch(getOwners(contract));
      dispatch(getWinners(contract));
    }
  }, [contract, owners, dispatch]);

  const arrayOfSlides = [
    { value: "5 $" },
    { value: "15 $" },
    { value: "50 $" },
  ];
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
      <Game
        title={language.result.page.allgames[4]}
        showButtons
        showVideo={false}
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
      return "LimitLottery5";
    case 1:
      return "LimitLottery15";
    case 2:
      return "LimitLottery50";
    default:
      return "LimitLottery5";
  }
};

export default LimitGame;
