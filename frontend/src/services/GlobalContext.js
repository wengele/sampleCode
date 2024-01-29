import React, { useContext, useEffect, useState } from "react";

const appContext = React.createContext();
const appContextUpdater = React.createContext();

export const useAppContext = () => {
  return useContext(appContext);
};

export const useAppContextUpdater = () => {
  return useContext(appContextUpdater);
};

const GlobalContext = ({ children }) => {
  const [state, setState] = useState({ user: null });

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setState({ ...state, user: JSON.parse(user) });
    }
  }, []);

  return (
    <appContext.Provider value={{ state }}>
      <appContextUpdater.Provider value={{ setState }}>
        {children}
      </appContextUpdater.Provider>
    </appContext.Provider>
  );
};

export default GlobalContext;
