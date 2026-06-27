import { useState } from "react";
import {
	Alert,
	ScrollView,
	View,
	Text,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { useApp } from "@/components/app-provider";
import { router } from "expo-router";
import { api } from "@/libs/api";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
	const [mode, setMode] = useState<"login" | "register">("login");
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [bio, setBio] = useState("");
	const [password, setPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { auth, setAuth } = useApp();

	const login = async (nextUsername = username, nextPassword = password) => {
		if (!nextUsername || !nextPassword) {
			Alert.alert("Missing details", "Username and password are required.");
			return false;
		}

		const res = await fetch(`${api()}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: nextUsername,
				password: nextPassword,
			}),
		});

		if (res.ok) {
			const { user, token } = await res.json();
			setAuth(user);
			await AsyncStorage.setItem("token", token);
			router.push("/");
			return true;
		} else {
			Alert.alert("Login failed", "Check your username and password.");
			return false;
		}
	};

	const register = async () => {
		const nextName = name.trim();
		const nextUsername = username.trim();
		const nextBio = bio.trim();

		if (!nextName || !nextUsername || !password) {
			Alert.alert("Missing details", "Name, username, and password are required.");
			return;
		}

		try {
			const res = await fetch(`${api()}/users`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: nextName,
					username: nextUsername,
					bio: nextBio || undefined,
					password,
				}),
			});

			if (!res.ok) {
				throw new Error("Unable to create account.");
			}

			await login(nextUsername, password);
		} catch (error) {
			Alert.alert(
				"Registration failed",
				error instanceof Error ? error.message : "Unable to create account.",
			);
		}
	};

	const submit = async () => {
		if (isSubmitting) {
			return;
		}

		setIsSubmitting(true);

		try {
			if (mode === "register") {
				await register();
			} else {
				await login();
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	const logout = async () => {
		setAuth(undefined);
		await AsyncStorage.removeItem("token");
	};

	return (
		<ScrollView
			contentInsetAdjustmentBehavior="automatic"
			style={{ backgroundColor: "#f8fafc" }}
			contentContainerStyle={{
				flexGrow: 1,
				padding: 18,
				justifyContent: "center",
			}}>
			{auth && (
				<View
					style={{
						padding: 18,
						gap: 10,
						borderWidth: 1,
						borderColor: "#e5e7eb",
						borderRadius: 8,
						backgroundColor: "#ffffff",
						alignItems: "center",
						boxShadow: "0 1px 2px rgba(15, 23, 42, 0.06)",
					}}>
					<View
						style={{
							width: 64,
							height: 64,
							borderRadius: 32,
							backgroundColor: "#111827",
							alignItems: "center",
							justifyContent: "center",
						}}>
						<Text
							style={{
								color: "#ffffff",
								fontSize: 24,
								fontWeight: "800",
							}}>
							{auth.name[0].toUpperCase()}
						</Text>
					</View>
					<View style={{ alignItems: "center", gap: 3 }}>
						<Text
							style={{
								color: "#111827",
								fontSize: 22,
								fontWeight: "800",
								textAlign: "center",
							}}>
							{auth?.name}
						</Text>
						<Text style={{ color: "#64748b", textAlign: "center" }}>
							@{auth.username}
						</Text>
					</View>
					<TouchableOpacity
						onPress={logout}
						style={{
							marginTop: 8,
							width: "100%",
							backgroundColor: "#fef2f2",
							paddingVertical: 14,
							borderRadius: 8,
							alignItems: "center",
						}}>
						<Text style={{ color: "#dc2626", fontWeight: "700" }}>
							Logout
						</Text>
					</TouchableOpacity>
				</View>
			)}

			{!auth && (
				<View
					style={{
						padding: 18,
						gap: 10,
						borderWidth: 1,
						borderColor: "#e5e7eb",
						borderRadius: 8,
						backgroundColor: "#ffffff",
						boxShadow: "0 1px 2px rgba(15, 23, 42, 0.06)",
					}}>
					<Text
						style={{
							color: "#111827",
							fontSize: 24,
							fontWeight: "800",
							textAlign: "center",
						}}>
						{mode === "login" ? "Login" : "Create account"}
					</Text>
					<View
						style={{
							flexDirection: "row",
							padding: 4,
							borderRadius: 8,
							backgroundColor: "#f1f5f9",
							marginBottom: 4,
						}}>
						<TouchableOpacity
							onPress={() => setMode("login")}
							style={{
								flex: 1,
								paddingVertical: 10,
								borderRadius: 6,
								alignItems: "center",
								backgroundColor:
									mode === "login" ? "#ffffff" : "transparent",
							}}>
							<Text
								style={{
									color:
										mode === "login" ? "#111827" : "#64748b",
									fontWeight: "700",
								}}>
								Login
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => setMode("register")}
							style={{
								flex: 1,
								paddingVertical: 10,
								borderRadius: 6,
								alignItems: "center",
								backgroundColor:
									mode === "register"
										? "#ffffff"
										: "transparent",
							}}>
							<Text
								style={{
									color:
										mode === "register"
											? "#111827"
											: "#64748b",
									fontWeight: "700",
								}}>
								Register
							</Text>
						</TouchableOpacity>
					</View>
					{mode === "register" && (
						<TextInput
							value={name}
							onChangeText={setName}
							style={{
								fontSize: 15,
								padding: 14,
								color: "#111827",
								backgroundColor: "#f8fafc",
								borderWidth: 1,
								borderColor: "#e5e7eb",
								borderRadius: 8,
							}}
							placeholder="name"
							placeholderTextColor="#94a3b8"
						/>
					)}
					<TextInput
						value={username}
						onChangeText={setUsername}
						autoCapitalize="none"
						style={{
							fontSize: 15,
							padding: 14,
							color: "#111827",
							backgroundColor: "#f8fafc",
							borderWidth: 1,
							borderColor: "#e5e7eb",
							borderRadius: 8,
						}}
						placeholder="username"
						placeholderTextColor="#94a3b8"
					/>
					{mode === "register" && (
						<TextInput
							value={bio}
							onChangeText={setBio}
							multiline
							style={{
								fontSize: 15,
								minHeight: 82,
								padding: 14,
								color: "#111827",
								backgroundColor: "#f8fafc",
								borderWidth: 1,
								borderColor: "#e5e7eb",
								borderRadius: 8,
								textAlignVertical: "top",
							}}
							placeholder="bio (optional)"
							placeholderTextColor="#94a3b8"
						/>
					)}
					<TextInput
						value={password}
						onChangeText={setPassword}
						secureTextEntry
						style={{
							fontSize: 15,
							padding: 14,
							color: "#111827",
							backgroundColor: "#f8fafc",
							borderWidth: 1,
							borderColor: "#e5e7eb",
							borderRadius: 8,
						}}
						placeholder="password"
						placeholderTextColor="#94a3b8"
					/>
					<TouchableOpacity
						onPress={submit}
						disabled={isSubmitting}
						style={{
							backgroundColor: isSubmitting ? "#93c5fd" : "#2563eb",
							paddingVertical: 14,
							borderRadius: 8,
							alignItems: "center",
						}}>
						<Text style={{ color: "#ffffff", fontWeight: "700" }}>
							{isSubmitting
								? "Please wait..."
								: mode === "login"
									? "Login"
									: "Create account"}
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</ScrollView>
	);
}
