import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { grey } from "@mui/material/colors";
import {
    Home as HomeIcon,
    Login as LoginIcon,
    PersonAdd as RegisterIcon,
    Logout as LogoutIcon,
    Person as ProfileIcon,
} from "@mui/icons-material";
import { useApp } from "../AppProvider";

import { useNavigate } from "react-router";

export default function AppDrawer() {
	const { openDrawer, setOpenDrawer, auth, setAuth } = useApp();

    const navigate = useNavigate();

	return (
		<Drawer
			open={openDrawer}
			onClick={() => setOpenDrawer(false)}
			onClose={() => setOpenDrawer(false)}>
			<Box sx={{ width: 240, height: 200, background: grey[500] }}></Box>

			<List>
				<ListItem>
					<ListItemButton onClick={() => navigate("/")}>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary="Home" />
					</ListItemButton>
				</ListItem>
			</List>

			<Divider />

			{!auth && (
				<List>
					<ListItem>
						<ListItemButton onClick={() => navigate("/login")}>
							<ListItemIcon>
								<LoginIcon />
							</ListItemIcon>
							<ListItemText primary="Login" />
						</ListItemButton>
					</ListItem>
					<ListItem>
						<ListItemButton onClick={() => navigate("/register")}>
							<ListItemIcon>
								<RegisterIcon />
							</ListItemIcon>
							<ListItemText primary="Register" />
						</ListItemButton>
					</ListItem>
				</List>
			)}

			{auth && (
				<List>
					<ListItem>
						<ListItemButton onClick={() => navigate("/profile")}>
							<ListItemIcon>
								<ProfileIcon />
							</ListItemIcon>
							<ListItemText primary="Profile" />
						</ListItemButton>
					</ListItem>
					<ListItem>
						<ListItemButton onClick={() => {
                            setAuth(undefined);
                            localStorage.removeItem("token");
                            navigate("/");
                        }}>
							<ListItemIcon>
								<LogoutIcon />
							</ListItemIcon>
							<ListItemText primary="Logout" />
						</ListItemButton>
					</ListItem>
				</List>
			)}
		</Drawer>
	);
}
