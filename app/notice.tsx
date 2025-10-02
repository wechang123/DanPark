import React from 'react';
import { Stack } from 'expo-router';
import NoticeScreen from '../components/NoticeScreen';

export default function NoticeRoute() {
    return (
        <>
            <Stack.Screen
                options={{
                    title: '공지사항',
                    headerShown: true,
                    headerBackTitle: ' ',
                    headerBackTitleVisible: false,
                    headerTitle: '공지사항',
                }}
            />
            <NoticeScreen />
        </>
    );
}
