import { useContext } from "react";
import AuthContext from "/src/context/AuthContext.jsx";

const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuthContext;
