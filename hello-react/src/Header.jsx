import { AppBar, Toolbar, Typography, Badge } from "@mui/material";

export default function Header({ count }) {
	return (
		<AppBar position="static">
			<Toolbar>
				<Typography>
					<Badge
						badgeContent={count}
						color="error">
						Todo
					</Badge>
				</Typography>
			</Toolbar>
		</AppBar>
	);
}
