import { Box, Typography, OutlinedInput, Button } from "@mui/material";
import PostCard from "../components/PostCard";

import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";

import { queryClient } from "../AppProvider";

async function fetchPosts() {
    const res = await fetch("http://localhost:8800/posts");
    return res.json();
}

export default function Home() {
    const contentRef = useRef();

	const { data: posts, error, isLoading } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });

    if(error) {
        return <Box>
            <Typography>{error.message}</Typography>
        </Box>
    }

    if(isLoading) {
        return (
			<Box>
				<Typography>Loading...</Typography>
			</Box>
		);
    }

    const addPost = async () => {
        const content = contentRef.current.value;
        if(!content) return false;

        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:8800/posts", {
            method: "POST",
            body: JSON.stringify({ content }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });

        if(res.ok) {
            await queryClient.invalidateQueries({ queryKey: ["posts"] });
        }
    }

    const deletePost = async id => {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:8800/posts/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            await queryClient.invalidateQueries({ queryKey: ["posts"] });
        }
    };

    const toggleLike = async (id, liked) => {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:8800/posts/${id}/likes`, {
            method: liked ? "DELETE" : "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            await queryClient.invalidateQueries({ queryKey: ["posts"] });
        }
    };

	return (
		<Box>
			<Box sx={{ mb: 2 }}>
				<form onSubmit={e => {
                    e.preventDefault();
                    addPost();
                    e.currentTarget.reset();
                }}>
					<OutlinedInput
                        inputRef={contentRef}
						fullWidth
						placeholder="What's on your mind..."
						sx={{ mb: 2 }}
					/>
					<Button
                        type="submit"
						fullWidth
						variant="contained">
						Add Post
					</Button>
				</form>
			</Box>

			{posts.map(post => {
				return (
					<PostCard
						key={post.id}
						post={post}
                        onDelete={deletePost}
                        onToggleLike={toggleLike}
					/>
				);
			})}
		</Box>
	);
}
