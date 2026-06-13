import { Box, Button, OutlinedInput, Typography } from "@mui/material";

import { useForm } from "react-hook-form";

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const create = data => console.log(data);

    return (
		<Box>
			<Typography variant="h3">Register</Typography>
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
