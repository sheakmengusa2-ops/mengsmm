import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { THEMES, type ThemeName } from '../constants/themes';

type Mode = 'light' | 'dark';

interface ThemeContextType {
    theme: ThemeName;
    setTheme: (theme: ThemeName) => void;
    mode: Mode;
    setMode: (mode: Mode) => void;
    siteName: string;
    setSiteName: (name: string) => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeName>('indigo');
    const [mode, setMode] = useState<Mode>('light');
    const [siteName, setSiteNameState] = useState('MENGSMM');

    useEffect(() => {
        const savedTheme = localStorage.getItem('app-theme') as ThemeName;
        const savedMode = localStorage.getItem('app-mode') as Mode;

        if (savedTheme && THEMES.find(t => t.name === savedTheme)) {
            setTheme(savedTheme);
        }

        if (savedMode && ['light', 'dark'].includes(savedMode)) {
            setMode(savedMode);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setMode('dark');
        }

        const savedSiteName = localStorage.getItem('app-site-name');
        if (savedSiteName) {
            setSiteNameState(savedSiteName);
        }

    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        
        // Apply mode
        root.classList.remove('light', 'dark');
        root.classList.add(mode);
        localStorage.setItem('app-mode', mode);

        // Apply theme colors
        const selectedTheme = THEMES.find(t => t.name === theme);
        if (selectedTheme) {
            for (const [key, value] of Object.entries(selectedTheme.colors)) {
                root.style.setProperty(key, value);
            }
            localStorage.setItem('app-theme', theme);
        }

    }, [theme, mode]);

    const setSiteName = (name: string) => {
        const newName = name.trim() || 'MENGSMM';
        setSiteNameState(newName);
        localStorage.setItem('app-site-name', newName);
    };

    const value = {
        theme,
        setTheme,
        mode,
        setMode,
        siteName,
        setSiteName,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
