import AppProvider from "@/components/app-provider";
import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<AppProvider>
			<Stack>
				<Stack.Screen
					name="(home)"
					options={{ headerShown: false }}
				/>
			</Stack>
		</AppProvider>
	);
}
