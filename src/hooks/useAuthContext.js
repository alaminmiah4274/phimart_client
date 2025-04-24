import { useContext } from "react";
import AuthContext from "/src/context/AuthContext";

const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuthContext;
