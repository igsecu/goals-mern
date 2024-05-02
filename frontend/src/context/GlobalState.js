import React, { createContext, useReducer } from "react";
import { reducer } from "./AppReducer";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
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

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        register,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
