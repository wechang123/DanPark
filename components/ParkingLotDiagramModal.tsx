import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ParkingLot } from '../types';
import { useParkingLots } from '../context/ParkingLotContext';

interface ParkingLotDiagramModalProps {
    visible: boolean;
    parkingLot: ParkingLot | null;
    onClose: () => void;
}

type SpotStatus = '이용가능' | '이용중' | '선택됨' | '장애인전용';

const ParkingLotDiagramModal: React.FC<ParkingLotDiagramModalProps> = ({ visible, parkingLot, onClose }) => {
    const { toggleParking, currentParking } = useParkingLots();
    const [selectedSpot, setSelectedSpot] = useState<string | null>(null);

    if (!parkingLot) return null;

    const getSpotStatus = (spotNumber: number): SpotStatus => {
        // 현재 내가 주차한 자리
        if (parkingLot.isParking && parkingLot.parkingSpotNumber === String(spotNumber)) return '이용중';
        // 선택한 자리
        if (selectedSpot === String(spotNumber)) return '선택됨';
        // 장애인 전용 구역
        if ([86, 87, 88, 89, 90].includes(spotNumber)) return '장애인전용';
        // 다른 차량이 주차한 자리 (currentParked 수만큼 연속된 번호가 사용 중)
        if (spotNumber <= parkingLot.currentParked) return '이용중';
        // 나머지는 이용 가능
        return '이용가능';
    };

    const getSpotStyle = (status: SpotStatus) => {
        switch (status) {
            case '이용가능':
                return styles.spotAvailable;
            case '이용중':
                return styles.spotOccupied;
            case '선택됨':
                return styles.spotSelected;
            case '장애인전용':
                return styles.spotDisabled;
            default:
                return styles.spotAvailable;
        }
    };

    const getSpotTextStyle = (status: SpotStatus) => {
        switch (status) {
            case '이용가능':
                return styles.spotTextAvailable;
            case '이용중':
                return styles.spotTextOccupied;
            case '선택됨':
                return styles.spotTextSelected;
            case '장애인전용':
                return styles.spotTextDisabled;
            default:
                return styles.spotTextAvailable;
        }
    };

    const handleSpotPress = (spotNumber: number) => {
        // 다른 주차장에 주차 중이거나 현재 주차장에 주차 중이면 선택 불가
        if (!!currentParking || parkingLot.isParking) return;

        const status = getSpotStatus(spotNumber);
        // 이용 중이거나 장애인 전용 구역이면 선택 불가
        if (status === '이용중' || status === '장애인전용') return;

        setSelectedSpot(status === '선택됨' ? null : String(spotNumber));
    };

    const handleParkingComplete = () => {
        if (selectedSpot && parkingLot) {
            toggleParking(parkingLot.id, selectedSpot);
            setSelectedSpot(null); // 선택 상태만 초기화
        }
    };

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <SafeAreaView style={styles.modalContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="#6B7280" />
                    </TouchableOpacity>
                    <Text style={styles.title}>{parkingLot.name} 도식도</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView style={styles.content}>
                    <Text style={styles.subtitle}>실제 도식도는 팀원2가 개발 중입니다.</Text>
                    <Text style={styles.subtitle}>현재는 목업 화면입니다.</Text>

                    <View style={styles.legend}>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
                            <Text>이용 가능</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
                            <Text>이용 중</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: '#3B82F6' }]} />
                            <Text>선택됨</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: '#6B7280' }]} />
                            <Text>장애인 전용</Text>
                        </View>
                    </View>

                    <View style={styles.spotsContainer}>
                        {Array.from({ length: 100 }, (_, i) => i + 1).map(number => {
                            const status = getSpotStatus(number);
                            return (
                                <TouchableOpacity
                                    key={number}
                                    style={[
                                        styles.spot,
                                        getSpotStyle(status),
                                        !!currentParking && !parkingLot.isParking && styles.spotDisabled,
                                    ]}
                                    onPress={() => handleSpotPress(number)}
                                    disabled={
                                        !!currentParking ||
                                        parkingLot.isParking ||
                                        status === '이용중' ||
                                        status === '장애인전용'
                                    }
                                >
                                    <Text style={[styles.spotText, getSpotTextStyle(status)]}>{number}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    {parkingLot.isParking ? (
                        <View style={styles.parkingStatusContainer}>
                            <View style={styles.parkingStatusHeader}>
                                <View style={styles.parkingBadge}>
                                    <Text style={styles.parkingBadgeText}>주차 중</Text>
                                </View>
                                <Text style={styles.parkingSpotText}>#{parkingLot.parkingSpotNumber}번 자리</Text>
                            </View>
                            <TouchableOpacity
                                style={[styles.completeButton, { backgroundColor: '#EF4444' }]}
                                onPress={() => {
                                    toggleParking(parkingLot.id, null);
                                    onClose();
                                }}
                            >
                                <Text style={styles.completeButtonText}>주차 반납</Text>
                            </TouchableOpacity>
                        </View>
                    ) : currentParking ? (
                        <View style={styles.parkingStatusContainer}>
                            <View style={styles.warningContainer}>
                                <Text style={styles.warningText}>다른 주차장에 주차 중입니다</Text>
                                <Text style={styles.warningSubText}>
                                    {currentParking.name} #{currentParking.parkingSpotNumber}번
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={[styles.completeButton, { backgroundColor: '#EF4444', marginTop: 12 }]}
                                onPress={() => {
                                    toggleParking(currentParking.id, null);
                                    onClose();
                                }}
                            >
                                <Text style={styles.completeButtonText}>주차 반납</Text>
                            </TouchableOpacity>
                        </View>
                    ) : selectedSpot ? (
                        <TouchableOpacity style={styles.completeButton} onPress={handleParkingComplete}>
                            <Text style={styles.completeButtonText}>주차 완료</Text>
                        </TouchableOpacity>
                    ) : null}
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    closeButton: {
        padding: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    subtitle: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 4,
    },
    legend: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 16,
        marginBottom: 16,
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 6,
    },
    spotsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8,
    },
    spot: {
        width: 44,
        height: 44,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    spotText: {
        fontSize: 14,
        fontWeight: '600',
    },
    spotAvailable: {
        backgroundColor: '#F0FDF4',
        borderColor: '#10B981',
    },
    spotTextAvailable: {
        color: '#10B981',
    },
    spotOccupied: {
        backgroundColor: '#FEF2F2',
        borderColor: '#EF4444',
    },
    spotTextOccupied: {
        color: '#EF4444',
    },
    spotSelected: {
        backgroundColor: '#EFF6FF',
        borderColor: '#3B82F6',
    },
    spotTextSelected: {
        color: '#3B82F6',
    },
    spotDisabled: {
        backgroundColor: '#F3F4F6',
        borderColor: '#6B7280',
    },
    spotTextDisabled: {
        color: '#6B7280',
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    completeButton: {
        backgroundColor: '#3B82F6',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    completeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    parkingStatusContainer: {
        width: '100%',
    },
    parkingStatusHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    parkingBadge: {
        backgroundColor: '#EFF6FF',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
        marginRight: 8,
    },
    parkingBadgeText: {
        color: '#3B82F6',
        fontSize: 14,
        fontWeight: '600',
    },
    parkingSpotText: {
        color: '#111827',
        fontSize: 16,
        fontWeight: '500',
    },
    warningContainer: {
        backgroundColor: '#FEF2F2',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    warningText: {
        color: '#EF4444',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    warningSubText: {
        color: '#6B7280',
        fontSize: 14,
    },
    spotDisabled: {
        backgroundColor: '#F3F4F6',
        borderColor: '#E5E7EB',
    },
});

export default ParkingLotDiagramModal;
