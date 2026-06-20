import { Avatar, Box, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router";
import PostCard from "../components/PostCard";
import { queryClient, useApp } from "../AppProvider";

async function fetchUser(id) {
	const res = await fetch(`http://localhost:8800/users/${id}`);

	if (!res.ok) {
		throw new Error("Unable to load profile");
	}

	return res.json();
}

export default function Profile() {
	const { id } = useParams();
	const { auth } = useApp();

	const {
		data: user,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["profile", id],
		queryFn: () => fetchUser(id),
		enabled: Boolean(id),
	});

	const deletePost = async postId => {
		const token = localStorage.getItem("token");

		const res = await fetch(`http://localhost:8800/posts/${postId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (res.ok) {
			await queryClient.invalidateQueries({ queryKey: ["profile", id] });
			await queryClient.invalidateQueries({ queryKey: ["posts"] });
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
			await queryClient.invalidateQueries({ queryKey: ["profile", id] });
			await queryClient.invalidateQueries({ queryKey: ["posts"] });
		}
	};

	if (!id) {
		if (auth?.id) {
			return (
				<Navigate
					to={`/profile/${auth.id}`}
					replace
				/>
			);
		}

		return (
			<Box>
				<Typography>Login to view your profile.</Typography>
			</Box>
		);
	}

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
			<Box
				sx={{
					mb: 6,
					position: "relative",
					height: 150,
					borderRadius: 2,
					background: `linear-gradient(135deg, ${green[700]}, ${green[400]})`,
				}}>
				<Avatar
					sx={{
						position: "absolute",
						left: "50%",
						bottom: -42,
						transform: "translateX(-50%)",
						width: 96,
						height: 96,
						border: "4px solid",
						borderColor: "background.paper",
						background: green[500],
						fontSize: 42,
					}}>
					{user.name[0].toUpperCase()}
				</Avatar>
			</Box>

			<Box sx={{ textAlign: "center", mb: 4 }}>
				<Typography variant="h4">{user.name}</Typography>
				<Typography color="text.secondary">@{user.username}</Typography>
				{user.bio && <Typography sx={{ mt: 1 }}>{user.bio}</Typography>}
			</Box>

			<Typography
				variant="h6"
				sx={{ mb: 2 }}>
				Posts
			</Typography>

			{user.posts.length ? (
				user.posts.map(post => (
					<PostCard
						key={post.id}
						post={post}
						onDelete={deletePost}
						onToggleLike={toggleLike}
					/>
				))
			) : (
				<Typography color="text.secondary">No posts yet.</Typography>
			)}
		</Box>
	);
}
