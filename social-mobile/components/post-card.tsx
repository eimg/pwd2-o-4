import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PostType } from "@/types/global";
import { router } from "expo-router";
import { formatDistanceToNow } from "date-fns";

type PostCardProps = {
	post: PostType;
	currentUserId?: number;
	onDelete?: (post: PostType) => void;
	onToggleLike?: (post: PostType) => void;
};

export default function PostCard({
	post,
	currentUserId,
	onDelete,
	onToggleLike,
}: PostCardProps) {
	const canDelete = currentUserId === post.user.id && onDelete;
	const isLiked = post.likes?.some(like => like.userId === currentUserId);
	const likeCount = post.likes ? post.likes.length : 0;
	const createdAt = new Date(post.created);
	const createdLabel = Number.isNaN(createdAt.getTime())
		? post.created
		: `${formatDistanceToNow(createdAt)} ago`;

	return (
		<View
			style={{
				marginHorizontal: 12,
				marginTop: 10,
				padding: 14,
				borderWidth: 1,
				borderColor: "#e5e7eb",
				borderRadius: 8,
				backgroundColor: "#ffffff",
				boxShadow: "0 1px 2px rgba(15, 23, 42, 0.06)",
			}}>
			<View style={{ flexDirection: "row", gap: 12 }}>
				<View
					style={{
						width: 44,
						height: 44,
						borderRadius: 22,
						backgroundColor: "#111827",
						alignItems: "center",
						justifyContent: "center",
					}}>
					<Text
						style={{
							color: "#ffffff",
							fontSize: 16,
							fontWeight: "700",
						}}>
						{post.user.name[0].toUpperCase()}
					</Text>
				</View>
				<View style={{ flex: 1, minWidth: 0 }}>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 8,
						}}>
						<View style={{ flex: 1, minWidth: 0 }}>
							<Text
								style={{
									color: "#111827",
									fontSize: 15,
									fontWeight: "700",
								}}>
								{post.user.name}
							</Text>
							<Text
								style={{
									color: "#64748b",
									fontSize: 13,
									marginTop: 2,
								}}>
								{createdLabel}
							</Text>
						</View>
						{canDelete && (
							<TouchableOpacity
								onPress={() => onDelete(post)}
								style={{
									width: 36,
									height: 36,
									borderRadius: 18,
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
					<TouchableOpacity
						onPress={() => router.push(`/view/${post.id}`)}>
						<Text
							style={{
								marginTop: 8,
								color: "#1f2937",
								fontSize: 15,
								lineHeight: 22,
							}}>
							{post.content}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "flex-start",
					gap: 14,
					marginTop: 14,
					paddingLeft: 56,
				}}>
				<View
					style={{
						flexDirection: "row",
						gap: 6,
						alignItems: "center",
					}}>
					<TouchableOpacity
						onPress={() => onToggleLike?.(post)}
						disabled={!onToggleLike}
						style={{
							width: 36,
							height: 36,
							borderRadius: 18,
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: isLiked ? "#fef2f2" : "#f8fafc",
						}}>
						<Ionicons
							name={isLiked ? "heart" : "heart-outline"}
							size={24}
							color={isLiked ? "#ef4444" : "#64748b"}
						/>
					</TouchableOpacity>
					<Text
						style={{
							color: "#475569",
							fontVariant: ["tabular-nums"],
							fontWeight: "600",
						}}>
						{likeCount}
					</Text>
				</View>

				<View
					style={{
						flexDirection: "row",
						gap: 6,
						alignItems: "center",
					}}>
					<TouchableOpacity
						onPress={() => router.push(`/view/${post.id}`)}
						style={{
							width: 36,
							height: 36,
							borderRadius: 18,
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: "#f8fafc",
						}}>
						<Ionicons
							name="chatbubble-outline"
							size={24}
							color="#64748b"
						/>
					</TouchableOpacity>
					<Text
						style={{
							color: "#475569",
							fontVariant: ["tabular-nums"],
							fontWeight: "600",
						}}>
						{post.comments ? post.comments.length : 0}
					</Text>
				</View>
			</View>
		</View>
	);
}
