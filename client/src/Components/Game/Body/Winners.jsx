import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWinners, getBalls } from "../../../redux/actions/tronActions";

import Win from "../../../img/win.png";
import Place1 from "../../../img/place1.png";
import Place2 from "../../../img/place2.png";

const ReturnDate = ({ time }) => {
  const date = new Date(time * 1000);
  return (
    <span className="p-date">
      {date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()}
    </span>
  );
};

const ReturnBalls = ({ balls, timestapmt, place }) => {
  useEffect(() => {}, [balls, timestapmt]);
  if (Object.keys(balls).length === 0) return "";
  if (Math.abs(balls.timestapmt - parseInt(timestapmt, 10) * 1000) >= 10000)
    return "";
  return (
    <div style={{ textAlign: "center", color: "orange" }}>
      {place === 0
        ? balls.balls.match(/.{1,2}/g).map((b) => `(${b})`)
        : balls.balls
            .slice()
            .reverse()
            .map((b) => `(${b.reverse_string()})`)}{" "}
      mod {balls.players} ={" "}
      {place === 0
        ? balls.balls.match(/.{1,2}/g).join("") % balls.players
        : balls.balls
            .slice()
            .reverse()
            .map((b) => b.reverse_string())
            .join("") % balls.players}
    </div>
  );
};

const Winners = () => {
  const dispatch = useDispatch();
  const language = useSelector(({ language }) => language);
  const balls = useSelector(({ balls }) => balls);
  const { winners, contract } = useSelector(({ winners, contract }) => ({
    winners,
    contract,
  }));

  useEffect(() => {
    if (contract) dispatch(getWinners(contract));
  }, [contract, dispatch]);

  useEffect(() => {
    dispatch(getBalls(contract));
  }, [contract, dispatch]);

  return (
    <Fragment>
      <div className="winners">
        <img src={Win} alt="winner" />
        <p className="p10">{language.result.page.game[8]}</p>
      </div>

      {winners.map((winner, index) => (
        <div key={index} className="winners_">
          <div className="avatar-win">
            <div className="elipse4">
              <img
                src={winner.user.avatar}
                style={{ objectFit: "cover" }}
                alt="avatar"
              />
            </div>
          </div>
          <div className="avatar-title">
            <p className="p11">
              {winner.user.name} <ReturnDate time={winner.timestapmt} />
            </p>
            <div className="place">
              <img
                className="place1"
                src={index === 0 ? Place1 : Place2}
                alt="place1"
              />
              <p className="p12">
                {index + 1} Place <span>{winner.amount} $</span>
              </p>
            </div>
            <ReturnBalls
              balls={balls}
              timestapmt={winner.timestapmt}
              place={index}
            />
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default Winners;
