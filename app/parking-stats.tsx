import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ParkingStatsScreen from '../components/ParkingStatsScreen';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ParkingStatsRoute() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    return (
        <>
            <Stack.Screen
                options={{
                    title: '이용 통계',
                    headerShown: true,
                    headerTitle: '이용 통계',
                    headerLargeTitle: false,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 16 }}>
                            <Ionicons name="chevron-back" size={24} color={colorScheme === 'dark' ? '#fff' : '#000'} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <ParkingStatsScreen />
        </>
    );
}
