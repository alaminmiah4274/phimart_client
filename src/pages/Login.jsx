import useAuthContext from "/src/hooks/useAuthContext.js";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import ErrorAlert from "/src/components/ErrorAlert";
import { useState } from "react";

const Login = () => {
	const { errorMsg, user, loginUser } = useAuthContext();
	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();

	const handleLogIn = async (data) => {
		setLoading(true);
		try {
			const response = await loginUser(data);

			if (response.success) navigate("/dashboard");
		} catch (err) {
			console.log("login failed:", err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center px-4 py-12 bg-base-200">
			<div className="card w-full max-w-md bg-base-100 shadow-xl">
				<div className="card-body">
					{errorMsg && <ErrorAlert error={errorMsg} />}
					<h2 className="card-title text-2xl font-bold">Log In</h2>
					<p className="text-base-content/70">
						Enter your email and password to access your account
					</p>

					<form
						onSubmit={handleSubmit(handleLogIn)}
						className="space-y-4 mt-4"
					>
						<div className="form-control">
							<label className="label" htmlFor="email">
								<span className="label-text">Email</span>
							</label>
							<input
								{...register("email", {
									required: "email is required",
								})}
								id="email"
								type="email"
								placeholder="name@example.com"
								className={`input input-bordered w-full ${
									errors.email ? "input-error" : ""
								}`}
							/>
							{errors.email && (
								<span className="label-text-alt text-error">
									{errors.email?.message}
								</span>
							)}
						</div>
						<div className="form-control">
							<label className="label" htmlFor="password">
								<span className="label-text">Password</span>
							</label>
							<input
								{...register("password", {
									required: "password is required",
								})}
								id="password"
								type="password"
								placeholder=".........."
								className={`input input-bordered w-full ${
									errors.password ? "input-error" : ""
								}`}
							/>
							{errors.password && (
								<span className="label-text-alt text-error">
									{errors.password?.message}
								</span>
							)}
						</div>

						<button
							type="submit"
							className="btn btn-primary w-full"
							disabled={loading}
						>
							{loading ? "Loging..." : "Log In"}
						</button>
					</form>

					<div className="text-center mt-4">
						<p className="text-base-content/70">
							Don&apos;t have an account?{" "}
							<Link to="/register" className="link link-primary">
								Sign Up
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
