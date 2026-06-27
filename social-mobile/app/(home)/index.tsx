import { Alert, ScrollView, View, Text } from "react-native";

import PostCard from "@/components/post-card";
import { PostType } from "@/types/global";
import { useMutation, useQuery } from "@tanstack/react-query";

import { api } from "@/libs/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { queryClient, useApp } from "@/components/app-provider";

async function fetchPosts(): Promise<PostType[]> {
	const res = await fetch(`${api()}/posts`);
	return res.json();
}

export default function Home() {
	const { auth } = useApp();
	const {
		data: posts,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["posts"],
		queryFn: fetchPosts,
	});

	const deletePost = useMutation({
		mutationFn: async (post: PostType) => {
			const token = await AsyncStorage.getItem("token");
			const res = await fetch(`${api()}/posts/${post.id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!res.ok) {
				throw new Error("Unable to delete post");
			}
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
		onError: error => {
			Alert.alert("Delete failed", error.message);
		},
	});

	const toggleLike = useMutation({
		mutationFn: async (post: PostType) => {
			if (!auth) {
				throw new Error("Please login before liking posts.");
			}

			const token = await AsyncStorage.getItem("token");
			const isLiked = post.likes?.some(like => like.userId === auth.id);
			const res = await fetch(`${api()}/posts/${post.id}/likes`, {
				method: isLiked ? "DELETE" : "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!res.ok) {
				throw new Error(isLiked ? "Unable to unlike post" : "Unable to like post");
			}
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
		onError: error => {
			Alert.alert("Like failed", error.message);
		},
	});

	const confirmDeletePost = (post: PostType) => {
		Alert.alert("Delete post?", "This will delete the post and its comments.", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Delete",
				style: "destructive",
				onPress: () => deletePost.mutate(post),
			},
		]);
	};

	if (error) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Text>{error.message}</Text>
			</View>
		);
	}

	if (isLoading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Text>Loading...</Text>
			</View>
		);
	}

	return (
		<ScrollView
			contentInsetAdjustmentBehavior="automatic"
			style={{ backgroundColor: "#f8fafc" }}
			contentContainerStyle={{ paddingBottom: 18 }}>
			{posts?.map(post => {
				return (
					<PostCard
						key={post.id}
						post={post}
						currentUserId={auth?.id}
						onDelete={confirmDeletePost}
						onToggleLike={post => toggleLike.mutate(post)}
					/>
				);
			})}
		</ScrollView>
	);
}
