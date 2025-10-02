import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ParkingLotProvider } from '../../context/ParkingLotContext';

export default function TabLayout() {
    return (
        <ParkingLotProvider>
            <Tabs
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: '#3B82F6', // Blue-500
                    tabBarInactiveTintColor: '#6B7280', // Gray-500
                    headerShown: false,
                    headerBackTitle: ' ', // iOS에서 뒤로가기 버튼의 텍스트를 제거
                    headerBackTitleVisible: false,
                    headerBackVisible: true,
                    headerTitleStyle: {
                        fontSize: 18,
                    },
                    tabBarIcon: ({ color, size }) => {
                        let iconName: keyof typeof Ionicons.glyphMap = 'home'; // Default icon
                        if (route.name === 'index') {
                            iconName = 'home';
                        } else if (route.name === 'favorites') {
                            iconName = 'star';
                        } else if (route.name === 'mypage') {
                            iconName = 'person-circle';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
            >
                <Tabs.Screen name="index" options={{ title: '홈' }} />
                <Tabs.Screen name="favorites" options={{ title: '즐겨찾기' }} />
                <Tabs.Screen name="mypage" options={{ title: '마이페이지' }} />
            </Tabs>
        </ParkingLotProvider>
    );
}
