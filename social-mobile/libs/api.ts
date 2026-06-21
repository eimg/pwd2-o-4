import { Platform } from "react-native";

export function api() {
    if (Platform.OS == "android") {
        return "http://10.0.2.2:8800";
    } else {
        return "http://localhost:8800";
    }
}
