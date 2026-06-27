import { queryClient } from "@/components/app-provider";
import { api } from "@/libs/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";

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
		<View style={{ padding: 15, gap: 5 }}>
			<TextInput
				value={content}
				onChangeText={setContent}
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
                onPress={add}
				style={{
					backgroundColor: "teal",
					padding: 15,
					borderRadius: 20,
					alignItems: "center",
				}}>
				<Text style={{ color: "white" }}>Add Post</Text>
			</TouchableOpacity>
		</View>
	);
}
