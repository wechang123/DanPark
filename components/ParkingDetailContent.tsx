import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ParkingLot } from '../types';
import { useParkingLots } from '../context/ParkingLotContext';

interface ParkingDetailContentProps {
    parkingLot: ParkingLot;
    onShowDiagram?: () => void;
}

const ParkingDetailContent: React.FC<ParkingDetailContentProps> = ({ parkingLot, onShowDiagram }) => {
    const { toggleParking } = useParkingLots();

    // 주차장 점유율 계산
    const utilization = Math.round((parkingLot.currentParked / parkingLot.totalSpaces) * 100);

    // 혼잡도에 따른 색상 반환
    const getCongestionColor = () => {
        switch (parkingLot.congestionLevel) {
            case '여유':
                return '#3B82F6';
            case '보통':
                return '#10B981';
            case '혼잡':
                return '#F59E0B';
            case '만차':
                return '#EF4444';
            default:
                return '#6B7280';
        }
    };

    return (
        <View style={styles.container}>
            {/* 주소 섹션 */}
            <View style={styles.section}>
                <View style={styles.addressRow}>
                    <Ionicons name="location" size={20} color="#3B82F6" />
                    <Text style={styles.address}>{parkingLot.address}</Text>
                </View>
                <Text style={styles.distance}>현재 위치에서 {parkingLot.distance}m</Text>
            </View>

            {/* 상태 섹션 */}
            <View style={styles.statusSection}>
                <View style={styles.statusHeader}>
                    <Text style={styles.sectionTitle}>주차장 현황</Text>
                    <TouchableOpacity onPress={onShowDiagram} style={styles.diagramButton}>
                        <Ionicons name="map-outline" size={20} color="#3B82F6" />
                        <Text style={styles.buttonText}>도면 보기</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.statusGrid}>
                    <View style={styles.statusItem}>
                        <Text style={styles.label}>전체</Text>
                        <Text style={styles.value}>{parkingLot.totalSpaces}면</Text>
                    </View>
                    <View style={styles.statusItem}>
                        <Text style={styles.label}>사용 중</Text>
                        <Text style={styles.value}>{parkingLot.currentParked}면</Text>
                    </View>
                    <View style={styles.statusItem}>
                        <Text style={styles.label}>잔여</Text>
                        <Text style={styles.value}>{parkingLot.totalSpaces - parkingLot.currentParked}면</Text>
                    </View>
                    <View style={styles.statusItem}>
                        <Text style={styles.label}>상태</Text>
                        <Text style={[styles.value, { color: getCongestionColor() }]}>
                            {parkingLot.congestionLevel}
                        </Text>
                    </View>
                </View>

                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View
                            style={[
                                styles.progressFill,
                                {
                                    width: `${utilization}%`,
                                    backgroundColor: getCongestionColor(),
                                },
                            ]}
                        />
                    </View>
                    <Text style={styles.progressText}>{utilization}% 사용 중</Text>
                </View>
            </View>

            {/* 주차 상태/액션 섹션 */}
            {parkingLot.isParking ? (
                <View style={styles.parkingStatus}>
                    <View>
                        <Text style={styles.parkingSpot}>#{parkingLot.parkingSpotNumber}번 자리 주차 중</Text>
                        <Text style={styles.parkingTime}>
                            {new Date(parkingLot.parkingStartTime || '').toLocaleTimeString()} 부터
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.returnButton]}
                        onPress={() => toggleParking(parkingLot.id, null)}
                    >
                        <Text style={styles.buttonTextWhite}>반납하기</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity
                    style={[styles.actionButton, styles.parkButton]}
                    onPress={() => toggleParking(parkingLot.id, '45')}
                >
                    <Text style={styles.buttonTextWhite}>주차하기</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    section: {
        marginBottom: 20,
    },
    addressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    address: {
        marginLeft: 8,
        fontSize: 16,
        color: '#111827',
        flex: 1,
    },
    distance: {
        fontSize: 14,
        color: '#6B7280',
    },
    statusSection: {
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    statusHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    diagramButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: '#3B82F6',
        marginLeft: 4,
        fontSize: 14,
    },
    statusGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    statusItem: {
        width: '50%',
        marginBottom: 12,
    },
    label: {
        fontSize: 13,
        color: '#6B7280',
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    progressContainer: {
        marginTop: 8,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#E5E7EB',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 8,
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'right',
    },
    parkingStatus: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EFF6FF',
        padding: 16,
        borderRadius: 12,
    },
    parkingSpot: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E40AF',
        marginBottom: 4,
    },
    parkingTime: {
        fontSize: 14,
        color: '#3B82F6',
    },
    actionButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    parkButton: {
        backgroundColor: '#3B82F6',
        width: '100%',
    },
    returnButton: {
        backgroundColor: '#EF4444',
    },
    buttonTextWhite: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ParkingDetailContent;
