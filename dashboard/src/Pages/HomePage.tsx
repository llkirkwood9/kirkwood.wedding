import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const HomePage = () => {
    const { user } = useAuth();
    return <>{user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}</>;
};

export default HomePage;
