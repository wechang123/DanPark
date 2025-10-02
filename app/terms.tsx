import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TermsScreen from '../components/TermsScreen';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TermsRoute() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    return (
        <>
            <Stack.Screen
                options={{
                    title: '이용약관',
                    headerShown: true,
                    headerTitle: '이용약관',
                    headerLargeTitle: false,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 16 }}>
                            <Ionicons name="chevron-back" size={24} color={colorScheme === 'dark' ? '#fff' : '#000'} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <TermsScreen />
        </>
    );
}
