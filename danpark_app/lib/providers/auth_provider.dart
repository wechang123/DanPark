import 'package:flutter/foundation.dart';
import '../services/auth_service.dart';
import '../models/user_model.dart';

class AuthProvider extends ChangeNotifier {
  final AuthService _authService = AuthService();

  User? _user;
  bool _isLoading = false;
  String? _errorMessage;

  User? get user => _user;
  bool get isLoading => _isLoading;
  bool get isAuthenticated => _authService.isAuthenticated;
  String? get errorMessage => _errorMessage;

  AuthProvider() {
    _init();
  }

  Future<void> _init() async {
    _isLoading = true;
    notifyListeners();

    await _authService.init();
    _user = _authService.currentUser;

    _isLoading = false;
    notifyListeners();
  }

  Future<bool> login(String email, String password) async {
    print('AuthProvider: Starting login for email: $email');
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    final result = await _authService.login(email, password);
    print('AuthProvider: Login result: $result');

    if (result['success']) {
      _user = _authService.currentUser;
      _errorMessage = null;
      _isLoading = false;
      notifyListeners();
      print('AuthProvider: Login successful, user: $_user');
      return true;
    } else {
      _errorMessage = result['message'];
      _isLoading = false;
      notifyListeners();
      print('AuthProvider: Login failed with error: $_errorMessage');
      return false;
    }
  }

  Future<bool> signup(User user) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    final result = await _authService.signup(user);

    if (result['success']) {
      _errorMessage = null;
      _isLoading = false;
      notifyListeners();
      return true;
    } else {
      _errorMessage = result['message'];
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<void> logout() async {
    _isLoading = true;
    notifyListeners();

    await _authService.logout();
    _user = null;
    _errorMessage = null;

    _isLoading = false;
    notifyListeners();
  }

  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }
}