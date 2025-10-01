import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SettingsScreen from '../components/SettingsScreen';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function SettingsRoute() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    return (
        <>
            <Stack.Screen
                options={{
                    title: '설정',
                    headerShown: true,
                    headerTitle: '설정',
                    headerLargeTitle: false,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 16 }}>
                            <Ionicons name="chevron-back" size={24} color={colorScheme === 'dark' ? '#fff' : '#000'} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <SettingsScreen />
        </>
    );
}
