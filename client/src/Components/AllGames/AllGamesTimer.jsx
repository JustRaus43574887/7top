import { Fragment } from "react";
import Timer from "react-compound-timer";
import { useSelector } from "react-redux";

const AllGamesTimer = ({ initialTime }) => {
  const language = useSelector(({ language }) => language);

  return (
    <Timer initialTime={initialTime} direction="backward">
      {() => (
        <Fragment>
          <ul>
            <li style={{ color: "#979797" }}>
              {(<Timer />)._owner.stateNode.state.d - 1 >= 0
                ? (<Timer />)._owner.stateNode.state.d - 1
                : 0}
            </li>
            <hr />
            <li>
              <Timer.Days /> {language.result.page.allgames[2]}
            </li>
            <hr />
            <li style={{ color: "#979797" }}>
              {(<Timer />)._owner.stateNode.state.d + 1}
            </li>
          </ul>
          <ul>
            <li style={{ color: "#979797" }}>
              {(<Timer />)._owner.stateNode.state.h - 1 >= 0
                ? (<Timer />)._owner.stateNode.state.h - 1
                : 24 + (<Timer />)._owner.stateNode.state.h - 1}
            </li>
            <hr />
            <li>
              <Timer.Hours /> {language.result.page.allgames[3]}
            </li>
            <hr />
            <li style={{ color: "#979797" }}>
              {(<Timer />)._owner.stateNode.state.h + 1 <= 23
                ? (<Timer />)._owner.stateNode.state.h + 1
                : Math.abs(60 - (<Timer />)._owner.stateNode.state.h - 1)}
            </li>
          </ul>
        </Fragment>
      )}
    </Timer>
  );
};

export default AllGamesTimer;
