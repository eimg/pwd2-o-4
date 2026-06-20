import { createBrowserRouter, RouterProvider } from "react-router";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import View from "./pages/View.jsx";
import Profile from "./pages/Profile.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "/view/:id",
				element: <View />,
			},
			{
				path: "/profile",
				element: <Profile />,
			},
			{
				path: "/profile/:id",
				element: <Profile />,
			},
		],
	},
]);

export default function AppRouter() {
    return <RouterProvider router={router} />
}
