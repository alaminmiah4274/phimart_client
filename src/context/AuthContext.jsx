import { createContext } from "react";
import useAuth from "/src/hooks/useAuth.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const allContext = useAuth();

  return (
    <AuthContext.Provider value={allContext}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
