import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const ParkingHistoryItem = ({ date, location, duration, fee }) => (
    <View style={styles.historyItem}>
        <View style={styles.historyHeader}>
            <Text style={styles.historyDate}>{date}</Text>
            <Text style={styles.historyFee}>{fee}</Text>
        </View>
        <View style={styles.historyContent}>
            <View style={styles.locationContainer}>
                <Ionicons name="location" size={16} color="#3B82F6" />
                <Text style={styles.locationText}>{location}</Text>
            </View>
            <View style={styles.durationContainer}>
                <Ionicons name="time-outline" size={16} color="#6B7280" />
                <Text style={styles.durationText}>{duration}</Text>
            </View>
        </View>
    </View>
);

const ParkingHistoryScreen = () => {
    // Mock data
    const parkingHistory = [
        {
            id: 1,
            date: '2024.03.15',
            location: '글로컬관 주차장 A-123',
            duration: '09:00 - 18:30 (9시간 30분)',
            fee: '무료',
        },
        {
            id: 2,
            date: '2024.03.14',
            location: '상경관 주차장 B-45',
            duration: '13:00 - 17:30 (4시간 30분)',
            fee: '무료',
        },
        {
            id: 3,
            date: '2024.03.13',
            location: '글로컬관 주차장 C-78',
            duration: '10:00 - 16:00 (6시간)',
            fee: '무료',
        },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>이번 달 주차 내역</Text>
                    {parkingHistory.map(history => (
                        <ParkingHistoryItem key={history.id} {...history} />
                    ))}
                </View>
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
    section: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 16,
    },
    historyItem: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    historyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    historyDate: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    historyFee: {
        fontSize: 16,
        color: '#3B82F6',
        fontWeight: '500',
    },
    historyContent: {
        gap: 8,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        fontSize: 15,
        color: '#374151',
        marginLeft: 8,
    },
    durationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    durationText: {
        fontSize: 14,
        color: '#6B7280',
        marginLeft: 8,
    },
});

export default ParkingHistoryScreen;
