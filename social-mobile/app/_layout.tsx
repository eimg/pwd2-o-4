import AppProvider from "@/components/app-provider";
import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<AppProvider>
			<Stack>
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
