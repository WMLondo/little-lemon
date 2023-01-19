import {useCallback, useReducer } from "react";

const initHttp = {
  isLoading: false,
  error: {
    isValid: false,
    msg: "",
  },
};

const httpReducer = (state, action) => {
  if (action.type === "LOADING") {
    return { ...state, isLoading: action.payload };
  }
  if (action.type === "ERROR") {
    return {
      ...state,
      error: { isValid: action.errState, msg: action.payload },
    };
  }
};

const useHttp = () => {
  const [httpState, dispatch] = useReducer(httpReducer, initHttp);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    dispatch({ type: "LOADING", payload: true });
    dispatch({ type: "ERROR", payload: "", errState: false });
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        headers: requestConfig.headers ? requestConfig.headers : {},
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.message || "Something went wrong!",
        errState: false,
      });
    }

    dispatch({ type: "LOADING", payload: false });
  }, []);

  const { isLoading, error } = httpState;
  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
