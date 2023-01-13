import { useState } from "react";

const useInputValidation = (validationFunction) => {
  const [touchInput, setTouchInput] = useState(false);
  const [value, setValue] = useState("");

  const valueIsValid = validationFunction(value);
  const hasError = valueIsValid && touchInput;

  const valueChangedHandler = (e) => {
    setValue(e.target.value);
  };

  const valueBlurHandler = (e) => {
    setTouchInput(true);
  };

  const resetInput = (e) => {
    setTouchInput(false);
    setValue("");
  };

  return {
    value,
    valueIsValid,
    hasError,
    valueChangedHandler,
    valueBlurHandler,
    resetInput,
  };
};

export default useInputValidation;
