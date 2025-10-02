import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { KakaoMapView, Marker as KakaoMarker } from '@react-native-kakao/map';
import BottomSheet, { BottomSheetFlatList, BottomSheetMethods, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ParkingLot, SortOption } from '../types';
import SearchBar from './SearchBar';
import ParkingListItem from './ParkingListItem';
import ParkingDetailContent from './ParkingDetailContent';
import SortFilterModal from './SortFilterModal';
import { useParkingLots } from '../context/ParkingLotContext';
import ParkingLotDiagramModal from './ParkingLotDiagramModal';

// 혼잡도별 마커 색상
const getMarkerColor = (congestionLevel: string): string => {
    switch (congestionLevel) {
        case '여유':
            return '#3B82F6'; // 파란색
        case '보통':
            return '#10B981'; // 초록색
        case '혼잡':
            return '#F59E0B'; // 주황색
        case '만차':
            return '#EF4444'; // 빨간색
        default:
            return '#3B82F6';
    }
};

const MainScreen = () => {
    const insets = useSafeAreaInsets();
    const { parkingLots, toggleFavorite, connectionStatus } = useParkingLots();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState<SortOption>('거리순');
    const [selectedParkingLot, setSelectedParkingLot] = useState<ParkingLot | null>(null);
    const [isSortModalVisible, setSortModalVisible] = useState(false);
    const [isDiagramModalVisible, setDiagramModalVisible] = useState(false);
    const [sheetIndex, setSheetIndex] = useState(0);

    // Sync selectedParkingLot with global state changes
    useEffect(() => {
        if (selectedParkingLot) {
            const updatedLot = parkingLots.find(p => p.id === selectedParkingLot.id);
            if (updatedLot) {
                setSelectedParkingLot(updatedLot);
            }
        }
    }, [parkingLots, selectedParkingLot]);

    const bottomSheetRef = useRef<BottomSheetMethods>(null);

    // Snap points: 0%(손잡이만), 50%(중간), 100%(전체)
    const snapPoints = useMemo(() => ['5%', '50%', '95%'], []);

    const filteredParkingLots = useMemo(
        () => parkingLots.filter(lot => lot.name.toLowerCase().includes(searchQuery.toLowerCase())),
        [parkingLots, searchQuery]
    );

    const sortedParkingLots = useMemo(
        () =>
            [...filteredParkingLots].sort((a, b) => {
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
        [filteredParkingLots, sortOption]
    );

    const handleParkingLotSelect = (parkingLot: ParkingLot) => {
        setSelectedParkingLot(parkingLot);
        // 슬라이딩 패널을 중간 위치(index 1)로 이동
        bottomSheetRef.current?.snapToIndex(1);
    };

    const handleBackToList = () => {
        setSelectedParkingLot(null);
    };

    const handleToggleFavorite = (id: string) => {
        toggleFavorite(id);
    };

    const handleSortChange = (option: SortOption) => {
        setSortOption(option);
        setSortModalVisible(false);
    };

    const renderItem = useCallback(
        ({ item }) => (
            <ParkingListItem
                parkingLot={item}
                onSelect={() => handleParkingLotSelect(item)}
                onToggleFavorite={() => handleToggleFavorite(item.id)}
            />
        ),
        [handleToggleFavorite]
    );

    const renderSheetHeader = () => (
        <View style={styles.sheetHeaderContainer}>
            {selectedParkingLot ? (
                <View style={styles.detailHeader}>
                    <TouchableOpacity onPress={handleBackToList} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#111827" />
                    </TouchableOpacity>
                    <Text style={styles.detailHeaderText}>{selectedParkingLot.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => setDiagramModalVisible(true)} style={styles.headerIconButton}>
                            <Ionicons name="map-outline" size={24} color="#3B82F6" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleToggleFavorite(selectedParkingLot.id)}
                            style={styles.headerIconButton}
                        >
                            <Ionicons
                                name={selectedParkingLot.isFavorite ? 'star' : 'star-outline'}
                                size={24}
                                color={selectedParkingLot.isFavorite ? '#F59E0B' : '#6B7280'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View
                    style={[
                        styles.listHeader,
                        { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
                    ]}
                >
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827' }}>
                        주차장 목록 ({sortedParkingLots.length})
                    </Text>
                    <TouchableOpacity style={styles.sortButton} onPress={() => setSortModalVisible(true)}>
                        <Text style={styles.sortButtonText}>{sortOption}</Text>
                        <Ionicons name="chevron-down" size={16} color="#3B82F6" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );

    const { currentParking, toggleParking } = useParkingLots();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                {/* SSE 연결 상태 표시 */}
                {connectionStatus === 'connected' && (
                    <View style={[styles.connectionStatus, styles.statusConnected, { top: insets.top + 10 }]}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>실시간</Text>
                    </View>
                )}
                {connectionStatus === 'error' && (
                    <View style={[styles.connectionStatus, styles.statusError, { top: insets.top + 10 }]}>
                        <Ionicons name="warning" size={14} color="#EF4444" />
                        <Text style={[styles.statusText, { color: '#EF4444' }]}>연결 끊김</Text>
                    </View>
                )}

                {/* 현재 주차 중인 정보 */}
                {currentParking && (
                    <TouchableOpacity
                        style={[styles.currentParkingInfo, { top: insets.top + 72 + 16 }]}
                        onPress={() => {
                            const parkingLot = parkingLots.find(lot => lot.id === currentParking.id);
                            if (parkingLot) {
                                handleParkingLotSelect(parkingLot);
                            }
                        }}
                    >
                        <View style={styles.currentParkingContent}>
                            <View style={styles.currentParkingLeft}>
                                <View style={styles.currentParkingIcon}>
                                    <Ionicons name="car" size={20} color="#3B82F6" />
                                </View>
                                <View style={styles.currentParkingTexts}>
                                    <Text style={styles.currentParkingTitle}>{currentParking.name}</Text>
                                    <Text style={styles.currentParkingSpot}>
                                        #{currentParking.parkingSpotNumber}번 자리
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.returnButton}
                                onPress={e => {
                                    e.stopPropagation(); // 상위 TouchableOpacity의 onPress가 실행되지 않도록 함
                                    toggleParking(currentParking.id, null);
                                }}
                            >
                                <Text style={styles.returnButtonText}>반납</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}

                {/* 지도 (카카오맵) */}
                <KakaoMapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.32190,
                        longitude: 127.12663,
                        zoomLevel: 15,
                    }}
                    showsUserLocation={true}
                >
                    {filteredParkingLots.map((lot) => (
                        <KakaoMarker
                            key={lot.id}
                            coordinate={{
                                latitude: lot.latitude,
                                longitude: lot.longitude,
                            }}
                            onPress={() => handleParkingLotSelect(lot)}
                            color={getMarkerColor(lot.congestionLevel)}
                        />
                    ))}
                </KakaoMapView>

                {/* 상단 고정 검색창 - 항상 표시 */}
                <View style={[styles.searchContainer, { top: insets.top + 8, zIndex: 1 }]} pointerEvents="box-none">
                    <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
                </View>

                <BottomSheet
                    ref={bottomSheetRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={setSheetIndex}
                    enablePanDownToClose={false}
                    enableOverDrag={true}
                    enableContentPanningGesture={false}
                    enableHandlePanningGesture={true}
                    topInset={insets.top + 64}
                    bottomInset={0}
                    style={{ marginBottom: 0 }}
                    handleIndicatorStyle={styles.handleIndicator}
                    android_keyboardInputMode="adjustResize"
                    keyboardBehavior="extend"
                    keyboardBlurBehavior="restore"
                    backgroundStyle={{
                        backgroundColor: 'white',
                        borderTopLeftRadius: 24,
                        borderTopRightRadius: 24,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: -4 },
                        shadowOpacity: 0.15,
                        shadowRadius: 12,
                    }}
                    enableHandlePanningGesture={true}
                    animationConfigs={{
                        springConfig: {
                            damping: 18,
                            stiffness: 260,
                            mass: 0.9,
                            overshootClamping: false,
                            restDisplacementThreshold: 0.1,
                            restSpeedThreshold: 0.1,
                        },
                    }}
                    handleComponent={() => (
                        <View
                            style={[
                                styles.sheetHeaderContainer,
                                sheetIndex === 0 && { borderBottomWidth: 0, paddingBottom: 0 },
                            ]}
                        >
                            <View style={styles.handleIndicator} />
                            {sheetIndex !== 0 && renderSheetHeader()}
                        </View>
                    )}
                >
                    {selectedParkingLot ? (
                        <BottomSheetScrollView
                            contentContainerStyle={[styles.listContainer, { paddingBottom: insets.bottom + 80 }]}
                            showsVerticalScrollIndicator={false}
                            bounces={true}
                            alwaysBounceVertical={true}
                            decelerationRate="normal"
                            onScrollBeginDrag={() => {}}
                            onMomentumScrollEnd={() => {}}
                        >
                            <ParkingDetailContent
                                parkingLot={selectedParkingLot}
                                onShowDiagram={() => setDiagramModalVisible(true)}
                            />
                        </BottomSheetScrollView>
                    ) : (
                        <BottomSheetFlatList
                            data={sortedParkingLots}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                            contentContainerStyle={[styles.listContainer, { paddingBottom: insets.bottom + 80 }]}
                            bounces={true}
                            alwaysBounceVertical={true}
                            decelerationRate="normal"
                            showsVerticalScrollIndicator={false}
                            onScrollBeginDrag={() => {}}
                            onMomentumScrollEnd={() => {}}
                        />
                    )}
                </BottomSheet>

                {/* 우측 하단 내 위치 버튼 (조건부 표시) */}
                {sheetIndex === 0 && (
                    <TouchableOpacity style={[styles.fab, { bottom: 96 + insets.bottom }]}>
                        <Ionicons name="locate" size={22} color="#1F2937" />
                    </TouchableOpacity>
                )}
                {sheetIndex === 1 && (
                    <TouchableOpacity style={[styles.fab, { bottom: '52%' }]}>
                        <Ionicons name="locate" size={22} color="#1F2937" />
                    </TouchableOpacity>
                )}

                <SortFilterModal
                    visible={isSortModalVisible}
                    currentSort={sortOption}
                    onClose={() => setSortModalVisible(false)}
                    onSortChange={handleSortChange}
                />

                {selectedParkingLot && (
                    <ParkingLotDiagramModal
                        visible={isDiagramModalVisible}
                        parkingLot={selectedParkingLot}
                        onClose={() => setDiagramModalVisible(false)}
                    />
                )}
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    currentParkingInfo: {
        position: 'absolute',
        left: 16,
        right: 16,
        zIndex: 1,
        backgroundColor: 'white',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    currentParkingContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    currentParkingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    currentParkingIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    currentParkingTexts: {
        marginLeft: 12,
        flex: 1,
    },
    currentParkingTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    currentParkingSpot: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 2,
    },
    returnButton: {
        backgroundColor: '#EF4444',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        marginLeft: 16,
    },
    returnButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    container: { flex: 1, backgroundColor: '#fff' },
    map: { ...StyleSheet.absoluteFillObject },
    searchContainer: {
        position: 'absolute',
        top: 12,
        left: 12,
        right: 12,
    },
    listContainer: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 160 },
    handleIndicator: {
        width: 36,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#CBD5E1',
        alignSelf: 'center',
        marginVertical: 8,
    },
    sheetHeaderContainer: { paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
    listHeader: { paddingHorizontal: 16, paddingTop: 8 },
    detailHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 4,
    },
    backButton: { padding: 4 },
    detailHeaderText: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '600' },
    headerIconButton: { padding: 4, marginLeft: 8 },
    connectionStatus: {
        position: 'absolute',
        right: 16,
        zIndex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    statusConnected: {
        backgroundColor: '#ECFDF5',
    },
    statusError: {
        backgroundColor: '#FEE2E2',
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#10B981',
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#10B981',
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginTop: 12,
        backgroundColor: '#EFF6FF',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 999,
    },
    sortButtonText: {
        color: '#3B82F6',
        fontWeight: '600',
        marginRight: 4,
    },
    fab: {
        position: 'absolute',
        right: 16,
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 24,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },
});

export default MainScreen;
