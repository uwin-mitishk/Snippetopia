// creater/author : Mitish Karia
// Feature : Custom hook for form validation

import { useState } from "react";

const useInput = (valueValidityFun, initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);

  const isValueValid = valueValidityFun(value);
  const hasError = !isValueValid && isTouched;

  const valueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const resetForm = () => {
    setValue("");
    setIsTouched(false);
  };

  return {
    value,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    isValueValid,
    resetForm,
  };
};

export default useInput;
