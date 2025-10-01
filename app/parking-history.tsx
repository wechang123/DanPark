import React from 'react';
import { Stack } from 'expo-router';
import ParkingHistoryScreen from '../components/ParkingHistoryScreen';

export default function ParkingHistoryRoute() {
    return (
        <>
            <Stack.Screen
                options={{
                    title: '주차 기록',
                    headerShown: true,
                    headerBackTitle: ' ',
                    headerBackTitleVisible: false,
                    headerTitle: '주차 기록',
                }}
            />
            <ParkingHistoryScreen />
        </>
    );
}
