import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

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
                            onValueChange={setNotifications}
                            icon="notifications-outline"
                        />
                        <SettingItem
                            label="위치 서비스"
                            isSwitch
                            value={location}
                            onValueChange={setLocation}
                            icon="location-outline"
                        />
                        <SettingItem
                            label="자동 새로고침"
                            isSwitch
                            value={autoRefresh}
                            onValueChange={setAutoRefresh}
                            icon="refresh-outline"
                        />
                        <SettingItem
                            label="다크 모드"
                            isSwitch
                            value={isDark}
                            onValueChange={value => setTheme(value ? 'dark' : 'light')}
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
});

export default SettingsScreen;
