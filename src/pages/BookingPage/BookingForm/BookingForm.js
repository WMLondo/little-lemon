import React from "react";
import useInputValidation from "../../../hooks/useInputValidation";
import classes from "./BookingForm.module.css";

const BookingForm = (props) => {
  const {
    value: date,
    valueIsValid: dateIsValid,
    hasError: dateHasError,
    valueChangedHandler: dateChangedHandler,
    valueBlurHandler: dateBlurHandler,
    resetInput: dateReset,
  } = useInputValidation((value) => value.trim() !== "");
  const {
    value: time,
    valueIsValid: timeIsValid,
    hasError: timeHasError,
    valueChangedHandler: timeChangedHandler,
    valueBlurHandler: timeBlurHandler,
    resetInput: timeReset,
  } = useInputValidation(
    (value) => value.trim() !== "" && value.trim() !== "Select"
  );

  const {
    value: guest,
    valueIsValid: guestIsValid,
    hasError: guestHasError,
    valueChangedHandler: guestChangedHandler,
    valueBlurHandler: guestBlurHandler,
    resetInput: guestReset,
  } = useInputValidation((value) => value.trim() !== "");

  const {
    value: occasion,
    valueIsValid: occasionIsValid,
    hasError: occasionHasError,
    valueChangedHandler: occasionChangedHandler,
    valueBlurHandler: occasionBlurHandler,
    resetInput: occasionReset,
  } = useInputValidation(
    (value) => value.trim() !== "" && value.trim() !== "Select"
  );

  const reservationHandler = (e) => {
    e.preventDefault();
    const formIsValid =
      dateIsValid && timeIsValid && guestIsValid && occasionIsValid;
    if (!formIsValid) {
      return;
    }
    console.log("Data sended...");
    //props.submitForm({ date, time, guest, occasion });
    dateReset();
    timeReset();
    guestReset();
    occasionReset();
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
        <select
          id="res-time "
          onChange={timeChangedHandler}
          onBlur={timeBlurHandler}
          value={time}
        >
          <option>Select</option>
          <option>17:00</option>
          <option>18:00</option>
          <option>19:00</option>
          <option>20:00</option>
          <option>21:00</option>
          <option>22:00</option>
        </select>
        {timeHasError && <p>You must select a valid time!</p>}
      </div>
      <div className={guestClassController}>
        <label htmlFor="guests">Number of guests</label>
        <input
          type="number"
          placeholder="1"
          min="1"
          max="10"
          id="guests"
          onChange={guestChangedHandler}
          onBlur={guestBlurHandler}
          value={guest}
        />
        {guestHasError && <p>You must enter a valid number of guest!</p>}
      </div>
      <div className={occasionClassController}>
        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          onChange={occasionChangedHandler}
          onBlur={occasionBlurHandler}
          value={occasion}
        >
          <option>Select</option>
          <option>Birthday</option>
          <option>Anniversary</option>
        </select>
        {occasionHasError && <p>You must enter a valid Occasion!</p>}
      </div>
      <button type="submit" onClick={reservationHandler}>
        Make Your reservation
      </button>
      {!formIsValid && (
        <p className={classes.invalid}>There are some input invalid.</p>
      )}
    </form>
  );
};

export default BookingForm;
