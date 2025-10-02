import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, SafeAreaView, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const dkuLogo = require('../assets/images/dku_logo.png');

import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

const AuthScreen: React.FC = () => {
    const router = useRouter();
    const { login, signup } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('오류', '이메일과 비밀번호를 입력해주세요.');
            return;
        }

        setIsLoading(true);
        try {
            await login({ email, password });
            router.replace('/(tabs)');
        } catch (error: any) {
            Alert.alert('로그인 실패', error.message || '로그인에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignup = async () => {
        if (!email || !password || !name) {
            Alert.alert('오류', '모든 필드를 입력해주세요.');
            return;
        }

        setIsLoading(true);
        try {
            await signup({ email, password, name });
            Alert.alert('회원가입 성공', '로그인해주세요.', [
                { text: '확인', onPress: () => setIsLogin(true) }
            ]);
            setEmail('');
            setPassword('');
            setName('');
        } catch (error: any) {
            Alert.alert('회원가입 실패', error.message || '회원가입에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLogin) {
        return (
            <SafeAreaView style={styles.loginContainer}>
                <StatusBar barStyle="light-content" />
                <View style={styles.loginContent}>
                    <View style={styles.headerSection}>
                        <Text style={styles.headerTitle}>DanPark</Text>
                        <Text style={styles.headerSubtitle}>편안한 단국대 주차, 단주차</Text>
                    </View>

                    <View style={styles.formSection}>
                        <TextInput
                            style={styles.input}
                            placeholder="이메일"
                            placeholderTextColor="#9CA3AF"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="비밀번호"
                            placeholderTextColor="#9CA3AF"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#0C2A66" />
                        ) : (
                            <Text style={styles.loginButtonText}>로그인</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setIsLogin(false)}>
                        <Text style={styles.signupLink}>회원가입</Text>
                    </TouchableOpacity>

                    <View style={styles.dividerContainer}>
                        <View style={styles.divider} />
                        <Text style={styles.dividerText}>OR</Text>
                        <View style={styles.divider} />
                    </View>

                    <TouchableOpacity style={styles.portalButton}>
                        <Image source={dkuLogo} style={styles.portalLogo} />
                        <Text style={styles.portalButtonText}>단국대 포털로 로그인</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    // Sign Up Screen
    return (
        <SafeAreaView style={styles.signupContainer}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.signupHeader}>
                <TouchableOpacity onPress={() => setIsLogin(true)} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#111827" />
                </TouchableOpacity>
                <Text style={styles.signupHeaderTitle}>회원가입</Text>
            </View>
            <View style={styles.signupContent}>
                <TextInput
                    style={styles.signupInput}
                    placeholder="이름"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.signupInput}
                    placeholder="이메일"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.signupInput}
                    placeholder="비밀번호"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity
                    style={[styles.loginButton, { marginTop: 32 }]}
                    onPress={handleSignup}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#0C2A66" />
                    ) : (
                        <Text style={styles.loginButtonText}>회원가입</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    // Login Screen Styles
    loginContainer: { flex: 1, backgroundColor: '#0C2A66' },
    loginContent: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
    headerSection: { alignItems: 'center', marginBottom: 48 },
    headerTitle: { fontSize: 48, fontWeight: 'bold', color: 'white' },
    headerSubtitle: { fontSize: 18, color: '#DBEAFE' },
    formSection: { width: '100%', marginBottom: 16 },
    input: { backgroundColor: 'white', borderRadius: 12, padding: 16, fontSize: 16, marginBottom: 16 },
    loginButton: { backgroundColor: 'white', borderRadius: 12, padding: 18, alignItems: 'center', width: '100%' },
    loginButtonText: { color: '#0C2A66', fontSize: 18, fontWeight: '600' },
    signupLink: { color: 'white', textDecorationLine: 'underline', textAlign: 'center', marginTop: 24 },
    dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 32 },
    divider: { flex: 1, height: 1, backgroundColor: '#1E40AF' },
    dividerText: { color: '#3B82F6', marginHorizontal: 16 },
    portalButton: {
        flexDirection: 'row',
        backgroundColor: '#1D4ED8',
        borderRadius: 12,
        padding: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    portalLogo: { width: 24, height: 24, marginRight: 12, tintColor: 'white' },
    portalButtonText: { color: 'white', fontSize: 16, fontWeight: '500' },

    // Signup Screen Styles
    signupContainer: { flex: 1, backgroundColor: 'white' },
    signupHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    backButton: { padding: 8 },
    signupHeaderTitle: { fontSize: 20, fontWeight: '600', marginLeft: 16 },
    signupContent: { padding: 24 },
    signupInput: { borderBottomWidth: 2, borderColor: '#E5E7EB', paddingVertical: 12, fontSize: 18, marginBottom: 24 },
});

export default AuthScreen;
