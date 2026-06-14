import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

import {
	Menu as MenuIcon,
	LightMode as LightModeIcon,
	DarkMode as DarkModeIcon,
	ArrowBack as BackIcon,
} from "@mui/icons-material";

import { useApp } from "../AppProvider";
import { useLocation, useNavigate } from "react-router";

export default function Header() {
	const { mode, setMode, setOpenDrawer } = useApp();

	const { pathname } = useLocation();
	const navigate = useNavigate();

	return (
		<AppBar position="static">
			<Toolbar>
				{pathname == "/" ? (
					<IconButton
						color="inherit"
						sx={{ mr: 2 }}
						onClick={() => setOpenDrawer(true)}>
						<MenuIcon />
					</IconButton>
				) : (
					<IconButton
						color="inherit"
						sx={{ mr: 2 }}
						onClick={() => navigate("/")}>
						<BackIcon />
					</IconButton>
				)}

				<Typography sx={{ flexGrow: 1 }}>Social</Typography>
				{mode == "dark" ? (
					<IconButton
						color="inherit"
						onClick={() => setMode("light")}>
						<LightModeIcon />
					</IconButton>
				) : (
					<IconButton
						color="inherit"
						onClick={() => setMode("dark")}>
						<DarkModeIcon />
					</IconButton>
				)}
			</Toolbar>
		</AppBar>
	);
}
