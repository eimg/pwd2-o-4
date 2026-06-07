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

export default function AppDrawer() {
	const { openDrawer, setOpenDrawer } = useApp();

	return (
		<Drawer
			open={openDrawer}
			onClick={() => setOpenDrawer(false)}
			onClose={() => setOpenDrawer(false)}>
			<Box sx={{ width: 240, height: 200, background: grey[500] }}></Box>

			<List>
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary="Home" />
					</ListItemButton>
				</ListItem>
			</List>

			<Divider />

			<List>
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<LoginIcon />
						</ListItemIcon>
						<ListItemText primary="Login" />
					</ListItemButton>
				</ListItem>
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<RegisterIcon />
						</ListItemIcon>
						<ListItemText primary="Register" />
					</ListItemButton>
				</ListItem>
			</List>

			<List>
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<ProfileIcon />
						</ListItemIcon>
						<ListItemText primary="Profile" />
					</ListItemButton>
				</ListItem>
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<LogoutIcon />
						</ListItemIcon>
						<ListItemText primary="Logout" />
					</ListItemButton>
				</ListItem>
			</List>
		</Drawer>
	);
}
