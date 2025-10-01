import 'package:dio/dio.dart';
import '../services/auth_service.dart';

class AuthInterceptor extends Interceptor {
  final AuthService _authService = AuthService();

  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    // Add auth token to all requests
    final token = _authService.token;
    if (token != null) {
      options.headers['Authorization'] = 'Bearer $token';
    }
    super.onRequest(options, handler);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) async {
    if (err.response?.statusCode == 401) {
      // Token might be expired, try to refresh
      final refreshed = await _authService.refreshToken();

      if (refreshed) {
        // Retry the request with new token
        try {
          final options = err.requestOptions;
          final token = _authService.token;
          if (token != null) {
            options.headers['Authorization'] = 'Bearer $token';
          }

          final response = await Dio().fetch(options);
          return handler.resolve(response);
        } catch (e) {
          return handler.next(err);
        }
      } else {
        // Refresh failed, clear session and redirect to login
        await _authService.clearSession();
        // TODO: Navigate to login screen
      }
    }
    super.onError(err, handler);
  }
}