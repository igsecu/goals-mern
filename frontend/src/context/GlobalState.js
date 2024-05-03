import React, { createContext, useReducer } from "react";
import { reducer } from "./AppReducer";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  loaded: false,
  message: "",
  low: [],
  medium: [],
  high: [],
  completed: [],
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Actions
  const register = (user) => {
    dispatch({
      type: "REGISTER",
      payload: user,
    });
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  const setLoaded = (loaded) => {
    dispatch({
      type: "LOADED",
      payload: loaded,
    });
  };

  const postLow = (low) => {
    dispatch({
      type: "POST_LOW",
      payload: low,
    });
  };

  const postMedium = (medium) => {
    dispatch({
      type: "POST_MEDIUM",
      payload: medium,
    });
  };

  const postHigh = (high) => {
    dispatch({
      type: "POST_HIGH",
      payload: high,
    });
  };

  const postCompleted = (completed) => {
    dispatch({
      type: "POST_COMPLETED",
      payload: completed,
    });
  };

  const updateLow = (goal) => {
    dispatch({
      type: "UPDATE_GOAL",
      payload: goal,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        low: state.low,
        medium: state.medium,
        high: state.high,
        completed: state.completed,
        loaded: state.loaded,
        register,
        logout,
        setLoaded,
        postLow,
        postMedium,
        postHigh,
        postCompleted,
        updateLow,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
