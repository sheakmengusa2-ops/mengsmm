import React, { createContext, useState, ReactNode, useCallback } from 'react';
import { en } from '../translations/en';
import { km } from '../translations/km';

type Locale = 'en' | 'km';

const translations: Record<Locale, Record<string, string>> = { en, km };

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string, values?: Record<string, any>) => string;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    // You could enhance this to detect browser language or use localStorage
    const [locale, setLocale] = useState<Locale>('en');

    const t = useCallback((key: string, values?: Record<string, any>): string => {
        let text = translations[locale][key] || translations['en'][key] || key;
        
        if (values) {
            Object.keys(values).forEach(valueKey => {
                const regex = new RegExp(`{{${valueKey}}}`, 'g');
                text = text.replace(regex, String(values[valueKey]));
            });
        }
        return text;
    }, [locale]);

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
};