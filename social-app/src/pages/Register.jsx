import { Alert, Box, Button, OutlinedInput, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Register() {
	const [error, setError] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();

	const create = async data => {
		const res = await fetch("http://localhost:8800/users", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		}).catch(() => setError("Unable to register"));

		if (res.ok) {
			navigate("/login");
		} else {
            setError("Unable to register");
        }
	};

	return (
		<Box>
			<Typography variant="h3">Register</Typography>

			{error && (
				<Alert
					severity="warning"
					sx={{ mt: 2 }}>
					{error}
				</Alert>
			)}

			<form onSubmit={handleSubmit(create)}>
				<OutlinedInput
					fullWidth
					sx={{ mt: 2 }}
					placeholder="name"
					{...register("name", { required: true })}
					error={errors.name}
				/>

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
					placeholder="bio"
					{...register("bio")}
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
					Register
				</Button>
			</form>
		</Box>
	);
}
