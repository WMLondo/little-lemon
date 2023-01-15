import React from "react";
import BookItem from "./BookItem.js/BookItem";

const BookingSlot = (props) => {
  return (
    <div>
      <h2>Reservaciones Anteriores</h2>
      {props.items.map((item, index) => {
        return <BookItem key={index} data={item} />;
      })}
    </div>
  );
};

export default BookingSlot;
