import { useEffect, useRef, useState } from "react";
import Icon from "../Elements/Icon";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

type Props = {
    onSettings?: () => void;
    onLogout?: () => void;
};

const UserProfileDropdown = (props: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Avatar Button */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-zinc-300 dark:border-zinc-600 hover:scale-105 transition-transform"
            >
                <div className="w-full h-full flex items-center justify-center bg-zinc-300 dark:bg-zinc-600 text-zinc-800 dark:text-zinc-200 font-bold">
                    <Icon icon="fa-solid fa-user" />
                </div>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 rounded-xl shadow-lg overflow-hidden border border-zinc-200 dark:border-zinc-700">
                    <p className="m-2 text-zinc-700 dark:text-zinc-200">
                        Welcome back, {user?.firstName || "User"}!
                    </p>
                    <button
                        onClick={() => {
                            if (props.onSettings !== undefined) props.onSettings();
                            setIsOpen(false);
                            navigate("/settings");
                        }}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 w-full text-left text-zinc-700 dark:text-zinc-200"
                    >
                        <Icon icon="fa-solid fa-gears" />
                        Settings
                    </button>
                    <button
                        onClick={() => {
                            if (props.onLogout !== undefined) props.onLogout();
                            logout();
                            setIsOpen(false);
                            navigate("/");
                        }}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 w-full text-left text-red-600 dark:text-red-400"
                    >
                        <Icon icon="fa-solid fa-arrow-right-from-bracket" />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserProfileDropdown;
