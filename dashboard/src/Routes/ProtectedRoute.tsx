import { useAuth } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import LoadingPage from "../Components/Elements/LoadingPage";

type Props = {
    children: JSX.Element;
};

const ProtectedRoute = (props: Props) => {
    const { user, loading } = useAuth();

    if (loading) return <LoadingPage />;

    if (!user) return <Navigate to="/login" />;

    return props.children;
};

export default ProtectedRoute;
