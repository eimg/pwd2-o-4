import AppProvider from "@/components/app-provider";
import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<AppProvider>
			<Stack
				screenOptions={{
					contentStyle: { backgroundColor: "#f8fafc" },
					headerShadowVisible: false,
					headerStyle: { backgroundColor: "#f8fafc" },
					headerTintColor: "#111827",
					headerTitleStyle: {
						fontSize: 17,
						fontWeight: "700",
					},
				}}>
				<Stack.Screen
					name="(home)"
					options={{ headerShown: false, title: "Home" }}
				/>
				<Stack.Screen
					name="view/[id]"
					options={{ title: "View Post" }}
				/>
				<Stack.Screen
					name="form"
					options={{ title: "New Post", presentation: "modal" }}
				/>
			</Stack>
		</AppProvider>
	);
}
