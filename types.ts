export interface ParkingLot {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    totalSpaces: number;
    currentParked: number;
    congestionLevel: '여유' | '보통' | '혼잡' | '만차';
    distance: number; // in meters
    isFavorite: boolean;
    isParking?: boolean; // 현재 주차 중인지 여부
    parkingStartTime?: string; // 주차 시작 시간
    parkingSpotNumber?: string; // 주차 공간 번호
}

export type SortOption = '거리순' | '혼잡도순' | '빈자리순' | '이름순';
