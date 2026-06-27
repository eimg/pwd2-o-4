import { router, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { useApp } from "@/components/app-provider";

export default function HomeLayout() {
	const { auth } = useApp();

	return (
		<Tabs
			screenOptions={{
				headerShadowVisible: false,
				headerStyle: { backgroundColor: "#f8fafc" },
				headerTitleStyle: {
					fontSize: 24,
					fontWeight: "800",
					color: "#111827",
				},
				tabBarActiveTintColor: "#2563eb",
				tabBarInactiveTintColor: "#94a3b8",
				tabBarStyle: {
					backgroundColor: "#ffffff",
					borderTopColor: "#e5e7eb",
					height: 82,
					paddingTop: 8,
				},
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: "600",
				},
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => {
						return (
							<Ionicons
								name="home"
								size={24}
								color={color}
							/>
						);
					},
					headerRight: () => {
						return auth ? (
							<TouchableOpacity
								style={{
									width: 38,
									height: 38,
									marginRight: 16,
									borderRadius: 19,
									backgroundColor: "#2563eb",
									alignItems: "center",
									justifyContent: "center",
								}}
								onPress={() => router.push("/form")}>
								<Ionicons
									name="add"
									size={24}
									color="#ffffff"
								/>
							</TouchableOpacity>
						) : (
							<></>
						);
					},
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => {
						return (
							<Ionicons
								name="person-circle"
								size={24}
								color={color}
							/>
						);
					},
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					tabBarIcon: ({ color }) => {
						return (
							<Ionicons
								name="settings"
								size={24}
								color={color}
							/>
						);
					},
				}}
			/>
		</Tabs>
	);
}
