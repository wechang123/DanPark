import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ParkingLot } from '../types';

// Mock Data is defined here as the source of truth
// 좌표는 캠퍼스 중심(대략 37.3218, 127.1273) 근처 임의값입니다.
// 일부 주차장에 주차된 자리 목업 데이터 추가
const MOCK_PARKING_LOTS: ParkingLot[] = [
    {
        id: '1',
        name: '법학관 주차장',
        address: '단국대학교 법학관',
        latitude: 37.3224,
        longitude: 127.1269,
        totalSpaces: 90,
        currentParked: 40,
        congestionLevel: '보통',
        distance: 120,
        isFavorite: false,
        isParking: false,
        parkingSpotNumber: '15', // 목업: 15번 자리 주차됨
    },
    {
        id: '2',
        name: '야외 주차장',
        address: '단국대학교 야외 주차장',
        latitude: 37.3229,
        longitude: 127.1281,
        totalSpaces: 100,
        currentParked: 85,
        congestionLevel: '혼잡',
        distance: 120,
        isFavorite: false,
    },
    {
        id: '3',
        name: '글로컬 주차장',
        address: '단국대학교 글로컬관',
        latitude: 37.3219,
        longitude: 127.1292,
        totalSpaces: 60,
        currentParked: 20,
        congestionLevel: '여유',
        distance: 200,
        isFavorite: false,
    },
    {
        id: '4',
        name: '주차빌딩',
        address: '단국대학교 주차빌딩',
        latitude: 37.3211,
        longitude: 127.1264,
        totalSpaces: 150,
        currentParked: 150,
        congestionLevel: '만차',
        distance: 180,
        isFavorite: true,
        isParking: true,
        parkingSpotNumber: '45', // 목업: 45번 자리 주차됨
    },
    {
        id: '5',
        name: '소프트웨어ICT 주차장',
        address: '단국대학교 소프트웨어ICT관',
        latitude: 37.3226,
        longitude: 127.1275,
        totalSpaces: 80,
        currentParked: 45,
        congestionLevel: '보통',
        distance: 140,
        isFavorite: false,
    },
    {
        id: '6',
        name: '실험동 주차장',
        address: '단국대학교 실험동',
        latitude: 37.3208,
        longitude: 127.1286,
        totalSpaces: 70,
        currentParked: 35,
        congestionLevel: '보통',
        distance: 260,
        isFavorite: false,
    },
    {
        id: '7',
        name: '박물관 주차장',
        address: '단국대학교 박물관',
        latitude: 37.3231,
        longitude: 127.1271,
        totalSpaces: 60,
        currentParked: 10,
        congestionLevel: '여유',
        distance: 220,
        isFavorite: false,
    },
    {
        id: '8',
        name: '체육관 주차장',
        address: '단국대학교 체육관',
        latitude: 37.3205,
        longitude: 127.1258,
        totalSpaces: 120,
        currentParked: 95,
        congestionLevel: '혼잡',
        distance: 300,
        isFavorite: false,
    },
    {
        id: '9',
        name: '인상사 주차장',
        address: '단국대학교 인상사',
        latitude: 37.3217,
        longitude: 127.1255,
        totalSpaces: 40,
        currentParked: 30,
        congestionLevel: '보통',
        distance: 280,
        isFavorite: false,
    },
    {
        id: '10',
        name: '기숙사 주차장',
        address: '단국대학교 기숙사',
        latitude: 37.324,
        longitude: 127.1284,
        totalSpaces: 110,
        currentParked: 20,
        congestionLevel: '여유',
        distance: 350,
        isFavorite: false,
    },
];

interface ParkingLotContextType {
    parkingLots: ParkingLot[];
    toggleFavorite: (id: string) => void;
    toggleParking: (id: string, spotNumber: string | null) => void;
    currentParking: ParkingLot | null;
}

const ParkingLotContext = createContext<ParkingLotContextType | undefined>(undefined);

export const ParkingLotProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [parkingLots, setParkingLots] = useState<ParkingLot[]>(MOCK_PARKING_LOTS);
    const [currentParking, setCurrentParking] = useState<ParkingLot | null>(null);

    const toggleFavorite = (id: string) => {
        setParkingLots(prevLots =>
            prevLots.map(lot => (lot.id === id ? { ...lot, isFavorite: !lot.isFavorite } : lot))
        );
    };

    const toggleParking = (id: string, spotNumber: string | null) => {
        setParkingLots(prevLots =>
            prevLots.map(lot => {
                if (lot.id === id) {
                    // 주차 시작
                    if (spotNumber) {
                        const updatedLot = {
                            ...lot,
                            isParking: true,
                            parkingSpotNumber: spotNumber,
                            parkingStartTime: new Date().toISOString(),
                        };
                        setCurrentParking(updatedLot);
                        return updatedLot;
                    }
                    // 주차 반납
                    else {
                        setCurrentParking(null);
                        return {
                            ...lot,
                            isParking: false,
                            parkingSpotNumber: undefined,
                            parkingStartTime: undefined,
                        };
                    }
                }
                return lot;
            })
        );
    };

    return (
        <ParkingLotContext.Provider value={{ parkingLots, toggleFavorite, toggleParking, currentParking }}>
            {children}
        </ParkingLotContext.Provider>
    );
};

export const useParkingLots = () => {
    const context = useContext(ParkingLotContext);
    if (context === undefined) {
        throw new Error('useParkingLots must be used within a ParkingLotProvider');
    }
    return context;
};
