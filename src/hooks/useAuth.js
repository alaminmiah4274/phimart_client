import { useState, useEffect } from "react";
import apiClient from "/src/components/services/api_client.js";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const getToken = () => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  };

  const [authTokens, setAuthTokens] = useState(getToken());

  // used this to call fetchUserProfile() function
  useEffect(() => {
    if (authTokens) fetchUserProfile();
  }, [authTokens]);

  // fetch current user:
  const fetchUserProfile = async () => {
    setErrorMsg("");
    try {
      const res = await apiClient.get("/auth/users/me", {
        headers: { Authorization: `JWT ${authTokens?.access}` },
      });

      setUser(res.data);
    } catch (err) {
      setErrorMsg(err.response.data?.detail);
    }
  };

  // login user:
  const loginUser = async (userData) => {
    setErrorMsg("");
    try {
      const res = await apiClient.post("/auth/jwt/create", userData);
      setAuthTokens(res.data);
      localStorage.setItem("authTokens", JSON.stringify(res.data));
    } catch (err) {
      setErrorMsg(err.response.data?.detail);
    }
  };

  // register the user:
  const registerUser = async (userData) => {
    setErrorMsg("");
    try {
      await apiClient.post("/auth/users/", userData);
      return {
        success: true,
        message:
          "Registration successful. Check your email to activate your account",
      };
    } catch (err) {
      if (err.response && err.response.data) {
        const errorMessage = Object.values(err.response.data).flat().join("\n");
        setErrorMsg(errorMessage);

        return { success: false, message: errorMessage };
      } else {
        setErrorMsg("Registartion failed. Please try again");

        return {
          success: false,
          message: "Registartion failed. Please try again",
        };
      }
    }
  };

  // logout the user:
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);

    localStorage.removeItem("authTokens");
  };

  return { errorMsg, user, loginUser, registerUser, logoutUser };
};

export default useAuth;

/*
Log in error message: err.response.data?.detail


users registration:
1. sam bilings: Lings@2024 --> li202425
*/
