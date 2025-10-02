import 'react-native-gesture-handler';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import React, { useState, useEffect } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';
import SplashScreen from '../components/SplashScreen'; // Import SplashScreen

export const unstable_settings = {
    initialRouteName: '(tabs)',
};

import AuthScreen from '../components/AuthScreen';

export default function RootLayout() {
    return (
        <AuthProvider>
            <RootNavigator />
        </AuthProvider>
    );
}

function RootNavigator() {
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const [isSplashLoading, setIsSplashLoading] = useState(true);

    // Splash Screen Logic
    useEffect(() => {
        const timer = setTimeout(() => setIsSplashLoading(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    if (isSplashLoading || authLoading) {
        return <SplashScreen onFinish={() => setIsSplashLoading(false)} />;
    }

    if (!isAuthenticated) {
        return (
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            </Stack>
        );
    }

    return <TabLayout />;
}

function TabLayout() {
    const colorScheme = useColorScheme();
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <NavigationThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                    <Stack
                        screenOptions={({ navigation, route }) => ({
                            headerBackTitle: ' ',
                            headerBackTitleVisible: false,
                            headerTitleStyle: { fontSize: 18 },
                            headerLargeTitle: false,
                            headerLeft: () => {
                                if (navigation.canGoBack()) {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => navigation.goBack()}
                                            style={{ marginLeft: 16 }}
                                        >
                                            <Ionicons
                                                name="chevron-back"
                                                size={24}
                                                color={colorScheme === 'dark' ? '#fff' : '#000'}
                                            />
                                        </TouchableOpacity>
                                    );
                                }
                                return null;
                            },
                            headerBackVisible: false,
                        })}
                    >
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
                    </Stack>
                    <StatusBar style="auto" />
                </NavigationThemeProvider>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
