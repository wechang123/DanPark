import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const StatCard = ({ title, value, icon, color }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
        <View style={styles.statIconContainer}>
            <Ionicons name={icon} size={24} color={color} />
        </View>
        <View style={styles.statContent}>
            <Text style={styles.statTitle}>{title}</Text>
            <Text style={[styles.statValue, { color }]}>{value}</Text>
        </View>
    </View>
);

const ParkingStatsScreen = () => {
    // Mock data
    const monthlyStats = {
        totalHours: '45시간',
        averageTime: '3시간',
        mostUsed: '글로컬관 주차장',
        peakTime: '13:00 - 15:00',
    };

    const popularTimes = [
        { time: '09-11', percentage: 60 },
        { time: '11-13', percentage: 80 },
        { time: '13-15', percentage: 100 },
        { time: '15-17', percentage: 70 },
        { time: '17-19', percentage: 40 },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>이번 달 주차 통계</Text>
                    <View style={styles.statsGrid}>
                        <StatCard
                            title="총 주차 시간"
                            value={monthlyStats.totalHours}
                            icon="time-outline"
                            color="#3B82F6"
                        />
                        <StatCard
                            title="평균 주차 시간"
                            value={monthlyStats.averageTime}
                            icon="calculator-outline"
                            color="#10B981"
                        />
                        <StatCard
                            title="가장 많이 이용한 주차장"
                            value={monthlyStats.mostUsed}
                            icon="location-outline"
                            color="#F59E0B"
                        />
                        <StatCard
                            title="주차 선호 시간대"
                            value={monthlyStats.peakTime}
                            icon="analytics-outline"
                            color="#8B5CF6"
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>시간대별 이용 빈도</Text>
                    <View style={styles.popularTimesContainer}>
                        {popularTimes.map((item, index) => (
                            <View key={index} style={styles.timeSlot}>
                                <Text style={styles.timeText}>{item.time}</Text>
                                <View style={styles.barContainer}>
                                    <View
                                        style={[
                                            styles.bar,
                                            { width: `${item.percentage}%`, backgroundColor: '#3B82F6' },
                                        ]}
                                    />
                                </View>
                                <Text style={styles.percentageText}>{item.percentage}%</Text>
                            </View>
                        ))}
                    </View>
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
    statsGrid: {
        gap: 12,
    },
    statCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        borderLeftWidth: 4,
    },
    statIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    statContent: {
        flex: 1,
    },
    statTitle: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 4,
    },
    statValue: {
        fontSize: 18,
        fontWeight: '600',
    },
    popularTimesContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        gap: 12,
    },
    timeSlot: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    timeText: {
        width: 50,
        fontSize: 14,
        color: '#6B7280',
    },
    barContainer: {
        flex: 1,
        height: 8,
        backgroundColor: '#E5E7EB',
        borderRadius: 4,
        overflow: 'hidden',
    },
    bar: {
        height: '100%',
        borderRadius: 4,
    },
    percentageText: {
        width: 40,
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'right',
    },
});

export default ParkingStatsScreen;
