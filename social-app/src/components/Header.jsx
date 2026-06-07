import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

import {
	Menu as MenuIcon,
	LightMode as LightModeIcon,
	DarkMode as DarkModeIcon,
} from "@mui/icons-material";

import { useApp } from "../AppProvider";

export default function Header() {
	const { mode, setMode, setOpenDrawer } = useApp();

	return (
		<AppBar>
			<Toolbar>
				<IconButton
					color="inherit"
					sx={{ mr: 2 }}
					onClick={() => setOpenDrawer(true)}>
					<MenuIcon />
				</IconButton>
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
