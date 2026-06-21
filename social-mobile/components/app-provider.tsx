import { UserType } from "@/types/global";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	ReactNode,
	Dispatch,
	SetStateAction,
	createContext,
	useState,
	useContext,
} from "react";

export const queryClient = new QueryClient();

type AuthContextType = {
	auth: UserType | undefined;
	setAuth: Dispatch<SetStateAction<UserType | undefined>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AppProvider({ children }: { children: ReactNode }) {
	const [auth, setAuth] = useState<UserType | undefined>();

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
