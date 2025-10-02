import React from 'react';
import { Stack } from 'expo-router';
import AuthScreen from '../../components/AuthScreen';

export default function LoginRoute() {
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <AuthScreen />
        </>
    );
}

