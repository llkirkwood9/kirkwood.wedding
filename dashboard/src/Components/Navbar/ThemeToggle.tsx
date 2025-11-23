import type { JSX } from "react";
import { useTheme, type Theme } from "../../Hooks/UseTheme";
import Icon from "../Elements/Icon";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    const sunIcon: any = "fa-solid fa-sun";
    const moonIcon: any = "fa-solid fa-moon";
    const systemIcon: any = "fa-solid fa-desktop";

    const themeOptions: { value: Theme; label: string; icon: JSX.Element }[] = [
        {
            value: "light",
            label: "Light",
            icon: <Icon icon={sunIcon} />,
        },
        {
            value: "dark",
            label: "Dark",
            icon: <Icon icon={moonIcon} />,
        },
        {
            value: "system",
            label: "System",
            icon: <Icon icon={systemIcon} />,
        },
    ];

    return (
        <div className="flex flex-col">
            {themeOptions.map((opt) => (
                <button
                    key={opt.value}
                    onClick={() => setTheme(opt.value)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left text-lg mb-4
              ${
                  theme === opt.value
                      ? "bg-green-600 text-white"
                      : "bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-600"
              }`}
                >
                    {opt.icon}
                    <span>{opt.label}</span>
                </button>
            ))}
        </div>
    );
};

export default ThemeToggle;
