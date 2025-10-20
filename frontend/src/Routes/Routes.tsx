import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage";
import ErrorPage from "../Pages/ErrorPage";
import OurStory from "../Pages/OurStory";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "kirkwood.wedding", element: <Navigate to="/" /> }, // Redirect for GitHub Pages
            { path: "our-story", element: <OurStory /> },
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
