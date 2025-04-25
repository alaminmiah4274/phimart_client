import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuthContext from "/src/hooks/useAuthContext.js";
import ErrorAlert from "/src/components/ErrorAlert.jsx";
import SuccessAlert from "/src/components/SuccessAlert.jsx";

const Register = () => {
  const { registerUser, errorMsg } = useAuthContext();
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    delete data.confirmPassword;

    try {
      const response = await registerUser(data);
      if (response.success) {
        setSuccessMsg(response.message);
        // setTimeout(() => navigate("/login"), 3000);
      }
    } catch (err) {
      console.log("Registration Failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          {errorMsg && <ErrorAlert error={errorMsg} />}
          {successMsg && <SuccessAlert success={successMsg} />}

          <h2 className="card-title text-2xl font-bold">Sign Up</h2>
          <p className="text-base-content/70">
            Create an account to get started
          </p>

          <form
            onSubmit={handleSubmit(handleRegister)}
            className="space-y-4 mt-4"
          >
            <div className="form-control">
              <label className="label" htmlFor="first_name">
                <span className="label-text">First Name</span>
              </label>
              <input
                id="first_name"
                type="text"
                placeholder="John"
                className="input input-bordered w-full"
                {...register("first_name", {
                  required: "first name is required",
                })}
              />
              {errors.first_name && (
                <span className="label-text-alt text-error">
                  {errors.first_name.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="last_name">
                <span className="label-text">Last Name</span>
              </label>
              <input
                id="last_name"
                type="text"
                placeholder="Doe"
                className="input input-bordered w-full"
                {...register("last_name", {
                  required: "last name is required",
                })}
              />
              {errors.last_name && (
                <span className="label-text-alt text-error">
                  {errors.last_name.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="input input-bordered w-full"
                {...register("email", { required: "email is required" })}
              />
              {errors.email && (
                <span className="label-text-alt text-error">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="address">
                <span className="label-text">Address</span>
              </label>
              <input
                id="address"
                type="text"
                placeholder="7/A Dhanmondi, Dhaka"
                className="input input-bordered w-full"
                {...register("address")}
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="phone_number">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                id="phone_number"
                type="text"
                placeholder="01314993347"
                className="input input-bordered w-full"
                {...register("phone_number")}
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder=".........."
                className="input input-bordered w-full"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be 8 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="label-text-alt text-error">
                  {errors.password?.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="confirmPassword">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder=".........."
                className="input input-bordered w-full"
                {...register("confirmPassword", {
                  required: "confirm password is required",
                  validate: (value) =>
                    value === watch("password") || "Password did not match",
                })}
              />
              {errors.confirmPassword && (
                <span className="label-text-alt text-error">
                  {errors.confirmPassword?.message}
                </span>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Sign Up
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-base-content/70">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

/*
registration link:
http://localhost:5174/activate/Nw/corxpa-a1b4893654acb1ef5bedfd965d4f97a8

*/
