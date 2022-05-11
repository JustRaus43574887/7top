import { Fragment } from "react";
import { useSelector } from "react-redux";

import useTronWeb from "../../../hooks/tronweb.hook";

import Ticket from "../../../img/ticket.png";
import Ticketimg from "../../../img/Ticketimg.png";

const Tickets = ({ showButtons }) => {
  const language = useSelector(({ language }) => language);
  const { buyTicket, myTickets } = useTronWeb();

  return (
    <Fragment>
      {showButtons && (
        <a onClick={buyTicket}>
          <div className="btn">{language.result.page.game[6]}</div>
        </a>
      )}

      <div className="ticket-title">
        <img src={Ticket} alt="ticket" />
        <p className="p7">
          {language.result.page.game[7]}{" "}
          <span style={{ color: "#3897f1" }}>{" " + myTickets.length}</span>
        </p>
      </div>

      <div className="tickets_">
        {myTickets.map((item, index) => (
          <div key={index}>
            <p className="p8">№ {item}</p>
            <p className="p9">
              <img src={Ticketimg} alt="ticketimg" width={60} height={60} />{" "}
            </p>
          </div>
        ))}
      </div>
      <hr />
    </Fragment>
  );
};

export default Tickets;
