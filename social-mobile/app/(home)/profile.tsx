import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useApp } from "@/components/app-provider";
import { router } from "expo-router";
import { api } from "@/libs/api";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { auth, setAuth } = useApp();

	const login = async () => {
		if (!username || !password) {
			return false;
		}

		const res = await fetch(`${api()}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});

		if (res.ok) {
			const { user, token } = await res.json();
			setAuth(user);
            await AsyncStorage.setItem("token", token);
			router.push("/");
		} else {
			alert("Unable to login");
		}
	};

	const logout = () => {
		setAuth(undefined);
	};

	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			{auth && (
				<View style={{ padding: 15, gap: 5 }}>
					<Text
						style={{
							fontSize: 21,
							fontWeight: "bold",
							textAlign: "center",
							marginBottom: 10,
						}}>
						{auth?.name}
					</Text>
					<Text style={{ textAlign: "center" }}>@{auth.username}</Text>
					<TouchableOpacity
						onPress={logout}
						style={{
							marginTop: 20,
							paddingHorizontal: 30,
							backgroundColor: "red",
							padding: 15,
							borderRadius: 20,
							alignItems: "center",
						}}>
						<Text style={{ color: "white" }}>Logout</Text>
					</TouchableOpacity>
				</View>
			)}

			{!auth && (
				<View style={{ width: "80%", padding: 15, gap: 5 }}>
					<Text
						style={{
							fontSize: 21,
							fontWeight: "bold",
							textAlign: "center",
							marginBottom: 10,
						}}>
						Login
					</Text>
					<TextInput
						value={username}
						onChangeText={setUsername}
						autoCapitalize="none"
						style={{
							fontSize: 15,
							padding: 15,
							backgroundColor: "white",
							borderWidth: 1,
							borderColor: "#66666666",
							borderRadius: 20,
						}}
						placeholder="username"
					/>
					<TextInput
						value={password}
						onChangeText={setPassword}
						secureTextEntry
						style={{
							fontSize: 15,
							padding: 15,
							backgroundColor: "white",
							borderWidth: 1,
							borderColor: "#66666666",
							borderRadius: 20,
						}}
						placeholder="password"
					/>
					<TouchableOpacity
						onPress={login}
						style={{
							backgroundColor: "teal",
							padding: 15,
							borderRadius: 20,
							alignItems: "center",
						}}>
						<Text style={{ color: "white" }}>Login</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
}
