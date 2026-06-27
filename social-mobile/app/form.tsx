import { queryClient } from "@/components/app-provider";
import { api } from "@/libs/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, Text } from "react-native";

export default function Form() {
	const [content, setContent] = useState("");

	const add = async () => {
		if (content) {
			const token = await AsyncStorage.getItem("token");

			const res = await fetch(`${api()}/posts`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ content }),
			});

			if (res.ok) {
				await queryClient.invalidateQueries({ queryKey: ["posts"] });
				router.dismiss();
			} else {
                alert("Unable to add post");
            }
		}
	};

	return (
		<ScrollView
			contentInsetAdjustmentBehavior="automatic"
			style={{ backgroundColor: "#f8fafc" }}
			contentContainerStyle={{ padding: 12, gap: 10 }}>
			<TextInput
				value={content}
				onChangeText={setContent}
				multiline
				style={{
					fontSize: 15,
					minHeight: 160,
					padding: 14,
					color: "#111827",
					backgroundColor: "#ffffff",
					borderWidth: 1,
					borderColor: "#e5e7eb",
					borderRadius: 8,
					textAlignVertical: "top",
				}}
				placeholder="What's happening?"
				placeholderTextColor="#94a3b8"
			/>
			<TouchableOpacity
                onPress={add}
				style={{
					backgroundColor: "#2563eb",
					paddingVertical: 14,
					borderRadius: 8,
					alignItems: "center",
				}}>
				<Text style={{ color: "#ffffff", fontWeight: "700" }}>
					Add Post
				</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}
