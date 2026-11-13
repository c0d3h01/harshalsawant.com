import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const isDark = mounted && resolvedTheme === "dark";

	const toggleTheme = () => {
		setTheme(isDark ? "light" : "dark");
	};

	return (
		<button
			type="button"
			className="icon-btn"
			aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
			onClick={toggleTheme}
		>
			{isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
		</button>
	);
};

export default ThemeToggle;
