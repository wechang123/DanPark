import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import '../config/api_config.dart';
import '../models/user_model.dart';

class AuthService {
  static final AuthService _instance = AuthService._internal();
  factory AuthService() => _instance;
  AuthService._internal();

  final Dio _dio = Dio(BaseOptions(
    baseUrl: ApiConfig.baseUrl,
    connectTimeout: ApiConfig.connectionTimeout,
    receiveTimeout: ApiConfig.receiveTimeout,
    headers: {'Content-Type': 'application/json'},
  ));

  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  static const String _tokenKey = 'jwt_token';
  static const String _userKey = 'user_info';

  String? _token;
  User? _currentUser;

  String? get token => _token;
  User? get currentUser => _currentUser;
  bool get isAuthenticated => _token != null && !JwtDecoder.isExpired(_token!);

  Future<void> init() async {
    _token = await _storage.read(key: _tokenKey);
    if (_token != null && !JwtDecoder.isExpired(_token!)) {
      // Token is valid, decode user info
      await _loadUserFromToken();
    } else {
      // Token is expired or doesn't exist
      await clearSession();
    }
  }

  Future<Map<String, dynamic>> login(String email, String password) async {
    try {
      print('AuthService: Attempting login to ${ApiConfig.baseUrl}/auth/login');
      print('AuthService: Email: $email');

      final response = await _dio.post(
        '/auth/login', // SecurityConfig에 맞춤
        data: {
          'email': email,
          'password': password,
        },
      );

      print('AuthService: Response status: ${response.statusCode}');
      print('AuthService: Response data: ${response.data}');

      if (response.statusCode == 200) {
        final responseData = response.data;

        // 백엔드 응답 형식에 맞게 수정
        if (responseData['data'] != null && responseData['data']['accessToken'] != null) {
          _token = responseData['data']['accessToken'];
        } else if (responseData['token'] != null) {
          _token = responseData['token'];
        } else {
          throw Exception('Token not found in response');
        }

        // Save token
        await _storage.write(key: _tokenKey, value: _token);

        // Decode and save user info
        await _loadUserFromToken();

        return {
          'success': true,
          'message': '로그인 성공',
          'user': _currentUser?.toJson(),
        };
      }

      return {
        'success': false,
        'message': response.data['message'] ?? '로그인 실패',
      };
    } on DioException catch (e) {
      print('AuthService: DioException - ${e.type}');
      print('AuthService: Error message: ${e.message}');
      print('AuthService: Error response: ${e.response?.data}');

      if (e.response != null) {
        return {
          'success': false,
          'message': e.response?.data['message'] ?? '로그인 실패',
        };
      }
      return {
        'success': false,
        'message': '서버 연결 실패: ${e.message}',
      };
    } catch (e) {
      print('AuthService: Unexpected error: $e');
      return {
        'success': false,
        'message': '알 수 없는 오류가 발생했습니다',
      };
    }
  }

  Future<Map<String, dynamic>> signup(User user) async {
    try {
      final response = await _dio.post(
        '/users/register', // SecurityConfig에 맞춤
        data: user.toSignupJson(),
      );

      if (response.statusCode == 201 || response.statusCode == 200) {
        return {
          'success': true,
          'message': '회원가입 성공',
        };
      }

      return {
        'success': false,
        'message': response.data is Map ? response.data['message'] ?? '회원가입 실패' : '회원가입 실패',
      };
    } on DioException catch (e) {
      print('Signup error: ${e.response?.statusCode} - ${e.response?.data}');

      if (e.response != null) {
        final data = e.response?.data;
        String message = '회원가입 실패';

        if (data is Map && data['message'] != null) {
          message = data['message'].toString();
        } else if (data is String) {
          message = data;
        }

        return {
          'success': false,
          'message': message,
        };
      }
      return {
        'success': false,
        'message': '서버 연결 실패',
      };
    } catch (e) {
      print('Unexpected error: $e');
      return {
        'success': false,
        'message': '알 수 없는 오류가 발생했습니다',
      };
    }
  }

  Future<void> logout() async {
    await clearSession();
  }

  Future<void> clearSession() async {
    _token = null;
    _currentUser = null;
    await _storage.delete(key: _tokenKey);
    await _storage.delete(key: _userKey);
  }

  Future<void> _loadUserFromToken() async {
    if (_token == null) return;

    try {
      final decodedToken = JwtDecoder.decode(_token!);
      print('Decoded token: $decodedToken');

      // JWT에서 사용자 정보 추출 - 백엔드에서는 sub에 userId를 저장
      _currentUser = User(
        userId: int.tryParse(decodedToken['sub']?.toString() ?? ''),
        email: decodedToken['email'] ?? '',
        name: decodedToken['name'] ?? '',
        phoneNumber: decodedToken['phoneNumber'] ?? '',
        carNumber: decodedToken['carNumber'],
      );

      // 토큰에 사용자 정보가 없으면 임시로 생성
      if (_currentUser?.email?.isEmpty ?? true) {
        _currentUser = User(
          userId: int.tryParse(decodedToken['sub']?.toString() ?? ''),
          email: 'user@example.com',
          name: '사용자',
          phoneNumber: '',
        );
      }

      print('Current user set: $_currentUser');
    } catch (e) {
      print('Failed to decode token: $e');
      await clearSession();
    }
  }

  // API 호출시 헤더에 토큰 추가
  Map<String, String> getAuthHeaders() {
    if (_token != null) {
      return {
        'Authorization': 'Bearer $_token',
        'Content-Type': 'application/json',
      };
    }
    return {'Content-Type': 'application/json'};
  }

  // 토큰 갱신
  Future<bool> refreshToken() async {
    try {
      final response = await _dio.post(
        '${ApiConfig.authEndpoint}/refresh',
        options: Options(headers: getAuthHeaders()),
      );

      if (response.statusCode == 200) {
        _token = response.data['token'];
        await _storage.write(key: _tokenKey, value: _token);
        return true;
      }
      return false;
    } catch (e) {
      print('Failed to refresh token: $e');
      return false;
    }
  }
}