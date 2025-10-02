import { useEffect, useState, useCallback } from 'react';
import EventSource from 'react-native-sse';

const API_BASE_URL = __DEV__
  ? 'http://localhost:8080'
  : 'https://api.danpark.com';

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

export interface ParkingUpdateEvent {
  type: 'PARKING_UPDATE';
  data: {
    id: string;
    totalSpaces: number;
    currentParked: number;
    congestionLevel: '여유' | '보통' | '혼잡' | '만차';
  };
}

interface UseParkingStreamOptions {
  onUpdate?: (event: ParkingUpdateEvent) => void;
  onError?: (error: Error) => void;
  autoReconnect?: boolean;
  reconnectInterval?: number;
}

export const useParkingStream = (options: UseParkingStreamOptions = {}) => {
  const {
    onUpdate,
    onError,
    autoReconnect = true,
    reconnectInterval = 3000,
  } = options;

  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  const connect = useCallback(() => {
    setConnectionStatus('connecting');

    const eventSource = new EventSource(`${API_BASE_URL}/api/parking/stream`, {
      headers: {
        'Accept': 'text/event-stream',
      },
    });

    eventSource.addEventListener('open', () => {
      console.log('[SSE] 연결됨');
      setConnectionStatus('connected');
      setReconnectAttempts(0);
    });

    eventSource.addEventListener('message', (event: any) => {
      try {
        const data: ParkingUpdateEvent = JSON.parse(event.data);
        console.log('[SSE] 메시지 수신:', data);
        onUpdate?.(data);
      } catch (error) {
        console.error('[SSE] 메시지 파싱 오류:', error);
      }
    });

    eventSource.addEventListener('error', (error: any) => {
      console.error('[SSE] 연결 오류:', error);
      setConnectionStatus('error');
      onError?.(error);

      eventSource.close();

      // 자동 재연결
      if (autoReconnect) {
        setReconnectAttempts((prev) => prev + 1);
        setTimeout(() => {
          console.log(`[SSE] 재연결 시도 (${reconnectAttempts + 1}회)`);
          connect();
        }, reconnectInterval);
      }
    });

    return eventSource;
  }, [onUpdate, onError, autoReconnect, reconnectInterval, reconnectAttempts]);

  useEffect(() => {
    const eventSource = connect();

    return () => {
      console.log('[SSE] 연결 종료');
      eventSource.close();
      setConnectionStatus('disconnected');
    };
  }, [connect]);

  return {
    connectionStatus,
    reconnectAttempts,
  };
};
