import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage";
import ErrorPage from "../Pages/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../Pages/LoginPage";
import SettingsPage from "../Pages/SettingsPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "login", element: <LoginPage /> },
            {
                path: "settings",
                element: (
                    <ProtectedRoute>
                        <SettingsPage />
                    </ProtectedRoute>
                ),
            },
            // {
            //     path: "users",
            //     element: (
            //         <ProtectedRoute>
            //             <UsersPage />
            //         </ProtectedRoute>
            //     ),
            // },
            {
                path: "unauthorized",
                element: (
                    <ErrorPage
                        errorCode={401}
                        errorMessage="Oops! You are not authorized to view this page."
                    />
                ),
            },
            {
                path: "error",
                element: <ErrorPage />,
            },
            {
                path: "*",
                element: (
                    <ErrorPage
                        errorCode={404}
                        errorMessage="Oops! The page you're looking for does not exist."
                    />
                ),
            },
        ],
    },
]);
