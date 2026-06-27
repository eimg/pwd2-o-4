import {
	Alert,
	ScrollView,
	View,
	Text,
	TextInput,
	TouchableOpacity,
} from "react-native";

import PostCard from "@/components/post-card";
import { CommentType, PostType } from "@/types/global";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";

import { api } from "@/libs/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { queryClient, useApp } from "@/components/app-provider";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { formatDistanceToNow } from "date-fns";

async function fetchPost(id: string): Promise<PostType> {
	// change localhost to your ip address
	const res = await fetch(`${api()}/posts/${id}`);
	return res.json();
}

function distanceFromNow(value: string) {
	const date = new Date(value);

	return Number.isNaN(date.getTime())
		? value
		: `${formatDistanceToNow(date)} ago`;
}

export default function ViewPost() {
	const { id } = useLocalSearchParams();
	const postId = String(id);
	const { auth } = useApp();
	const [content, setContent] = useState("");

	const {
		data: post,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["posts", postId],
		queryFn: () => fetchPost(postId),
	});

	const addComment = useMutation({
		mutationFn: async () => {
			const token = await AsyncStorage.getItem("token");
			const res = await fetch(`${api()}/posts/${postId}/comments`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ content }),
			});

			if (!res.ok) {
				throw new Error("Unable to add comment");
			}
		},
		onSuccess: async () => {
			setContent("");
			await queryClient.invalidateQueries({ queryKey: ["posts"] });
			await queryClient.invalidateQueries({ queryKey: ["posts", postId] });
		},
		onError: error => {
			Alert.alert("Comment failed", error.message);
		},
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
			router.back();
		},
		onError: error => {
			Alert.alert("Delete failed", error.message);
		},
	});

	const deleteComment = useMutation({
		mutationFn: async (comment: CommentType) => {
			const token = await AsyncStorage.getItem("token");
			const res = await fetch(`${api()}/comments/${comment.id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!res.ok) {
				throw new Error("Unable to delete comment");
			}
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["posts"] });
			await queryClient.invalidateQueries({ queryKey: ["posts", postId] });
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
			await queryClient.invalidateQueries({ queryKey: ["posts", postId] });
		},
		onError: error => {
			Alert.alert("Like failed", error.message);
		},
	});

	const submitComment = () => {
		if (!auth) {
			Alert.alert("Login required", "Please login before commenting.");
			return;
		}

		if (content.trim()) {
			addComment.mutate();
		}
	};

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

	const confirmDeleteComment = (comment: CommentType) => {
		Alert.alert("Delete comment?", "This cannot be undone.", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Delete",
				style: "destructive",
				onPress: () => deleteComment.mutate(comment),
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

	if (!post) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Text>Cannot find post!</Text>
			</View>
		);
	}

	return (
		<ScrollView
			contentInsetAdjustmentBehavior="automatic"
			style={{ backgroundColor: "#f8fafc" }}
			contentContainerStyle={{ paddingBottom: 24 }}>
			<PostCard
				post={post}
				currentUserId={auth?.id}
				onDelete={confirmDeletePost}
				onToggleLike={post => toggleLike.mutate(post)}
			/>
			<View
				style={{
					marginHorizontal: 12,
					marginTop: 10,
					padding: 12,
					gap: 10,
					borderWidth: 1,
					borderColor: "#e5e7eb",
					borderRadius: 8,
					backgroundColor: "#ffffff",
					boxShadow: "0 1px 2px rgba(15, 23, 42, 0.06)",
				}}>
				<TextInput
					value={content}
					onChangeText={setContent}
					multiline
					style={{
						fontSize: 15,
						minHeight: 88,
						padding: 12,
						color: "#111827",
						backgroundColor: "#f8fafc",
						borderWidth: 1,
						borderColor: "#e5e7eb",
						borderRadius: 8,
						textAlignVertical: "top",
					}}
					placeholder="Your reply..."
					placeholderTextColor="#94a3b8"
				/>
				<TouchableOpacity
					onPress={submitComment}
					disabled={addComment.isPending || !content.trim()}
					style={{
						backgroundColor:
							addComment.isPending || !content.trim()
								? "#cbd5e1"
								: "#2563eb",
						paddingVertical: 13,
						borderRadius: 8,
						alignItems: "center",
					}}>
					<Text style={{ color: "#ffffff", fontWeight: "700" }}>
						{addComment.isPending ? "Adding..." : "Add Comment"}
					</Text>
				</TouchableOpacity>
			</View>
			<View
				style={{
					marginHorizontal: 12,
					marginTop: 10,
					gap: 8,
				}}>
				{post.comments.map(comment => {
					return (
						<View
							key={comment.id}
							style={{
								padding: 12,
								backgroundColor: "#ffffff",
								borderWidth: 1,
								borderColor: "#e5e7eb",
								borderRadius: 8,
							}}>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									gap: 8,
									marginBottom: 6,
								}}>
								<Text
									style={{
										flex: 1,
										color: "#111827",
										fontWeight: "700",
									}}>
									{comment.user.name}
								</Text>
								<Text style={{ color: "#64748b", fontSize: 13 }}>
									{distanceFromNow(comment.created)}
								</Text>
								{auth?.id === comment.user.id && (
									<TouchableOpacity
										onPress={() =>
											confirmDeleteComment(comment)
										}
										style={{
											width: 34,
											height: 34,
											borderRadius: 17,
											alignItems: "center",
											justifyContent: "center",
											flexShrink: 0,
											backgroundColor: "#fef2f2",
										}}>
										<Ionicons
											name="trash-outline"
											size={20}
											color="#dc2626"
										/>
									</TouchableOpacity>
								)}
							</View>
							<Text
								style={{
									color: "#1f2937",
									fontSize: 15,
									lineHeight: 22,
								}}>
								{comment.content}
							</Text>
						</View>
					);
				})}
			</View>
		</ScrollView>
	);
}
