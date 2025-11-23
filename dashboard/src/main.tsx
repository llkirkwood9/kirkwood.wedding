import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { AuthProvider } from "./Context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

library.add(fas, far, fab);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </GoogleOAuthProvider>
    </StrictMode>
);
