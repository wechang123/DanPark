import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ParkingLot } from '../types';

// Mock Data is defined here as the source of truth
// 단국대학교 죽전캠퍼스 주차장 위치 (카카오맵 API로 검색한 정확한 좌표)
const MOCK_PARKING_LOTS: ParkingLot[] = [
    {
        id: '1',
        name: '법학관 주차장',
        address: '단국대학교 법학관',
        latitude: 37.321381,
        longitude: 127.129916,
        totalSpaces: 90,
        currentParked: 40,
        congestionLevel: '보통',
        distance: 120,
        isFavorite: false,
        isParking: false,
        parkingSpotNumber: '15',
    },
    {
        id: '2',
        name: '주차빌딩',
        address: '단국대학교 주차빌딩',
        latitude: 37.320306,
        longitude: 127.125004,
        totalSpaces: 150,
        currentParked: 150,
        congestionLevel: '만차',
        distance: 180,
        isFavorite: true,
        isParking: true,
        parkingSpotNumber: '45',
    },
    {
        id: '3',
        name: '글로컬 주차장',
        address: '단국대학교 글로컬관',
        latitude: 37.321712,
        longitude: 127.124149,
        totalSpaces: 60,
        currentParked: 20,
        congestionLevel: '여유',
        distance: 200,
        isFavorite: false,
    },
    {
        id: '4',
        name: '소프트웨어ICT 주차장',
        address: '단국대학교 소프트웨어ICT관',
        latitude: 37.322852,
        longitude: 127.126895,
        totalSpaces: 80,
        currentParked: 45,
        congestionLevel: '보통',
        distance: 140,
        isFavorite: false,
    },
    {
        id: '5',
        name: '실험동 주차장',
        address: '단국대학교 실험동',
        latitude: 37.319663,
        longitude: 127.126010,
        totalSpaces: 70,
        currentParked: 35,
        congestionLevel: '보통',
        distance: 260,
        isFavorite: false,
    },
    {
        id: '6',
        name: '인상사 주차장',
        address: '단국대학교 인상사',
        latitude: 37.322003,
        longitude: 127.128496,
        totalSpaces: 40,
        currentParked: 30,
        congestionLevel: '보통',
        distance: 280,
        isFavorite: false,
    },
    {
        id: '7',
        name: '체육관 주차장',
        address: '단국대학교 체육관',
        latitude: 37.319404,
        longitude: 127.131853,
        totalSpaces: 120,
        currentParked: 95,
        congestionLevel: '혼잡',
        distance: 300,
        isFavorite: false,
    },
    {
        id: '8',
        name: '야외 주차장',
        address: '단국대학교 야외 주차장',
        latitude: 37.323277,
        longitude: 127.127198,
        totalSpaces: 100,
        currentParked: 85,
        congestionLevel: '혼잡',
        distance: 120,
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
