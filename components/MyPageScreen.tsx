import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';

// Mock Data
const userInfo = {
    name: '김단국',
    studentId: '32200000',
    department: '소프트웨어학과',
};
const menuItems = [
    { title: '주차 기록', icon: 'time-outline', route: '/parking-history' },
    { title: '이용 통계', icon: 'stats-chart-outline', route: '/parking-stats' },
    { title: '공지사항', icon: 'megaphone-outline', route: '/notice' },
    { title: '고객센터', icon: 'help-buoy-outline', route: '/support' },
    { title: '설정', icon: 'settings-outline', route: '/settings' },
];

const MyPageScreen = () => {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>마이페이지</Text>
                </View>

                {/* User Profile */}
                <View style={styles.profileSection}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{userInfo.name.charAt(0)}</Text>
                    </View>
                    <View>
                        <Text style={styles.name}>{userInfo.name}</Text>
                        <Text style={styles.department}>{userInfo.department}</Text>
                        <Text style={styles.studentId}>{userInfo.studentId}</Text>
                    </View>
                </View>

                {/* Menu */}
                <View style={styles.menuContainer}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.menuItem} onPress={() => router.push(item.route)}>
                            <Ionicons name={item.icon as any} size={22} color="#4B5563" />
                            <Text style={styles.menuItemText}>{item.title}</Text>
                            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout Button */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => {
                        // 로그아웃 처리
                        router.replace('/(auth)/login');
                    }}
                >
                    <Text style={styles.logoutButtonText}>로그아웃</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
    container: { flex: 1 },
    header: {
        backgroundColor: 'white',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        alignItems: 'center',
    },
    headerTitle: { fontSize: 18, fontWeight: '600' },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 24,
        margin: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#3B82F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    avatarText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
    name: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
    department: { fontSize: 16, color: '#4B5563', marginBottom: 2 },
    studentId: { fontSize: 14, color: '#6B7280' },
    menuContainer: {
        backgroundColor: 'white',
        marginHorizontal: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    menuItemText: { flex: 1, fontSize: 16, marginLeft: 16 },
    logoutButton: {
        margin: 16,
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    logoutButtonText: { color: '#EF4444', fontSize: 16, fontWeight: '500' },
});

export default MyPageScreen;
