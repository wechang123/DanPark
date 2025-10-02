import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: ThemeMode;
    isDark: boolean;
    setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'system',
    isDark: false,
    setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const systemColorScheme = useColorScheme();
    const [theme, setThemeState] = useState<ThemeMode>('system');

    useEffect(() => {
        // 저장된 테마 설정 불러오기
        AsyncStorage.getItem('theme').then(savedTheme => {
            if (savedTheme) {
                setThemeState(savedTheme as ThemeMode);
            }
        });
    }, []);

    const setTheme = (newTheme: ThemeMode) => {
        setThemeState(newTheme);
        AsyncStorage.setItem('theme', newTheme);
    };

    const isDark = theme === 'system' ? systemColorScheme === 'dark' : theme === 'dark';

    return <ThemeContext.Provider value={{ theme, isDark, setTheme }}>{children}</ThemeContext.Provider>;
};

