import React, { useReducer } from "react";
import BookingForm from "./BookingForm/BookingForm";
import BookingSlot from "./BookingSlot/BookingSlot";

const initializeTimes = [];

const availableTimeReducer = (state, action) => {
  if (action.type === "ADDING") {
    const { date, time, guest, occasion } = action.payload;
    const newObject = {
      date: date,
      time: time,
      guest: guest,
      occasion: occasion,
    };
    return [...state, newObject];
  }

  return initializeTimes;
};

const BookingPage = () => {
  const [bookingState, dispatch] = useReducer(
    availableTimeReducer,
    initializeTimes
  );

  const addReservationHandler = (data) => {
    dispatch({ type: "ADDING", payload: data });
  };

  return (
    <div>
      <BookingForm
        submitForm={addReservationHandler}
        reservationTimes={bookingState}
      />
      <BookingSlot items={bookingState} />
    </div>
  );
};

export default BookingPage;
