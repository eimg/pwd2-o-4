import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function Home() {
	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text style={{ fontWeight: "bold", fontSize: 21 }}>
				Hello React Native
			</Text>

            <View style={{ marginTop: 20 }}>
                <Link href={"/profile"}>Profile</Link>
            </View>
		</View>
	);
}
