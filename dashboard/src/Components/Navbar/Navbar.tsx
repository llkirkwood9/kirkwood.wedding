import { useState, useRef, useEffect } from "react";
import Button from "../Elements/Button";
import Icon from "../Elements/Icon";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import UserProfileDropdown from "./UserProfileDropdown";
import { useAuth } from "../../Context/AuthContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [forceMobileMenu, setForceMobileMenu] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const desktopMenuRef = useRef<HTMLDivElement>(null);
    const navContainerRef = useRef<HTMLDivElement>(null);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Close mobile dropdown when clicking outside
    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // Detect if desktop menu is overflowing and force mobile menu if so
    useEffect(() => {
        const checkOverflow = () => {
            if (desktopMenuRef.current && navContainerRef.current) {
                const menuRect = desktopMenuRef.current.getBoundingClientRect();
                const containerRect = navContainerRef.current.getBoundingClientRect();
                // If menu overflows container, force mobile menu
                setForceMobileMenu(menuRect.right > containerRect.right);
            }
        };
        checkOverflow();
        window.addEventListener("resize", checkOverflow);
        return () => {
            window.removeEventListener("resize", checkOverflow);
        };
    }, [user]);

    return (
        <nav className="bg-white shadow-md fixed w-full z-50 dark:bg-zinc-700">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8" ref={navContainerRef}>
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 mr-4 text-2xl font-bold text-green-600 dark:text-green-400">
                        <Link to="/">
                            <div className="flex h-10">Dashboard</div>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div
                        className={`${
                            forceMobileMenu ? "hidden" : "hidden md:flex"
                        } space-x-8 items-center`}
                        ref={desktopMenuRef}
                    >
                        {user && (
                            <>
                                <button
                                    onClick={() => navigate("/dashboard")}
                                    className="text-zinc-700 hover:text-green-600 transition dark:text-white dark:hover:text-green-200"
                                >
                                    Dashboard
                                </button>

                                <button
                                    onClick={() => navigate("/users")}
                                    className="text-zinc-700 hover:text-green-600 transition dark:text-white dark:hover:text-green-200"
                                >
                                    Users
                                </button>
                            </>
                        )}

                        {user ? (
                            <UserProfileDropdown />
                        ) : (
                            <div className="space-x-2">
                                <Button text="Login" onClick={() => navigate("/login")} />
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu (hamburger) */}
                    <div
                        className={`flex items-center space-x-4 ${
                            forceMobileMenu ? "" : "md:hidden"
                        }`}
                    >
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-zinc-700 hover:text-green-600 focus:outline-none dark:text-white dark:hover:text-green-200"
                        >
                            {isOpen ? (
                                <Icon icon="fa-solid fa-xmark" />
                            ) : (
                                <Icon icon="fa-solid fa-bars" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="bg-white shadow-lg dark:bg-zinc-700 fixed top-16 left-0 w-full z-50 flex flex-col items-center py-4"
                >
                    {user && (
                        <>
                            <Button
                                onClick={() => {
                                    setIsOpen(false);
                                    navigate("/dashboard");
                                }}
                                className="w-11/12 text-lg py-3 mb-2 rounded-lg transition items-center justify-center"
                                icon="fa-solid fa-chart-line"
                                text="Dashboard"
                            />
                            <Button
                                onClick={() => {
                                    setIsOpen(false);
                                    navigate("/users");
                                }}
                                className="w-11/12 text-lg py-3 mb-2 rounded-lg transition items-center justify-center"
                                icon="fa-solid fa-users"
                                text="Users"
                            />
                            <Button
                                onClick={() => {
                                    setIsOpen(false);
                                    navigate("/settings");
                                }}
                                className="w-11/12 text-lg py-3 mb-2 rounded-lg flex items-center justify-center transition"
                                icon="fa-solid fa-gears"
                                text="Settings"
                            />
                            <Button
                                onClick={() => {
                                    setIsOpen(false);
                                    logout();
                                    navigate("/login");
                                }}
                                className="w-11/12 text-lg py-3 mb-2 rounded-lg flex items-center justify-center transition bg-red-500 hover:bg-red-600"
                                icon="fa-solid fa-right-from-bracket"
                                text="Logout"
                            />
                        </>
                    )}

                    {!user && (
                        <div className="w-11/12">
                            <Button
                                text="Login"
                                onClick={() => {
                                    setIsOpen(false);
                                    navigate("/login");
                                }}
                                className="w-full text-lg py-3 rounded-lg items-center justify-center"
                            />
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
