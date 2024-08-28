import React, { createContext, useState, useContext, useEffect } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export interface ContextProps {
    isDarkMode: boolean;
    toggleTheme: () => Promise<void>;
}

const ThemeContext = createContext<ContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: any) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const loadTheme = async () => {
            const savedTheme = await AsyncStorage.getItem('darkMode');
            if (savedTheme !== null) {
                setIsDarkMode(JSON.parse(savedTheme));
            } else {
                const systemTheme = useColorScheme() === 'dark';
                setIsDarkMode(systemTheme);
            }
        };

        loadTheme();
    }, []);

    const toggleTheme = async () => {
        setIsDarkMode((prev) => {
            AsyncStorage.setItem('darkMode', JSON.stringify(!prev));
            return !prev;
        });
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// export const useTheme = () => useContext(ThemeContext);
export const useTheme = (): ContextProps => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
