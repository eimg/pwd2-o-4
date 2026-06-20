import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function HomeLayout() {
	return (
		<Tabs>
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
