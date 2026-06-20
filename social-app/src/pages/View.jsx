import { Box, Button, IconButton, OutlinedInput, Typography } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import PostCard from "../components/PostCard";
import { useRef } from "react";
import { queryClient, useApp } from "../AppProvider";

async function fetchPost(id) {
	const res = await fetch(`http://localhost:8800/posts/${id}`);
	return res.json();
}

export default function View() {
	const { id } = useParams();
	const navigate = useNavigate();
	const contentRef = useRef();
	const { auth } = useApp();

	const {
		data: post,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["post", id],
		queryFn: () => fetchPost(id),
	});

	const addComment = async () => {
		const content = contentRef.current.value;
		if (!content) return false;

		const token = localStorage.getItem("token");

		const res = await fetch(`http://localhost:8800/posts/${id}/comments`, {
			method: "POST",
			body: JSON.stringify({ content }),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		if (res.ok) {
			await queryClient.invalidateQueries({ queryKey: ["post", id] });
			await queryClient.invalidateQueries({ queryKey: ["posts"] });
		}
	};

	const deleteComment = async commentId => {
		const token = localStorage.getItem("token");

		const res = await fetch(`http://localhost:8800/comments/${commentId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (res.ok) {
			await queryClient.invalidateQueries({ queryKey: ["post", id] });
			await queryClient.invalidateQueries({ queryKey: ["posts"] });
		}
	};

	const deletePost = async postId => {
		const token = localStorage.getItem("token");

		const res = await fetch(`http://localhost:8800/posts/${postId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (res.ok) {
			await queryClient.invalidateQueries({ queryKey: ["posts"] });
			navigate("/");
		}
	};

	const toggleLike = async (postId, liked) => {
		const token = localStorage.getItem("token");

		const res = await fetch(`http://localhost:8800/posts/${postId}/likes`, {
			method: liked ? "DELETE" : "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (res.ok) {
			await queryClient.invalidateQueries({ queryKey: ["post", id] });
			await queryClient.invalidateQueries({ queryKey: ["posts"] });
		}
	};

	if (error) {
		return (
			<Box>
				<Typography>{error.message}</Typography>
			</Box>
		);
	}

	if (isLoading) {
		return (
			<Box>
				<Typography>Loading...</Typography>
			</Box>
		);
	}

	return (
		<Box>
			<PostCard
				post={post}
				onDelete={deletePost}
				onToggleLike={toggleLike}
			/>

			<Box sx={{ my: 2 }}>
				<form onSubmit={e => {
					e.preventDefault();
					addComment();
					e.currentTarget.reset();
				}}>
					<OutlinedInput
						inputRef={contentRef}
						fullWidth
						placeholder="Your reply..."
                        sx={{ mb: 2 }}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained">
						Add Comment
					</Button>
				</form>
			</Box>

            <Box>
                {post.comments?.map(comment => {
                    return (
						<Box
							key={comment.id}
							sx={{ mb: 2, p: 2, border: "1px solid #66666666" }}>
							<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
									<Typography
										sx={{ mb: 1, fontWeight: "bold", cursor: "pointer" }}
										onClick={() => navigate(`/profile/${comment.userId}`)}>
										{comment.user.name}
									</Typography>
								{auth?.id === comment.userId && (
									<IconButton
										aria-label="delete comment"
										color="error"
										size="small"
										sx={{ ml: "auto" }}
										onClick={() => deleteComment(comment.id)}>
										<DeleteIcon />
									</IconButton>
								)}
							</Box>
							<Typography>{comment.content}</Typography>
						</Box>
					);
                })}
            </Box>
		</Box>
	);
}
