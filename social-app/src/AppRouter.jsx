import { createBrowserRouter, RouterProvider } from "react-router";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
            {
                path: "/",
                element: <Home />
            },
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
		],
	},
]);

export default function AppRouter() {
    return <RouterProvider router={router} />
}
