import { useEffect, useState } from "react";
// Event emitter for themeChanged
type ThemeChangedListener = (theme: Theme) => void;
const themeChangedListeners = new Set<ThemeChangedListener>();

export function subscribeThemeChanged(listener: ThemeChangedListener) {
    themeChangedListeners.add(listener);
}

export function unsubscribeThemeChanged(listener: ThemeChangedListener) {
    themeChangedListeners.delete(listener);
}

export type Theme = "light" | "dark" | "system";

export function useTheme() {
    const [theme, setTheme] = useState<Theme>((localStorage.getItem("theme") as Theme) || "system");

    useEffect(() => {
        const root = window.document.documentElement;

        const applyTheme = (t: Theme) => {
            if (t === "system") {
                const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                root.classList.toggle("dark", isDark);
            } else {
                root.classList.toggle("dark", t === "dark");
            }
        };

        // Apply immediately on mount and whenever theme changes
        applyTheme(theme);

        // Always provide a cleanup function; use a no-op by default
        let cleanup: () => void = () => {};

        if (theme === "system") {
            const mql = window.matchMedia("(prefers-color-scheme: dark)");
            // Some browsers implement addEventListener on MediaQueryList, others use addListener
            const listener = (e: MediaQueryListEvent | MediaQueryList) => {
                const matches = "matches" in e ? e.matches : (e as MediaQueryList).matches;
                if (!("theme" in localStorage) || localStorage.getItem("theme") === "system") {
                    root.classList.toggle("dark", matches);
                }
            };

            if (typeof mql.addEventListener === "function") {
                mql.addEventListener("change", listener as EventListener);
                cleanup = () => mql.removeEventListener("change", listener as EventListener);
            } else if (typeof (mql as any).addListener === "function") {
                (mql as any).addListener(listener);
                cleanup = () => (mql as any).removeListener(listener);
            }
        }

        return cleanup;
    }, [theme]);

    const changeTheme = (newTheme: Theme) => {
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
        // Notify listeners
        themeChangedListeners.forEach((listener) => listener(newTheme));
    };

    return { theme, setTheme: changeTheme };
}

/**
 * Gets the current theme from localStorage or defaults to "system".
 * @returns The current theme. Always light or dark
 */
export function getCurrentTheme(): Theme {
    let theme: Theme = (localStorage.getItem("theme") as Theme) || "system";
    if (theme === "system") {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        theme = isDark ? "dark" : "light";
    }

    return theme;
}
