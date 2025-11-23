import Icon from "../Components/Elements/Icon";
import { useAuth } from "../Context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import Spinner from "../Components/Elements/Spinner";
import { AuthGoogle } from "../Services/AuthServices";

const LoginPage = () => {
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const googleLogin = useGoogleLogin({
        flow: "auth-code",
        onSuccess: async (codeResponse) => {
            setLoading(true);

            const code = codeResponse.code;

            // Authenticate with backend
            const data = await AuthGoogle(code);
            if (!data) {
                setLoading(false);
                return;
            }

            login(data.token, data.refreshToken);
            navigate("/");

            setLoading(false);
        },
        onError: () => {
            setLoading(false);
            console.error("Google login failed");
        },
    });

    return user ? (
        <Navigate to={"/"} />
    ) : (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b bg-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
            <main className="w-full max-w-sm p-6">
                <div className="backdrop-blur-sm bg-white/60 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-lg p-8">
                    <header className="mb-6 text-center">
                        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                            Welcome Back
                        </h1>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1">
                            Sign in to your account
                        </p>
                    </header>

                    <div className="space-y-4">
                        <button
                            onClick={googleLogin}
                            type="button"
                            disabled={loading}
                            className={`flex items-center justify-center gap-3 w-full px-4 py-3 rounded-lg border hover:shadow-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-sky-500 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 
                                ${loading ? "animate-pulse" : ""}`}
                        >
                            {loading ? (
                                <>
                                    <Spinner className=" text-zinc-800 dark:text-zinc-100" />
                                    <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                                        Signing In...
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="w-6 h-6">
                                        <Icon
                                            icon="fa-brands fa-google"
                                            className="text-zinc-800 dark:text-zinc-100 text-2xl"
                                        />
                                    </span>
                                    <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                                        Sign in with Google
                                    </span>
                                </>
                            )}
                        </button>
                    </div>

                    <footer className="mt-6 text-center">
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            By signing in, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </footer>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;
