import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useEffect, useState } from "react";
import { UpdateMe } from "../Services/AuthServices";
import { Toast } from "../Lib/Toast";
import Button from "../Components/Elements/Button";
import Spinner from "../Components/Elements/Spinner";
import ThemeToggle from "../Components/Navbar/ThemeToggle";
import type { User } from "../Models/User";

const SettingsPage = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const { user, fetchUserProfile } = useAuth();

    useEffect(() => {
        if (!user) return;
        setFirstName(user.firstName ?? "");
        setLastName(user.lastName ?? "");
    }, [user]);

    const UpdateUser = async () => {
        setLoading(true);

        // Create update data
        const updateData: User = {
            firstName: firstName,
            lastName: lastName,
        };

        // Update user data
        const result = await UpdateMe(updateData);

        if (result) {
            Toast.Success("Profile updated successfully");

            // Re-fetch profile to get changes
            fetchUserProfile();
        }

        setLoading(false);
    };

    return !user ? (
        <Navigate to="/login" />
    ) : (
        <div className="pt-16 min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-6 transition-colors">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-zinc-800 rounded-xl shadow p-6 transition-colors mt-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-1 font-medium">First Name</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg bg-zinc-50 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    maxLength={100}
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Last Name</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg bg-zinc-50 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    maxLength={100}
                                />
                            </div>
                            <Button
                                className="w-full justify-center"
                                isDisabled={loading}
                                onClick={UpdateUser}
                            >
                                {loading ? (
                                    <>
                                        <Spinner /> Saving...
                                    </>
                                ) : (
                                    <>Save</>
                                )}
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4 mt-4">Theme</h2>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
