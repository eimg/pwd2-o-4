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
	Favorite as LikedIcon,
	ChatBubbleOutlineOutlined as CommentIcon,
	Delete as DeleteIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router";
import { useApp } from "../AppProvider";

export default function PostCard({ post, onDelete, onToggleLike }) {
	const navigate = useNavigate();
	const { auth } = useApp();
	const canDelete = auth?.id === post.userId;
	const liked = post.likes?.some(like => like.userId === auth?.id);
	const likeCount = post.likes ? post.likes.length : 0;

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
						<Typography
							sx={{ fontWeight: "bold", cursor: "pointer" }}
							onClick={() => navigate(`/profile/${post.userId}`)}>
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
					{canDelete && onDelete && (
						<Box sx={{ ml: "auto" }}>
							<IconButton
								aria-label="delete post"
								color="error"
								onClick={() => onDelete(post.id)}>
								<DeleteIcon />
							</IconButton>
						</Box>
					)}
				</Box>
				<Box
					sx={{
						mt: 2,
						display: "flex",
						justifyContent: "space-around",
					}}>
					<ButtonGroup>
						<IconButton
							size="sm"
							disabled={!auth || !onToggleLike}
							onClick={() => onToggleLike(post.id, liked)}>
							{liked ? (
								<LikedIcon color="error" />
							) : (
								<LikeIcon color="error" />
							)}
						</IconButton>
						<Button
							size="sm"
							variant="text">
							{likeCount}
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
