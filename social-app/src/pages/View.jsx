import { Box, Button, OutlinedInput, Typography } from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import PostCard from "../components/PostCard";

async function fetchPost(id) {
	const res = await fetch(`http://localhost:8800/posts/${id}`);
	return res.json();
}

export default function View() {
	const { id } = useParams();

	const {
		data: post,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["post"],
		queryFn: () => fetchPost(id),
	});

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
			<PostCard post={post} />

			<Box sx={{ my: 2 }}>
				<form>
					<OutlinedInput
						fullWidth
						placeholder="Your reply..."
                        sx={{ mb: 2 }}
					/>
					<Button
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
							sx={{ mb: 2, p: 2, border: "1px solid #66666666" }}>
							<Typography sx={{ mb: 1, fontWeight: "bold" }}>{comment.user.name}</Typography>
							<Typography>{comment.content}</Typography>
						</Box>
					);
                })}
            </Box>
		</Box>
	);
}
