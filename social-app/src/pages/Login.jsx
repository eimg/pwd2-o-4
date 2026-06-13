import { Alert, Box, Button, OutlinedInput, Typography } from "@mui/material";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { useApp } from "../AppProvider";
import { useNavigate } from "react-router";

export default function Login() {
	const [error, setError] = useState("");

	const { setAuth } = useApp();

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const login = async data => {
		const res = await fetch("http://localhost:8800/login", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		}).catch(() => setError("Unable to login"));

		if (res.ok) {
			const { user, token } = await res.json();
			localStorage.setItem("token", token);
			setAuth(user);
			navigate("/");
		} else {
			setError("Unable to login");
		}
	};

	return (
		<Box>
			<Typography variant="h3">Login</Typography>

			{error && <Alert severity="warning" sx={{ mt: 2 }}>{error}</Alert>}

			<form onSubmit={handleSubmit(login)}>
				<OutlinedInput
					fullWidth
					sx={{ mt: 2 }}
					placeholder="username"
					{...register("username", { required: true })}
					error={errors.username}
				/>

				<OutlinedInput
					fullWidth
					sx={{ mt: 2 }}
					type="password"
					placeholder="password"
					{...register("password", { required: true })}
					error={errors.password}
				/>

				<Button
					sx={{ mt: 2 }}
					fullWidth
					type="submit"
					variant="contained">
					Login
				</Button>
			</form>
		</Box>
	);
}
