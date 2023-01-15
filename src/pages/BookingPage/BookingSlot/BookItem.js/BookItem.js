import React from "react";
import classes from "./BookItem.module.css";

const BookItem = (props) => {
  const { date, time, guest, occasion } = props.data;
  return (
    <div className={classes.container}>
      <div className={classes["date-container"]}>
        <span className={classes["date"]}>{time}</span>
        <span className={classes["date"]}>{date}</span>
      </div>
      <div className={classes["description-container"]}>
        <p className={classes["title"]}>No. Huespedes:</p>
        <span className={classes["value"]}>{guest}</span>
      </div>
      <div className={classes["description-container"]}>
        <p className={classes["title"]}>Ocasion: </p>
        <span className={classes["value"]}>{occasion}</span>
      </div>
    </div>
  );
};

export default BookItem;
