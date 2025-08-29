import React, { useState } from 'react';
import { LogOut, Wallet, Globe, Paintbrush, Sun, Moon, Check } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from '../../hooks/useTranslation';
import { useTheme } from '../../hooks/useTheme';
import { THEMES } from '../../constants/themes';
import type { User } from '../../types';

interface HeaderProps {
    user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
    const { logout } = useAuth();
    const { t, setLocale, locale } = useTranslation();
    const { theme, setTheme, mode, setMode } = useTheme();
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
    
    const handleSetLocale = (newLocale: 'en' | 'km') => {
        setLocale(newLocale);
        setIsLangMenuOpen(false);
    }

    return (
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div>
                <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {t('welcomeBack', { name: user.username })}
                </h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
                {user.role === 'user' && (
                    <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg">
                        <Wallet className="w-5 h-5 text-primary-500" />
                        <span className="font-semibold text-gray-800 dark:text-white">
                            ${user.balance.toFixed(2)}
                        </span>
                    </div>
                )}
                
                <div className="relative">
                    <button onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <Paintbrush className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </button>
                    {isThemeMenuOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-10 border dark:border-gray-700">
                            <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">{t('selectTheme')}</h4>
                            <div className="grid grid-cols-4 gap-2 mb-4">
                                {THEMES.map((themeOption) => (
                                    <button 
                                        key={themeOption.name}
                                        onClick={() => setTheme(themeOption.name)}
                                        className={`w-full h-10 rounded-md flex items-center justify-center border-2 transition-all ${theme === themeOption.name ? 'border-primary-500 ring-2 ring-primary-500/50' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'}`}
                                        style={{ backgroundColor: `rgb(${themeOption.colors['--color-primary-500']})`}}
                                        aria-label={t(themeOption.name)}
                                    >
                                        {theme === themeOption.name && <Check className="w-5 h-5 text-white" />}
                                    </button>
                                ))}
                            </div>
                             <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => setMode('light')}
                                    className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${mode === 'light' ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                                >
                                    <Sun className="w-4 h-4" />
                                    <span>{t('light')}</span>
                                </button>
                                 <button
                                    onClick={() => setMode('dark')}
                                    className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${mode === 'dark' ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                                >
                                    <Moon className="w-4 h-4" />
                                    <span>{t('dark')}</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                 <div className="relative">
                    <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <Globe className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </button>
                    {isLangMenuOpen && (
                        <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-10">
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); handleSetLocale('en'); }}
                                className={`block px-4 py-2 text-sm ${locale === 'en' ? 'font-bold text-primary-600' : 'text-gray-700 dark:text-gray-200'} hover:bg-gray-100 dark:hover:bg-gray-600`}
                            >
                                English
                            </a>
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); handleSetLocale('km'); }}
                                className={`block px-4 py-2 text-sm ${locale === 'km' ? 'font-bold text-primary-600' : 'text-gray-700 dark:text-gray-200'} hover:bg-gray-100 dark:hover:bg-gray-600`}
                            >
                                ភាសាខ្មែរ
                            </a>
                        </div>
                    )}
                </div>
                <div className="relative">
                    <button className="flex items-center space-x-2">
                        <img className="h-9 w-9 rounded-full object-cover" src={`https://i.pravatar.cc/150?u=${user.email}`} alt="user avatar" />
                    </button>
                </div>
                 <button onClick={logout} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <LogOut className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
};

export default Header;
