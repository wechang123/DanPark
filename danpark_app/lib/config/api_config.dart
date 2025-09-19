import 'package:flutter_dotenv/flutter_dotenv.dart';

class ApiConfig {
  static String get baseUrl => dotenv.env['BASE_URL'] ?? 'http://localhost:8080';
  static const String authEndpoint = '/api/auth';
  static const String usersEndpoint = '/api/users';
  static const String parkingEndpoint = '/api/parking';

  static Duration get connectionTimeout => Duration(
    milliseconds: int.parse(dotenv.env['API_TIMEOUT'] ?? '30000'),
  );
  static Duration get receiveTimeout => Duration(
    milliseconds: int.parse(dotenv.env['API_TIMEOUT'] ?? '30000'),
  );

  static String get appName => dotenv.env['APP_NAME'] ?? 'DanParking';
  static String get appVersion => dotenv.env['APP_VERSION'] ?? '1.0.0';
}