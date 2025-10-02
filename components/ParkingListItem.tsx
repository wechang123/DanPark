import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ParkingLot } from '../types';
import { useParkingLots } from '../context/ParkingLotContext';

interface ParkingListItemProps {
    parkingLot: ParkingLot;
    onSelect: () => void;
    onToggleFavorite: () => void;
}

const ParkingListItem: React.FC<ParkingListItemProps> = ({ parkingLot, onSelect, onToggleFavorite }) => {
    const { currentParking } = useParkingLots();
    const isOtherParkingLot = currentParking && currentParking.id !== parkingLot.id;

    const getCongestionStyle = (level: string) => {
        switch (level) {
            case '여유':
                return { container: styles.bgBlue50, text: styles.textBlue600, dot: styles.dotBlue };
            case '보통':
                return { container: styles.bgGreen50, text: styles.textGreen600, dot: styles.dotGreen };
            case '혼잡':
                return { container: styles.bgYellow50, text: styles.textYellow600, dot: styles.dotYellow };
            case '만차':
                return { container: styles.bgRed50, text: styles.textRed600, dot: styles.dotRed };
            default:
                return { container: styles.bgGray50, text: styles.textGray600, dot: styles.dotGray };
        }
    };

    const getUtilizationPercentage = () => {
        if (parkingLot.totalSpaces === 0) return 0;
        return Math.round((parkingLot.currentParked / parkingLot.totalSpaces) * 100);
    };

    const formatDistance = (distance: number) => {
        if (distance < 1000) {
            return `${distance}m`;
        } else {
            return `${(distance / 1000).toFixed(1)}km`;
        }
    };

    const congestionStyle = getCongestionStyle(parkingLot.congestionLevel);
    const utilization = getUtilizationPercentage();

    const utilizationColor =
        utilization >= 90
            ? '#EF4444' // red-500
            : utilization >= 70
            ? '#F59E0B' // yellow-500
            : utilization >= 40
            ? '#10B981' // green-500
            : '#3B82F6'; // blue-500

    return (
        <TouchableOpacity onPress={onSelect} style={styles.container}>
            {/* Top Section: Name and Favorite Button */}
            <View style={styles.topSection}>
                <Text style={styles.name}>{parkingLot.name}</Text>
                <TouchableOpacity onPress={onToggleFavorite} style={styles.favoriteButton}>
                    <Ionicons
                        name={parkingLot.isFavorite ? 'star' : 'star-outline'}
                        size={22}
                        color={parkingLot.isFavorite ? '#F59E0B' : '#9CA3AF'}
                    />
                </TouchableOpacity>
            </View>

            {/* Middle Section: Status and Distance */}
            <View style={styles.middleSection}>
                <View style={[styles.congestionBadge, congestionStyle.container]}>
                    <View style={[styles.dot, congestionStyle.dot]} />
                    <Text style={[styles.congestionText, congestionStyle.text]}>
                        {currentParking
                            ? currentParking.id === parkingLot.id
                                ? '주차중'
                                : `${currentParking.name} 주차중`
                            : parkingLot.congestionLevel}
                    </Text>
                </View>
                <Text style={styles.statusText}>
                    <Text style={styles.statusBold}>
                        {currentParking
                            ? currentParking.id === parkingLot.id
                                ? `#${currentParking.parkingSpotNumber}번`
                                : `${parkingLot.currentParked}/${parkingLot.totalSpaces}`
                            : `${parkingLot.currentParked}/${parkingLot.totalSpaces}`}
                    </Text>
                    {!currentParking && ` (${utilization}%)`}
                </Text>
                <View style={styles.distanceContainer}>
                    <Ionicons name="location-sharp" size={14} color="#6B7280" />
                    <Text style={styles.distanceText}>{formatDistance(parkingLot.distance)}</Text>
                </View>
            </View>

            {/* Bottom Section: Progress Bar */}
            <View style={styles.bottomSection}>
                <View style={styles.progressBarBackground}>
                    <View
                        style={[
                            styles.progressBarFill,
                            { width: `${utilization}%`, backgroundColor: utilizationColor },
                        ]}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    disabledContainer: {
        opacity: 0.5,
        backgroundColor: '#F3F4F6',
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        marginBottom: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    topSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        flex: 1, // Ensure name doesn't push favorite button off-screen
    },
    favoriteButton: {
        padding: 4,
    },
    middleSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    congestionBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 999,
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginRight: 12,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 6,
    },
    congestionText: {
        fontSize: 12,
        fontWeight: '500',
    },
    statusText: {
        fontSize: 14,
        color: '#4B5563',
        marginRight: 12,
    },
    statusBold: {
        fontWeight: '600',
    },
    distanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    distanceText: {
        fontSize: 14,
        color: '#6B7280',
        marginLeft: 4,
    },
    bottomSection: {},
    progressBarBackground: {
        height: 8,
        backgroundColor: '#E5E7EB',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: 8,
        borderRadius: 4,
    },
    // Color styles
    bgBlue50: { backgroundColor: '#EFF6FF' },
    textBlue600: { color: '#2563EB' },
    dotBlue: { backgroundColor: '#3B82F6' },
    bgGreen50: { backgroundColor: '#F0FDF4' },
    textGreen600: { color: '#16A34A' },
    dotGreen: { backgroundColor: '#22C55E' },
    bgYellow50: { backgroundColor: '#FFFBEB' },
    textYellow600: { color: '#D97706' },
    dotYellow: { backgroundColor: '#F59E0B' },
    bgRed50: { backgroundColor: '#FEF2F2' },
    textRed600: { color: '#DC2626' },
    dotRed: { backgroundColor: '#EF4444' },
    bgGray50: { backgroundColor: '#F9FAFB' },
    textGray600: { color: '#4B5563' },
    dotGray: { backgroundColor: '#6B7280' },
});

export default ParkingListItem;
