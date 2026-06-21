import {
	ScrollView,
	View,
	Text,
	TextInput,
	TouchableOpacity,
} from "react-native";

import PostCard from "@/components/post-card";
import { PostType } from "@/types/global";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

import { api } from "@/libs/api";

async function fetchPost(id: string): Promise<PostType> {
	// change localhost to your ip address
	const res = await fetch(`${api()}/${id}`);
	return res.json();
}

export default function ViewPost() {
	const { id } = useLocalSearchParams();

	const {
		data: post,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["posts", id as string],
		queryFn: () => fetchPost(id as string),
	});

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
		<ScrollView>
			<PostCard post={post} />
			<View style={{ padding: 15, gap: 5 }}>
				<TextInput
					style={{
						fontSize: 15,
						padding: 15,
						backgroundColor: "white",
						borderWidth: 1,
						borderColor: "#66666666",
						borderRadius: 20,
					}}
					placeholder="Your reply..."
				/>
				<TouchableOpacity
					style={{
						backgroundColor: "teal",
						padding: 15,
						borderRadius: 20,
						alignItems: "center",
					}}>
					<Text style={{ color: "white" }}>Add Comment</Text>
				</TouchableOpacity>
			</View>
			<View
				style={{
					marginHorizontal: 15,
				}}>
				{post.comments.map(comment => {
					return (
						<View
							key={comment.id}
							style={{
								padding: 15,
								backgroundColor: "white",
								borderBottomWidth: 1,
								borderColor: "#66666666",
							}}>
							<Text
								style={{ fontWeight: "bold", marginBottom: 5 }}>
								{comment.user.name}
							</Text>
							<Text>{comment.content}</Text>
						</View>
					);
				})}
			</View>
		</ScrollView>
	);
}
