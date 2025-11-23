import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../Models/User";
import { setTokens, subscribeTokenChange } from "../Lib/api";
import { GetUserProfile } from "../Services/AuthServices";
import { Toast } from "../Lib/Toast";

type AuthContextType = {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    login: (access: string, refresh: string, silent?: boolean) => Promise<void>;
    logout: () => void;
    fetchUserProfile: () => Promise<User | undefined>;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessTokenState] = useState<string | null>(null);
    const [refreshToken, setRefreshTokenState] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        subscribeTokenChange(({ accessToken, refreshToken }) => {
            setAccessTokenState(accessToken);
            setRefreshTokenState(refreshToken);
            if (!accessToken) {
                setUser(null);
            }
        });

        // auto-login if tokens stored
        const storedAccess = localStorage.getItem("accessToken");
        const storedRefresh = localStorage.getItem("refreshToken");

        const initAuth = async () => {
            if (storedAccess && storedRefresh) {
                setTokens(storedAccess, storedRefresh);
                await fetchUserProfile();
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const fetchUserProfile = async (): Promise<User | undefined> => {
        const data = await GetUserProfile();
        if (data) {
            setUser(data);
            return data;
        } else {
            logout();
        }
    };

    const login = async (access: string, refresh: string, silent?: boolean) => {
        setTokens(access, refresh);
        const fetchedUser = await fetchUserProfile();

        if (!silent && fetchedUser) {
            Toast.Success(`Welcome back, ${fetchedUser.firstName || "User"}!`);
        }
    };

    const logout = () => {
        setTokens(null, null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                refreshToken,
                login,
                logout,
                fetchUserProfile,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
};
