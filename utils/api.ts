import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

// TODO: 실제 백엔드 주소로 변경 필요
const API_BASE_URL = 'http://localhost:8080';

export interface ApiResponse<T> {
  data: T | null;
  error: {
    code: string;
    message: string;
  } | null;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  studentId: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * API 클라이언트 - 자동 토큰 첨부 및 에러 처리
 */
export const apiClient = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const token = await AsyncStorage.getItem('accessToken');

    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data: ApiResponse<T> = await response.json();

    // 401 Unauthorized - 로그아웃 처리
    if (response.status === 401) {
      await AsyncStorage.clear();
      router.replace('/(auth)/login');
      throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
    }

    // API 응답에 error가 있는 경우
    if (data.error) {
      throw new Error(data.error.message);
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * 회원가입 API
 */
export const signup = async (data: SignupRequest): Promise<number> => {
  const response = await apiClient<number>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (response.data === null) {
    throw new Error('회원가입에 실패했습니다.');
  }

  return response.data;
};

/**
 * 로그인 API
 */
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (response.data === null) {
    throw new Error('로그인에 실패했습니다.');
  }

  // 토큰 저장
  await AsyncStorage.setItem('accessToken', response.data.accessToken);
  await AsyncStorage.setItem('refreshToken', response.data.refreshToken);

  return response.data;
};

/**
 * 로그아웃
 */
export const logout = async (): Promise<void> => {
  await AsyncStorage.clear();
  router.replace('/(auth)/login');
};

/**
 * 즐겨찾기 추가
 */
export const addFavorite = async (parkingLotId: string): Promise<void> => {
  await apiClient('/api/favorites', {
    method: 'POST',
    body: JSON.stringify({ parkingLotId }),
  });
};

/**
 * 즐겨찾기 삭제
 */
export const removeFavorite = async (parkingLotId: string): Promise<void> => {
  await apiClient(`/api/favorites/${parkingLotId}`, {
    method: 'DELETE',
  });
};

/**
 * 즐겨찾기 목록 조회
 */
export const getFavorites = async (): Promise<string[]> => {
  const response = await apiClient<string[]>('/api/favorites');
  return response.data || [];
};

/**
 * 사용자 정보 조회
 */
export interface UserInfo {
  id: number;
  email: string;
  name: string;
  studentId: string;
  department?: string;
}

export const getUserInfo = async (): Promise<UserInfo> => {
  const response = await apiClient<UserInfo>('/api/users/me');
  if (response.data === null) {
    throw new Error('사용자 정보를 불러올 수 없습니다.');
  }
  return response.data;
};

/**
 * 사용자 정보 수정
 */
export const updateUserInfo = async (data: Partial<UserInfo>): Promise<UserInfo> => {
  const response = await apiClient<UserInfo>('/api/users/me', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  if (response.data === null) {
    throw new Error('사용자 정보 수정에 실패했습니다.');
  }
  return response.data;
};

/**
 * 설정 조회
 */
export interface AppSettings {
  notifications: boolean;
  location: boolean;
  autoRefresh: boolean;
  theme: 'light' | 'dark';
}

export const getSettings = async (): Promise<AppSettings> => {
  const response = await apiClient<AppSettings>('/api/settings');
  return response.data || {
    notifications: true,
    location: true,
    autoRefresh: false,
    theme: 'light',
  };
};

/**
 * 설정 변경
 */
export const updateSettings = async (settings: Partial<AppSettings>): Promise<void> => {
  await apiClient('/api/settings', {
    method: 'PUT',
    body: JSON.stringify(settings),
  });
};
