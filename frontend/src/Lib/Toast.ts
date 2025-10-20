import { toast } from "react-toastify";
import { getCurrentTheme } from "../Hooks/UseTheme";

// Timestamp of the last api error toast notification
let lastToastTime: Date = new Date(0);

// Throttle duration in milliseconds for api error
const THROTTLE_DURATION = 2000;

/**
 * Toast notification methods. Adds theming support.
 */
export const Toast = {
    Error: (message: string) => {
        if (typeof window !== "undefined") {
            toast.error(message, {
                theme: getCurrentTheme(),
            });
        }
    },
    Success: (message: string) => {
        if (typeof window !== "undefined") {
            toast.success(message, {
                theme: getCurrentTheme(),
            });
        }
    },
    Info: (message: string) => {
        if (typeof window !== "undefined") {
            toast.info(message, {
                theme: getCurrentTheme(),
            });
        }
    },
    Warning: (message: string) => {
        if (typeof window !== "undefined") {
            toast.warn(message, {
                theme: getCurrentTheme(),
            });
        }
    },
    ApiError: (message: string) => {
        const now = new Date();
        if (now.getTime() - lastToastTime.getTime() > THROTTLE_DURATION) {
            lastToastTime = now;
            if (typeof window !== "undefined") {
                toast.error(message, {
                    theme: getCurrentTheme(),
                });
            }
        }
    },
};
