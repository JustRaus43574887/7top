import React from "react";
import styles from "../../css/banner.module.css";

import { useSelector } from "react-redux";

import Money1 from "../../img/money1.png";

const Banner = ({ onClose }) => {
  const total = useSelector(({ owners }) => owners.total);
  return (
    <div className={styles.banner}>
      <div className={styles.wrapper}>
        <div className={styles.close} onClick={onClose}>
          <i className="fa fa-times"></i>
        </div>
        <div className={styles.text} style={{ textAlign: "center" }}>
          <span>
            Ticket sales are stopped. {total} players are waiting for the draw.
          </span>
        </div>
        <img src={Money1} alt="money" className={styles.money} />
        <div className={styles.time}>
          <span>You can watch the video below.</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
