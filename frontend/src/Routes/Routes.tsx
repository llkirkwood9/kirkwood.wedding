import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage";
import ErrorPage from "../Pages/ErrorPage";
import OurStory from "../Pages/OurStory";
import PhotosPage from "../Pages/PhotosPage";
import WeddingPartyPage from "../Pages/WeddingPartyPage";
import QAPage from "../Pages/QAPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "kirkwood.wedding", element: <Navigate to="/" /> }, // Redirect for GitHub Pages
            { path: "our-story", element: <OurStory /> },
            { path: "photos", element: <PhotosPage /> },
            { path: "wedding-party", element: <WeddingPartyPage /> },
            { path: "q-and-a", element: <QAPage /> },
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
