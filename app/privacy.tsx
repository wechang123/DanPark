import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PrivacyScreen from '../components/PrivacyScreen';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function PrivacyRoute() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    return (
        <>
            <Stack.Screen
                options={{
                    title: '개인정보처리방침',
                    headerShown: true,
                    headerTitle: '개인정보처리방침',
                    headerLargeTitle: false,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 16 }}>
                            <Ionicons name="chevron-back" size={24} color={colorScheme === 'dark' ? '#fff' : '#000'} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <PrivacyScreen />
        </>
    );
}
