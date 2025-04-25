import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import SuccessAlert from "/src/components/SuccessAlert.jsx";
import ErrorAlert from "/src/components/ErrorAlert.jsx";
import apiClient from "/src/components/services/api_client.js";

const ActivateAccount = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { uid, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .post("/auth/users/activation/", { uid, token })
      .then((res) => {
        setMessage("Account activate successfully");
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch((err) => {
        setError("Something went wrong. Please check your activation link");
        console.log(err);
      });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold">Account Activation</h2>
        {message && <SuccessAlert success={message} />}
        {error && <ErrorAlert error={error} />}
      </div>
    </div>
  );
};

export default ActivateAccount;

/*
registration link:
http://localhost:5174/activate/Nw/corxpa-a1b4893654acb1ef5bedfd965d4f97a8


http://localhost:5173/activate/OQ/cosmr4-53a58d84b609352829106d604f25e1a8
http://localhost:5174/activate/OQ/cosmr4-53a58d84b609352829106d604f25e1a8


users:
sam boiled: blings@2024
*/
