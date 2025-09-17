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
      final response = await _dio.post(
        '${ApiConfig.authEndpoint}/login',
        data: {
          'email': email,
          'password': password,
        },
      );

      if (response.statusCode == 200) {
        final data = response.data;
        _token = data['token'];

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
      if (e.response != null) {
        return {
          'success': false,
          'message': e.response?.data['message'] ?? '로그인 실패',
        };
      }
      return {
        'success': false,
        'message': '서버 연결 실패',
      };
    } catch (e) {
      return {
        'success': false,
        'message': '알 수 없는 오류가 발생했습니다',
      };
    }
  }

  Future<Map<String, dynamic>> signup(User user) async {
    try {
      final response = await _dio.post(
        '${ApiConfig.authEndpoint}/signup',
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
        'message': response.data['message'] ?? '회원가입 실패',
      };
    } on DioException catch (e) {
      if (e.response != null) {
        return {
          'success': false,
          'message': e.response?.data['message'] ?? '회원가입 실패',
        };
      }
      return {
        'success': false,
        'message': '서버 연결 실패',
      };
    } catch (e) {
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

      // JWT에서 사용자 정보 추출
      _currentUser = User(
        userId: decodedToken['userId'],
        email: decodedToken['email'] ?? '',
        name: decodedToken['name'] ?? '',
        phoneNumber: decodedToken['phoneNumber'] ?? '',
        carNumber: decodedToken['carNumber'],
      );
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