import React, { createContext } from "react";
import useAuth from "../hooks/useAuth";

export const AuthContext = createContext();
const ContextProvider = ({ children }) => {
    const AuthContextValue = useAuth();
    return (
      <AuthContext.Provider value={AuthContextValue}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export default ContextProvider;