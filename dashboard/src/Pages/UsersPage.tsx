import UserList from "../Components/User/UserList";
import { useAuth } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

const UsersPage = () => {
    const { user } = useAuth();

    if (!user) return <Navigate to="/unauthorized" />;

    return (
        <div className="pt-16 min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-6 transition-colors">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-zinc-800 rounded-xl shadow p-6 transition-colors mt-6">
                    <UserList />
                </div>
            </div>
        </div>
    );
};

export default UsersPage;
