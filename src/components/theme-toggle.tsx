'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDark(isDarkMode);
    }, []);

    const toggleTheme = () => {
        const html = document.documentElement;

        if (isDark) {
            html.style.setProperty('--background', '#ffffff');
            html.style.setProperty('--foreground', '#171717');
            html.style.setProperty('--card-background', '#ffffff');
            html.style.setProperty('--input-background', '#f4f4f5');
        } else {
            html.style.setProperty('--background', '#09090b');
            html.style.setProperty('--foreground', '#fafafa');
            html.style.setProperty('--card-background', '#18181b');
            html.style.setProperty('--input-background', '#27272a');
        }

        setIsDark(!isDark);
    };

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 p-2 rounded-full bg-[--card-background] shadow-lg hover:scale-110 transition-transform duration-200 ease-in-out"
        >
            {isDark ? (
                <Sun className="w-6 h-6 text-yellow-500" />
            ) : (
                <Moon className="w-6 h-6 text-slate-700" />
            )}
        </button>
    );
} 