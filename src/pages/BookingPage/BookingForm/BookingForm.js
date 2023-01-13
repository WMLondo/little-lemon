import React, { useRef, useState } from "react";
import useInputValidation from "../../../hooks/useInputValidation";
import classes from "./BookingForm.module.css";

const actualDate = new Date();
const defaultDate = `${actualDate.getFullYear()}-${
  actualDate.getMonth() + 1
}-${actualDate.getDate()}`;

const BookingForm = () => {
  const {
    value: date,
    isValid: dateIsValid,
    hasError: dateHasError,
    valueChangedHandler: dateChangedHandler,
    valueBlurHandler: dateBlurHandler,
    resetInput: dateReset,
  } = useInputValidation((value) => value.trim() === "");
  const {
    value: time,
    isValid: timeIsValid,
    hasError: timeHasError,
    valueChangedHandler: timeChangedHandler,
    valueBlurHandler: timeBlurHandler,
    resetInput: timeReset,
  } = useInputValidation((value) => value.trim() === "");

  const {
    value: guest,
    isValid: guestIsValid,
    hasError: guestHasError,
    valueChangedHandler: guestChangedHandler,
    valueBlurHandler: guestBlurHandler,
    resetInput: guestReset,
  } = useInputValidation((value) => value.trim() === "");

  const {
    value: occasion,
    isValid: occasionIsValid,
    hasError: occasionHasError,
    valueChangedHandler: occasionChangedHandler,
    valueBlurHandler: occasionBlurHandler,
    resetInput: occasionReset,
  } = useInputValidation((value) => value.trim() === "");

  const reservationHandler = (e) => {
    e.preventDefault();
    if (dateIsValid) {
      console.log("Data sended...");
    }
  };

  const dateClassController = dateHasError
    ? `${classes.input} ${classes.error}`
    : classes.input;

  const timeClassController = timeHasError
    ? `${classes.input} ${classes.error}`
    : classes.input;

  const guestClassController = guestHasError
    ? `${classes.input} ${classes.error}`
    : classes.input;

  const occasionClassController = occasionHasError
    ? `${classes.input} ${classes.error}`
    : classes.input;

  return (
    <form className={classes.form}>
      <div className={dateClassController}>
        <label htmlFor="res-date">Choose date</label>
        <input
          type="date"
          value={date}
          id="res-date"
          onChange={dateChangedHandler}
          onBlur={dateBlurHandler}
        />
        {dateHasError && <p>You must enter a valid date!</p>}
      </div>
      <div className={timeClassController}>
        <label htmlFor="res-time">Choose time</label>
        <select id="res-time ">
          <option>17:00</option>
          <option>18:00</option>
          <option>19:00</option>
          <option>20:00</option>
          <option>21:00</option>
          <option>22:00</option>
        </select>
      </div>
      <div className={guestClassController}>
        <label htmlFor="guests">Number of guests</label>
        <input type="number" placeholder="1" min="1" max="10" id="guests" />
      </div>
      <div className={occasionClassController}>
        <label htmlFor="occasion">Occasion</label>
        <select id="occasion">
          <option>Select</option>
          <option>Birthday</option>
          <option>Anniversary</option>
        </select>
      </div>
      <button type="submit" onClick={reservationHandler}>
        Make Your reservation
      </button>
    </form>
  );
};

export default BookingForm;
