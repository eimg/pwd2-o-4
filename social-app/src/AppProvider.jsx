import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { useState, createContext, useMemo, useContext, useEffect } from "react";
import AppRouter from "./AppRouter.jsx";

const AppContext = createContext();

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient(); 

export default function AppProvider() {
	const [mode, setMode] = useState("dark");
	const [openDrawer, setOpenDrawer] = useState(false);
	const [auth, setAuth] = useState();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if(token) {
            fetch("http://localhost:8800/verify", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then(async res => {
					if (res.ok) {
						setAuth(await res.json());
					} else {
						localStorage.removeItem("token");
					}
				})
				.catch(() => {
					localStorage.removeItem("token");
				});
        }
	}, []);

	const theme = useMemo(() => {
		return createTheme({
			palette: {
				mode,
			},
		});
	}, [mode]);

	return (
		<AppContext.Provider
			value={{ mode, setMode, openDrawer, setOpenDrawer, auth, setAuth }}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<AppRouter />
					<CssBaseline />
				</ThemeProvider>
			</QueryClientProvider>
		</AppContext.Provider>
	);
}

export function useApp() {
	return useContext(AppContext);
}
