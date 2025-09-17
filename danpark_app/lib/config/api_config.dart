class ApiConfig {
  static const String baseUrl = 'http://localhost:8080';
  static const String authEndpoint = '/api/auth';
  static const String usersEndpoint = '/api/users';
  static const String parkingEndpoint = '/api/parking';

  static const Duration connectionTimeout = Duration(seconds: 30);
  static const Duration receiveTimeout = Duration(seconds: 30);
}