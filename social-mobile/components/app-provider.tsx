import { UserType } from "@/types/global";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	ReactNode,
	Dispatch,
	SetStateAction,
	createContext,
	useState,
	useContext,
    useEffect,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "@/libs/api";

export const queryClient = new QueryClient();

type AuthContextType = {
	auth: UserType | undefined;
	setAuth: Dispatch<SetStateAction<UserType | undefined>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AppProvider({ children }: { children: ReactNode }) {
	const [auth, setAuth] = useState<UserType | undefined>();

    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem("token");
            if(token) {
                const res = await fetch(`${api()}/verify`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if(res.ok) {
                    setAuth(await res.json());
                } else {
                    await AsyncStorage.removeItem("token");
                }
            }
        })();
    }, []);

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		</AuthContext.Provider>
	);
}

export const useApp = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useApp must be used within an AuthProvider");
	}

	return context;
};
