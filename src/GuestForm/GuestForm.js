import React from "react";

const GuestForm = () => {
  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <form action="">
      <label htmlFor="guests">Number of guest:</label>
      <input type="number" name="guests" />
      <button type="submit" onClick={submitHandler}>
        Submit
      </button>
    </form>
  );
};

export default GuestForm;
