import React from "react";

const GlobalContext = React.createContext();

// it will contain whole app
export const GlobalProvider = ({ children }) => {
  return (
    <GlobalContext.Provider value={"Hello"}>{children}</GlobalContext.Provider>
  );
};

// need a function to use globalContext

export const useGlobalContext = () => {
  return React.useContext(GlobalContext);
};
