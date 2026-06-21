import { ScrollView, View, Text } from "react-native";

import PostCard from "@/components/post-card";
import { PostType } from "@/types/global";
import { useQuery } from "@tanstack/react-query";

import { api } from "@/libs/api";

async function fetchPosts(): Promise<PostType[]> {
	const res = await fetch(`${api()}/posts`);
	return res.json();
}

export default function Home() {
	const {
		data: posts,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["posts"],
		queryFn: fetchPosts,
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
			{posts?.map(post => {
				return (
					<PostCard
						key={post.id}
						post={post}
					/>
				);
			})}
		</ScrollView>
	);
}
