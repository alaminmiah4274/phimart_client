import { useState, useEffect } from "react";
import apiClient from "/src/components/services/api_client.js";

const useAuth = () => {
	const [user, setUser] = useState(null);
	const [errorMsg, setErrorMsg] = useState("");
	const [successMsg, setSuccessMsg] = useState("");

	// to get the token from local storage
	const getToken = () => {
		const token = localStorage.getItem("authTokens");
		return token ? JSON.parse(token) : null;
	};

	// to store the token
	const [authTokens, setAuthTokens] = useState(getToken());

	// used this to call fetchUserProfile() function
	useEffect(() => {
		if (authTokens) fetchUserProfile();
	}, [authTokens]);

	// error for api related fetching
	const handleAPIError = (
		error,
		defaultMessage = "Something Went Wrong! Try Again"
	) => {
		if (error.response && error.response.data) {
			const errorMessage = Object.values(error.response.data)
				.flat()
				.join("\n");
			setErrorMsg(errorMessage);

			return { success: false, message: defaultMessage };
		} else {
			setErrorMsg(defaultMessage);

			return { success: false, message: defaultMessage };
		}
	};

	// fetch current user:
	const fetchUserProfile = async () => {
		setErrorMsg("");
		try {
			const res = await apiClient.get("/auth/users/me", {
				headers: { Authorization: `JWT ${authTokens?.access}` },
			});

			setUser(res.data);
		} catch (err) {
			setErrorMsg(err.response?.data?.detail);
		}
	};

	// to update user info
	const updateUserProfile = async (data) => {
		setErrorMsg("");
		setSuccessMsg("");
		try {
			await apiClient.put("/auth/users/me/", data, {
				headers: { Authorization: `JWT ${authTokens?.access}` },
			});

			setSuccessMsg("Profile Successfully Updated");
		} catch (err) {
			return handleAPIError(err);
		}
	};

	// user password change
	const changePassword = async (data) => {
		setErrorMsg("");
		setSuccessMsg("");
		try {
			await apiClient.post("/auth/users/set_password/", data, {
				headers: { Authorization: `JWT ${authTokens?.access}` },
			});

			setSuccessMsg("Password Successfully Changed");
		} catch (err) {
			return handleAPIError(err);
		}
	};

	// login user:
	const loginUser = async (userData) => {
		setErrorMsg("");
		try {
			const res = await apiClient.post("/auth/jwt/create", userData);
			setAuthTokens(res.data);
			localStorage.setItem("authTokens", JSON.stringify(res.data));

			return { success: true };
		} catch (err) {
			setErrorMsg(err.response?.data?.detail);

			return { success: false };
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
			return handleAPIError(err, "Registration Failed! Try Again");
		}
	};

	// logout the user:
	const logoutUser = () => {
		setAuthTokens(null);
		setUser(null);

		localStorage.removeItem("authTokens");
		localStorage.removeItem("cartId");
	};

	return {
		errorMsg,
		successMsg,
		user,
		loginUser,
		registerUser,
		logoutUser,
		updateUserProfile,
		changePassword,
	};
};

export default useAuth;

/*
Log in error message: err.response.data?.detail


users registration:
1. sam bilings: Lings@2024 --> li202425
*/
