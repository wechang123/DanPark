import React, { useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useParkingLots } from '../context/ParkingLotContext';
import ParkingListItem from './ParkingListItem';
import { Ionicons } from '@expo/vector-icons';
import { SortOption } from '../types';
import SortFilterModal from './SortFilterModal';
import BottomSheet, { BottomSheetFlatList, BottomSheetMethods } from '@gorhom/bottom-sheet';
import ParkingDetailContent from './ParkingDetailContent';
import { ParkingLot } from '../types';

const FavoritesScreen = () => {
    const { parkingLots, toggleFavorite } = useParkingLots();
    const bottomSheetRef = useRef<BottomSheetMethods>(null);
    const [selectedParkingLot, setSelectedParkingLot] = useState<ParkingLot | null>(null);
    const [sheetIndex, setSheetIndex] = useState(0);
    const [sortOption, setSortOption] = useState<SortOption>('거리순');
    const [isSortModalVisible, setSortModalVisible] = useState(false);

    const favoriteParkingLots = useMemo(() => parkingLots.filter(lot => lot.isFavorite), [parkingLots]);

    const sortedFavoriteParkingLots = useMemo(
        () =>
            [...favoriteParkingLots].sort((a, b) => {
                switch (sortOption) {
                    case '거리순':
                        return a.distance - b.distance;
                    case '혼잡도순':
                        const congestionOrder = { 여유: 0, 보통: 1, 혼잡: 2, 만차: 3 } as const;
                        return congestionOrder[a.congestionLevel] - congestionOrder[b.congestionLevel];
                    case '빈자리순':
                        return b.totalSpaces - b.currentParked - (a.totalSpaces - a.currentParked);
                    case '이름순':
                        return a.name.localeCompare(b.name);
                    default:
                        return 0;
                }
            }),
        [favoriteParkingLots, sortOption]
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerTop}>
                            <Text style={styles.headerTitle}>즐겨찾기</Text>
                            <TouchableOpacity style={styles.sortButton} onPress={() => setSortModalVisible(true)}>
                                <Text style={styles.sortButtonText}>{sortOption}</Text>
                                <Ionicons name="chevron-down" size={16} color="#3B82F6" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {favoriteParkingLots.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="star-outline" size={64} color="#D1D5DB" />
                            <Text style={styles.emptyTitle}>즐겨찾기가 없습니다</Text>
                            <Text style={styles.emptySubtitle}>자주 이용하는 주차장을 즐겨찾기에 추가해보세요.</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={sortedFavoriteParkingLots}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <ParkingListItem
                                    parkingLot={item}
                                    onSelect={() => {
                                        setSelectedParkingLot(item);
                                        bottomSheetRef.current?.snapToIndex(1);
                                    }}
                                    onToggleFavorite={() => toggleFavorite(item.id)}
                                />
                            )}
                            contentContainerStyle={styles.listContainer}
                            showsVerticalScrollIndicator={false}
                            bounces={true}
                            alwaysBounceVertical={true}
                            decelerationRate="normal"
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                        />
                    )}

                    <SortFilterModal
                        visible={isSortModalVisible}
                        currentSort={sortOption}
                        onClose={() => setSortModalVisible(false)}
                        onSortChange={option => {
                            setSortOption(option);
                            setSortModalVisible(false);
                        }}
                    />

                    <BottomSheet
                        ref={bottomSheetRef}
                        index={0}
                        snapPoints={['8%', '50%', '90%']}
                        enablePanDownToClose={false}
                        enableOverDrag={true}
                        enableContentPanningGesture={false}
                        enableHandlePanningGesture={true}
                        style={{ marginBottom: 0 }}
                        handleComponent={() => (
                            <View style={styles.sheetHeaderContainer}>
                                <View style={styles.handleIndicator} />
                                {selectedParkingLot ? (
                                    <View style={styles.detailHeader}>
                                        <TouchableOpacity
                                            style={styles.backButton}
                                            onPress={() => {
                                                setSelectedParkingLot(null);
                                                bottomSheetRef.current?.snapToIndex(0);
                                            }}
                                        >
                                            <Ionicons name="chevron-back" size={24} color="#111827" />
                                        </TouchableOpacity>
                                        <Text style={styles.detailHeaderText}>{selectedParkingLot.name}</Text>
                                        <TouchableOpacity
                                            style={styles.headerIconButton}
                                            onPress={() => toggleFavorite(selectedParkingLot.id)}
                                        >
                                            <Ionicons
                                                name={selectedParkingLot.isFavorite ? 'star' : 'star-outline'}
                                                size={24}
                                                color={selectedParkingLot.isFavorite ? '#3B82F6' : '#6B7280'}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <View style={styles.listHeader}>
                                        <Text style={styles.listHeaderTitle}>
                                            주차장 목록 ({sortedFavoriteParkingLots.length})
                                        </Text>
                                    </View>
                                )}
                            </View>
                        )}
                        backgroundStyle={{
                            backgroundColor: 'white',
                            borderTopLeftRadius: 24,
                            borderTopRightRadius: 24,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: -4 },
                            shadowOpacity: 0.15,
                            shadowRadius: 12,
                        }}
                        onChange={setSheetIndex}
                        animationConfigs={{
                            springConfig: {
                                damping: 15,
                                stiffness: 150,
                                mass: 0.5,
                                overshootClamping: false,
                                restDisplacementThreshold: 0.01,
                                restSpeedThreshold: 0.01,
                            },
                        }}
                        animateOnMount={true}
                    >
                        {selectedParkingLot ? (
                            <ParkingDetailContent parkingLot={selectedParkingLot} onShowDiagram={() => {}} />
                        ) : (
                            <View style={{ padding: 16 }}>
                                <Text>주차장을 선택해주세요</Text>
                            </View>
                        )}
                    </BottomSheet>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
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
    header: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EFF6FF',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 999,
    },
    sortButtonText: {
        color: '#3B82F6',
        fontSize: 15,
        fontWeight: '600',
        marginRight: 4,
    },
    handleIndicator: {
        width: 36,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#CBD5E1',
        alignSelf: 'center',
        marginVertical: 8,
    },
    sheetHeaderContainer: {
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    detailHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 4,
    },
    backButton: {
        padding: 4,
    },
    detailHeaderText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginHorizontal: 16,
    },
    headerIconButton: {
        padding: 4,
    },
    listHeader: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    listHeaderTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 32,
    },
    separator: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginVertical: 8,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#374151',
        marginTop: 16,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 8,
        textAlign: 'center',
    },
});

export default FavoritesScreen;
