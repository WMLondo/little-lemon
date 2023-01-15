import React, { useState } from "react";
import useInputValidation from "../../../hooks/useInputValidation";
import classes from "./BookingForm.module.css";

const dateNow = new Date();

const BookingForm = (props) => {
  const {
    value: date,
    valueIsValid: dateIsValid,
    hasError: dateHasError,
    valueChangedHandler: dateChangedHandler,
    valueBlurHandler: dateBlurHandler,
    resetInput: dateReset,
  } = useInputValidation(
    (value) =>
      parseInt(value.split(/-/)[0]) >= dateNow.getFullYear() &&
      parseInt(value.split(/-/)[1]) >= dateNow.getMonth() + 1 &&
      parseInt(value.split(/-/)[2]) >= dateNow.getDate()
  );
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

  const formIsValid =
    dateIsValid && timeIsValid && guestIsValid && occasionIsValid;

  const reservationHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    console.log("Data sended...");
    props.submitForm({ date, time, guest, occasion });
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

  const initHours = [
    { value: "17:00", disable: false },
    { value: "18:00", disable: false },
    { value: "19:00", disable: false },
    { value: "20:00", disable: false },
    { value: "21:00", disable: false },
    { value: "22:00", disable: false },
  ];

  const [availaHours, setAvailaHours] = useState(initHours);
  const prevBookings = props.prevBookings;

  const showAvailableTime = (e) => {
    dateChangedHandler(e);

    let prevBookingFilterDate = [];
    prevBookingFilterDate = prevBookings.filter(
      (booking) => booking.date === e.target.value
    );
    if (prevBookingFilterDate.length !== 0) {
      console.log("in if");
      for (let i = 0; i < availaHours.length; i++) {
        for (let j = 0; j < prevBookingFilterDate.length; j++) {
          if (availaHours[i].value === prevBookingFilterDate[j].time) {
            const newAvailaHours = availaHours;
            newAvailaHours[i].disable = true;
            setAvailaHours(newAvailaHours);
          }
        }
      }
    } else {
      setAvailaHours(initHours);
    }
  };

  return (
    <form className={classes.form}>
      <div className={dateClassController}>
        <label htmlFor="res-date">Choose date</label>
        <input
          type="date"
          id="res-date"
          value={date}
          onChange={showAvailableTime}
          onBlur={dateBlurHandler}
        />
        {dateHasError && (
          <p>You must enter today's date or the following dates! </p>
        )}
      </div>
      <div className={timeClassController}>
        <label htmlFor="res-time">Choose time</label>
        <select
          id="res-time "
          onChange={timeChangedHandler}
          onBlur={timeBlurHandler}
          value={time}
          // disabled={!dateIsValid}
        >
          <option key="default Time">Select</option>
          {dateIsValid &&
            availaHours.map((hour, index) => {
              return (
                <option disabled={hour.disable} key={`time${index}`}>
                  {hour.value}
                </option>
              );
            })}
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
      <button
        type="submit"
        onClick={reservationHandler}
        disabled={!formIsValid}
      >
        Make Your reservation
      </button>
    </form>
  );
};

export default BookingForm;
