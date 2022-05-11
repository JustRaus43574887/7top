import { useEffect, useState } from "react";
import "../css/allWinners.css";
import "../css/people.css";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllWinners,
  loadMoreAllWinners,
} from "../redux/actions/mainActions";

import Account from "../Components/Account";
import Preloader from "../Components/Preloader";

import Place1 from "../img/place1.png";
import Place2 from "../img/place2.png";

const returnCurrentContract = (number) => {
  switch (number) {
    case 0:
      return "LimitLottery5";
    case 1:
      return "LimitLottery15";
    case 2:
      return "LimitLottery50";
    case 3:
      return "Everyweek5";
    case 4:
      return "Everyweek50";
    case 5:
      return "Month5";
    case 6:
      return "EveryYear5";
    default:
      return "LimitLottery5";
  }
};

const Winners = () => {
  useEffect(() => {
    document.title = "Список победителей крипто лотереи 7top.org";
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        "content",
        "Проверить реальность выплат не составит труда, ведь все они записаны в блокчен сети Tron. Поздравьте победителей в нашем телеграмм чате https://t.me/joinchat/UQfr0fTQF3OukpS8"
      );
  }, []);

  const [hasMore, setHasMore] = useState(true);
  const [contract, setContract] = useState(0);
  const [name, setName] = useState("FirstWinner");

  const dispatch = useDispatch();
  const {
    cursor,
    currentContract,
    currentName,
    winners,
    loading,
    success,
  } = useSelector(({ allWinners }) => allWinners);
  const language = useSelector(({ language }) => language);

  useEffect(() => {
    console.log(language);
  }, [language]);

  useEffect(() => {
    dispatch(getAllWinners());
  }, [dispatch]);

  useEffect(() => {
    if (currentName === "EveryYear5" && currentName === "SecondWinner")
      setHasMore(false);
  }, [currentContract, currentName]);

  useEffect(() => {
    if (!loading && !cursor) {
      if (name === "FirstWinner") setName("SecondWinner");
      if (name === "SecondWinner") {
        setName("FirstWinner");
        setContract((cont) => cont + 1);
      }
      loadMore();
    }
  }, [loading, cursor]);

  const loadMore = () =>
    dispatch(loadMoreAllWinners(returnCurrentContract(contract), name, cursor));

  const ReturnDate = ({ time }) => {
    const date = new Date(time * 1000);
    return (
      <span style={{ fontSize: 15, color: "grey" }}>
        {date.getDate() +
          "." +
          (date.getMonth() + 1) +
          "." +
          date.getFullYear()}
      </span>
    );
  };

  return (
    <div className="people all-winners">
      <Account backBtn={true} />
      {success ? (
        <section>
          <div className="container">
            {winners.map((winner, index) => (
              <div className="comp" key={index}>
                <div className="elipse_">
                  <div className="elipse3_">
                    <img src={winner.user.avatar} alt="winner" />
                  </div>
                </div>
                <div className="text">
                  <p className="p3">
                    {winner.user.name} <ReturnDate time={winner.timestapmt} />
                  </p>
                  <div className="place">
                    <img
                      src={
                        winner.event_name === "FirstWinner" ? Place1 : Place2
                      }
                      alt="star"
                    />
                    <span style={{ whiteSpace: "nowrap" }}>
                      {winner.event_name === "FirstWinner"
                        ? language.result.page.winners.first
                        : language.result.page.winners.second}{" "}
                      {language.result.page.winners.winner}{" "}
                      <span className="sum" style={{ whiteSpace: "nowrap" }}>
                        {winner.amount} $
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {hasMore && (
              <button
                disabled={loading}
                style={{ textAlign: "center", justifyContent: "center" }}
                className="btn"
                onClick={loadMore}
              >
                Load more
              </button>
            )}
          </div>
        </section>
      ) : (
        <Preloader />
      )}
    </div>
  );
};

export default Winners;
