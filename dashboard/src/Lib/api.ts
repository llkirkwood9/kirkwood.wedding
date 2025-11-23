import axios from "axios";
import type { LoginResult } from "../Models/User";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

let accessToken: string | null = localStorage.getItem("accessToken");
let refreshToken: string | null = localStorage.getItem("refreshToken");
let onTokenChange:
    | ((tokens: { accessToken: string | null; refreshToken: string | null }) => void)
    | null = null;

export const setTokens = (access: string | null, refresh: string | null) => {
    accessToken = access;
    refreshToken = refresh;

    if (access) {
        localStorage.setItem("accessToken", access);
    } else {
        localStorage.removeItem("accessToken");
    }

    if (refresh) {
        localStorage.setItem("refreshToken", refresh);
    } else {
        localStorage.removeItem("refreshToken");
    }

    if (onTokenChange) onTokenChange({ accessToken: access, refreshToken: refresh });
};

export const subscribeTokenChange = (
    cb: (tokens: { accessToken: string | null; refreshToken: string | null }) => void
) => {
    onTokenChange = cb;
};

// Attach access token
api.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
});

// Refresh logic
let isRefreshing = false;
let subscribers: ((token: string) => void)[] = [];

const onRefreshed = (token: string) => {
    subscribers.forEach((cb) => cb(token));
    subscribers = [];
};

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (!refreshToken) {
                setTokens(null, null);
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve) => {
                    subscribers.push((token) => {
                        originalRequest.headers["Authorization"] = `Bearer ${token}`;
                        resolve(api(originalRequest));
                    });
                });
            }

            isRefreshing = true;
            try {
                const { data } = await axios.post<LoginResult>(
                    `${import.meta.env.VITE_API_URL}/api/Auth/refresh`,
                    { refreshToken: refreshToken }
                );

                const newAccess = data.token;
                const newRefresh = data.refreshToken;

                setTokens(newAccess, newRefresh);
                api.defaults.headers.common["Authorization"] = `Bearer ${newAccess}`;
                onRefreshed(newAccess);

                // Ensure the retried request uses the new token
                originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
                return api(originalRequest);
            } catch (err) {
                setTokens(null, null);
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
