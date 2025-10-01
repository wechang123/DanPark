# 토큰 모델 정의 - 액세스 토큰, 리프레시 토큰, 만료 시간 포함 
class TokenModel {
  final String accessToken;
  final String? refreshToken;
  final DateTime expiresAt;

  TokenModel({
    required this.accessToken,
    this.refreshToken,
    required this.expiresAt,
  });

  factory TokenModel.fromJson(Map<String, dynamic> json) {
    return TokenModel(
      accessToken: json['accessToken'] ?? json['token'] ?? '',
      refreshToken: json['refreshToken'],
      expiresAt: json['expiresAt'] != null
          ? DateTime.parse(json['expiresAt'])
          : DateTime.now().add(const Duration(hours: 1)),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'accessToken': accessToken,
      'refreshToken': refreshToken,
      'expiresAt': expiresAt.toIso8601String(),
    };
  }

  bool get isExpired {
    return DateTime.now().isAfter(expiresAt);
  }

  bool get isValid {
    return accessToken.isNotEmpty && !isExpired;
  }
}