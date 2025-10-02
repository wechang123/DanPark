import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, useColorScheme, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import * as api from '../utils/api';

// Reusable component for menu items
const SettingItem = ({ label, isSwitch, value, onValueChange, isDestructive = false, icon }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={!isSwitch ? onValueChange : undefined}>
        <View style={styles.itemLeft}>
            {icon && <Ionicons name={icon} size={20} color="#6B7280" style={styles.itemIcon} />}
            <Text style={[styles.itemLabel, isDestructive && styles.destructiveText]}>{label}</Text>
        </View>
        {isSwitch ? (
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                thumbColor="#ffffff"
            />
        ) : (
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        )}
    </TouchableOpacity>
);

const SettingsScreen = () => {
    const router = useRouter();
    const { theme, isDark, setTheme } = useTheme();
    const [notifications, setNotifications] = useState(true);
    const [location, setLocation] = useState(true);
    const [autoRefresh, setAutoRefresh] = useState(false);
    const [loading, setLoading] = useState(true);

    // 설정 불러오기
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const settings = await api.getSettings();
                setNotifications(settings.notifications);
                setLocation(settings.location);
                setAutoRefresh(settings.autoRefresh);
                setTheme(settings.theme);
            } catch (error) {
                console.error('[SettingsScreen] 설정 로드 실패:', error);
            } finally {
                setLoading(false);
            }
        };
        loadSettings();
    }, []);

    // 설정 변경 핸들러
    const handleSettingChange = async (key: keyof api.AppSettings, value: any) => {
        try {
            await api.updateSettings({ [key]: value });
        } catch (error) {
            console.error('[SettingsScreen] 설정 업데이트 실패:', error);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#3B82F6" />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                {/* App Settings */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>앱 설정</Text>
                    <View style={styles.sectionBody}>
                        <SettingItem
                            label="알림 허용"
                            isSwitch
                            value={notifications}
                            onValueChange={(value) => {
                                setNotifications(value);
                                handleSettingChange('notifications', value);
                            }}
                            icon="notifications-outline"
                        />
                        <SettingItem
                            label="위치 서비스"
                            isSwitch
                            value={location}
                            onValueChange={(value) => {
                                setLocation(value);
                                handleSettingChange('location', value);
                            }}
                            icon="location-outline"
                        />
                        <SettingItem
                            label="자동 새로고침"
                            isSwitch
                            value={autoRefresh}
                            onValueChange={(value) => {
                                setAutoRefresh(value);
                                handleSettingChange('autoRefresh', value);
                            }}
                            icon="refresh-outline"
                        />
                        <SettingItem
                            label="다크 모드"
                            isSwitch
                            value={isDark}
                            onValueChange={(value) => {
                                const newTheme = value ? 'dark' : 'light';
                                setTheme(newTheme);
                                handleSettingChange('theme', newTheme);
                            }}
                            icon="moon-outline"
                        />
                    </View>
                </View>

                {/* Account Settings */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>계정</Text>
                    <View style={styles.sectionBody}>
                        <SettingItem label="개인정보 수정" onValueChange={() => {}} icon="person-outline" />
                        <SettingItem label="비밀번호 변경" onValueChange={() => {}} icon="key-outline" />
                    </View>
                </View>

                {/* Support */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>지원</Text>
                    <View style={styles.sectionBody}>
                        <SettingItem
                            label="공지사항"
                            onValueChange={() => router.push('/notice')}
                            icon="megaphone-outline"
                        />
                        <SettingItem
                            label="고객센터"
                            onValueChange={() => router.push('/support')}
                            icon="help-circle-outline"
                        />
                    </View>
                </View>

                {/* Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>정보</Text>
                    <View style={styles.sectionBody}>
                        <SettingItem
                            label="이용약관"
                            onValueChange={() => router.push('/terms')}
                            icon="document-text-outline"
                        />
                        <SettingItem
                            label="개인정보처리방침"
                            onValueChange={() => router.push('/privacy')}
                            icon="shield-checkmark-outline"
                        />
                        <View style={styles.itemContainer}>
                            <View style={styles.itemLeft}>
                                <Ionicons
                                    name="information-circle-outline"
                                    size={20}
                                    color="#6B7280"
                                    style={styles.itemIcon}
                                />
                                <Text style={styles.itemLabel}>앱 버전</Text>
                            </View>
                            <Text style={styles.versionText}>1.0.0</Text>
                        </View>
                    </View>
                </View>

                {/* Danger Zone */}
                <View style={styles.section}>
                    <View style={styles.sectionBody}>
                        <SettingItem label="계정 삭제" onValueChange={() => {}} isDestructive icon="trash-outline" />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
    container: { flex: 1 },
    section: { marginVertical: 12 },
    sectionTitle: { fontSize: 14, color: '#6B7280', paddingHorizontal: 16, marginBottom: 8 },
    sectionBody: { backgroundColor: 'white', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#E5E7EB' },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        marginLeft: 16, // for the separator line to not be full width
        borderBottomWidth: 1,
        borderColor: '#E5E7EB',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemIcon: {
        marginRight: 12,
    },
    itemLabel: { fontSize: 16 },
    versionText: { fontSize: 16, color: '#6B7280' },
    destructiveText: { color: '#EF4444' },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SettingsScreen;
