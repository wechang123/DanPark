import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const NoticeItem = ({ title, date, isNew }) => (
    <TouchableOpacity style={styles.noticeItem}>
        <View style={styles.noticeHeader}>
            <Text style={styles.noticeTitle}>{title}</Text>
            {isNew && (
                <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>NEW</Text>
                </View>
            )}
        </View>
        <Text style={styles.noticeDate}>{date}</Text>
    </TouchableOpacity>
);

const NoticeScreen = () => {
    const router = useRouter();

    const notices = [
        { id: 1, title: '[안내] 단국대학교 주차 시스템 업데이트 안내', date: '2024.03.15', isNew: true },
        { id: 2, title: '[공지] 주차장 이용 시간 변경 안내', date: '2024.03.10', isNew: true },
        { id: 3, title: '[안내] 시스템 점검 안내', date: '2024.03.01', isNew: false },
        { id: 4, title: '[공지] 주차장 이용 규칙 안내', date: '2024.02.25', isNew: false },
        { id: 5, title: '[안내] 앱 출시 안내', date: '2024.02.20', isNew: false },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                {notices.map(notice => (
                    <NoticeItem key={notice.id} {...notice} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    container: {
        flex: 1,
    },
    noticeItem: {
        backgroundColor: 'white',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    noticeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    noticeTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111827',
        flex: 1,
    },
    noticeDate: {
        fontSize: 14,
        color: '#6B7280',
    },
    newBadge: {
        backgroundColor: '#EF4444',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginLeft: 8,
    },
    newBadgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
});

export default NoticeScreen;
