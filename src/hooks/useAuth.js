import { useState } from "react";
import apiClient from "/src/components/services/api_client.js";

const useAuth = () => {
  const [user, setUser] = useState(null);

  const getToken = () => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  };

  const [authTokens, setAuthTokens] = useState(getToken());

  // login user:
  const loginUser = async (userData) => {
    const res = await apiClient.post("/auth/jwt/token", userData);
    console.log(res.data);
  };

  return { user, loginUser };
};

export default useAuth;
