# 단주차 (DanPark)

단국대학교 주차 공간 탐지 시스템

## 프로젝트 개요

단주차는 YOLOv5 기반의 실시간 주차 공간 탐지 시스템입니다.
캠퍼스 내 주차장의 CCTV 영상을 분석하여 주차 가능 공간을 실시간으로 제공합니다.

## 프로젝트 구조

```
DanPark/
├── BACKEND/          # Spring Boot 백엔드 서버
├── frontend/         # React Native 모바일 앱
├── yolo/             # YOLOv5 모델 및 학습 코드
└── sanggyeonggwan_dataset/  # 학습 데이터셋
```

## 주요 기능

- YOLOv5를 활용한 차량 감지
- 실시간 주차 가능 공간 계산
- 모바일 앱을 통한 주차장 정보 제공
- Spring Boot 기반 백엔드 API

## 기술 스택

- **AI/ML**: YOLOv5, PyTorch
- **Backend**: Spring Boot, Java 17
- **Frontend**: React Native, Expo
- **Database**: MySQL

## 설치 및 실행

각 폴더의 README.md를 참고하세요:
- [BACKEND/README.md](BACKEND/README.md) - 백엔드 서버 설치 및 실행
- [frontend/README.md](frontend/README.md) - 모바일 앱 설치 및 실행
- [yolo/requirements.txt](yolo/requirements.txt) - YOLO 모델 의존성

## 개발팀

단국대학교 소프트웨어학과
