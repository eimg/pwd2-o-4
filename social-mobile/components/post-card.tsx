import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PostType } from "@/types/global";
import { router } from "expo-router";

export default function PostCard({ post }: { post: PostType }) {
	return (
		<View
			style={{
				padding: 15,
				borderBottomWidth: 1,
				borderColor: "#66666666",
				backgroundColor: "white",
			}}>
			<View style={{ flexDirection: "row", gap: 15 }}>
				<View
					style={{
						width: 54,
						height: 54,
						borderRadius: 54,
						backgroundColor: "teal",
						alignItems: "center",
						justifyContent: "center",
					}}>
					<Text style={{ color: "white" }}>
						{post.user.name[0].toUpperCase()}
					</Text>
				</View>
				<View style={{ flexShrink: 1 }}>
					<Text style={{ fontSize: 15, fontWeight: "bold" }}>
						{post.user.name}
					</Text>
					<Text style={{ color: "teal" }}>{post.created}</Text>
					<TouchableOpacity
						onPress={() => router.push(`/view/${post.id}`)}>
						<Text style={{ marginTop: 5, fontSize: 15 }}>
							{post.content}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-around",
					marginTop: 15,
				}}>
				<View
					style={{
						flexDirection: "row",
						gap: 5,
						alignItems: "center",
					}}>
					<TouchableOpacity>
						<Ionicons
							name="heart-outline"
							size={24}
							color="red"
						/>
					</TouchableOpacity>
					<Text>10</Text>
				</View>

				<View
					style={{
						flexDirection: "row",
						gap: 5,
						alignItems: "center",
					}}>
					<TouchableOpacity>
						<Ionicons
							name="chatbubble-outline"
							size={24}
							color="gray"
						/>
					</TouchableOpacity>
					<Text>{post.comments ? post.comments.length : 0}</Text>
				</View>
			</View>
		</View>
	);
}
