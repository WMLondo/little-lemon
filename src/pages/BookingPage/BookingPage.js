import React, { useCallback, useEffect, useReducer } from "react";
import useHttp from "../../hooks/use-http";
import Loading from "../../Ui/Loading";
import BookingForm from "./BookingForm/BookingForm";
import BookingSlot from "./BookingSlot/BookingSlot";

const initializeBooking = [];

const bookingReducer = (state, action) => {
  if (action.type === "GET") {
    return action.payload;
  }
  if (action.type === "ADDING") {
    return [...state, action.payload];
  }

  return initializeBooking;
};

const BookingPage = () => {
  const { isLoading, error, sendRequest } = useHttp();
  const [bookingState, dispatch] = useReducer(
    bookingReducer,
    initializeBooking
  );

  const getReservationHandler = useCallback((dataObj) => {
    const loadedRequest = [];

    for (const reservationKey in dataObj) {
      loadedRequest.push({
        key: reservationKey,
        date: dataObj[reservationKey].date,
        time: dataObj[reservationKey].time,
        guest: dataObj[reservationKey].guest,
        occasion: dataObj[reservationKey].occasion,
      });
    }

    dispatch({ type: "GET", payload: loadedRequest });
  }, []);

  useEffect(() => {
    sendRequest(
      {
        url: "https://react-http-prueba-default-rtdb.firebaseio.com/reservation.json",
      },
      getReservationHandler
    );
  }, [getReservationHandler, sendRequest]);

  const createReservationHandler = (data) => {
    dispatch({ type: "ADDING", payload: data });
  };

  let showContent = <BookingSlot items={bookingState} />;

  if (isLoading) {
    showContent = <Loading />;
  }
  if (error.isValid) {
    showContent = <p>Something wents wrong!</p>;
    console.log(error.msg);
  }

  return (
    <div>
      <BookingForm
        submitForm={createReservationHandler}
        prevBookings={bookingState}
      />
      {showContent}
    </div>
  );
};

export default BookingPage;
