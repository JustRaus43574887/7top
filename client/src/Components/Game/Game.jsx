import { Fragment } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Participants from "./Body/Participants";
import Tickets from "./Body/Tickets";
import Winners from "./Body/Winners";

const Game = ({
  title,
  time = false,
  children,
  showButtons,
  showVideo = true,
}) => {
  return (
    <Fragment>
      <Header time={time} title={title}>
        {children}
      </Header>
      <section className="section" id="section2">
        <div className="container">
          <div className="section22">
            <Participants />
            <div className="tickets">
              <Tickets showButtons={showButtons} />
              <Winners />
            </div>
          </div>
        </div>
      </section>
      {showVideo && <Footer />}
    </Fragment>
  );
};

export default Game;
