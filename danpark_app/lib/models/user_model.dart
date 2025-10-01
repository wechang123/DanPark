class User {
  final int? userId;
  final String email;
  final String? password;
  final String name;
  final String phoneNumber;
  final String? carNumber;
  final DateTime? createdAt;

  User({
    this.userId,
    required this.email,
    this.password,
    required this.name,
    required this.phoneNumber,
    this.carNumber,
    this.createdAt,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      userId: json['userId'],
      email: json['email'],
      name: json['name'],
      phoneNumber: json['phoneNumber'],
      carNumber: json['carNumber'],
      createdAt: json['createdAt'] != null
        ? DateTime.parse(json['createdAt'])
        : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'userId': userId,
      'email': email,
      'password': password,
      'name': name,
      'phoneNumber': phoneNumber,
      'carNumber': carNumber,
    };
  }

  Map<String, dynamic> toSignupJson() {
    return {
      'email': email,
      'password': password,
      'name': name,
      'phoneNumber': phoneNumber,
      'carNumber': carNumber,
    };
  }
}