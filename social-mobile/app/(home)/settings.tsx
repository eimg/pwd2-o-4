import { ScrollView, View, Text } from "react-native";

export default function Settings() {
    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={{ backgroundColor: "#f8fafc" }}
            contentContainerStyle={{ padding: 12, gap: 10 }}>
            <View
                style={{
                    padding: 14,
                    borderWidth: 1,
                    borderColor: "#e5e7eb",
                    borderRadius: 8,
                    backgroundColor: "#ffffff",
                    boxShadow: "0 1px 2px rgba(15, 23, 42, 0.06)",
                }}>
                <Text
                    style={{
                        color: "#111827",
                        fontSize: 16,
                        fontWeight: "700",
                    }}>
                    Social Mobile
                </Text>
                <Text
                    style={{
                        marginTop: 4,
                        color: "#64748b",
                        fontSize: 14,
                        lineHeight: 20,
                    }}>
                    A clean feed for posts, comments, and likes.
                </Text>
            </View>
        </ScrollView>
    );
}
