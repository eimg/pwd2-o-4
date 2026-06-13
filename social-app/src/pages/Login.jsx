import { Box, Button, OutlinedInput, Typography } from "@mui/material";

import { useForm } from "react-hook-form";

export default function Login() {
    const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const login = data => console.log(data);

	return (
		<Box>
			<Typography variant="h3">Login</Typography>
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
