import {
	Avatar,
	Box,
	Button,
	ButtonGroup,
	Card,
	CardContent,
	IconButton,
	Typography,
} from "@mui/material";

import { green } from "@mui/material/colors";

import {
	FavoriteBorder as LikeIcon,
	ChatBubbleOutlineOutlined as CommentIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router";

export default function PostCard({ post }) {
	const navigate = useNavigate();

	return (
		<Card sx={{ mb: 2 }}>
			<CardContent>
				<Box sx={{ display: "flex", gap: 2 }}>
					<Box>
						<Avatar
							sx={{
								width: 52,
								height: 52,
								borderRadius: 52,
								background: green[500],
							}}>
							{post.user.name[0].toUpperCase()}
						</Avatar>
					</Box>
					<Box>
						<Typography sx={{ fontWeight: "bold" }}>
							{post.user.name}
						</Typography>
						<Typography
							sx={{ fontSize: "0.8em", color: green[500] }}>
							{post.created}
						</Typography>
						<Typography
							sx={{ mt: 1 }}
							onClick={() => navigate(`/view/${post.id}`)}>
							{post.content}
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						mt: 2,
						display: "flex",
						justifyContent: "space-around",
					}}>
					<ButtonGroup>
						<IconButton size="sm">
							<LikeIcon color="error" />
						</IconButton>
						<Button
							size="sm"
							variant="text">
							10
						</Button>
					</ButtonGroup>
					<ButtonGroup>
						<IconButton size="sm">
							<CommentIcon sx={{ color: "gray" }} />
						</IconButton>
						<Button
							size="sm"
							variant="text">
							{post.comments ? post.comments.length : 0}
						</Button>
					</ButtonGroup>
				</Box>
			</CardContent>
		</Card>
	);
}
