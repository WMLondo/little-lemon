import React from "react";
import BookItem from "./BookItem.js/BookItem";
import classes from "./BookingSlot.module.css";

const BookingSlot = (props) => {
  const items = props.items;

  return (
    <div>
      <h2>Reservaciones Anteriores</h2>
      <div className={classes.container}>
        {items &&
          items.map((item) => {
            return (
              <BookItem
                key={item.key}
                data={item}
              />
            );
          })}
      </div>
    </div>
  );
};

export default BookingSlot;
