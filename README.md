# 단주차 (DanPark)

단국대학교 주차 공간 탐지 시스템

## 프로젝트 개요

단주차는 YOLOv5 기반의 실시간 주차 공간 탐지 시스템입니다.
캠퍼스 내 주차장의 CCTV 영상을 분석하여 주차 가능 공간을 실시간으로 제공합니다.

## 프로젝트 구조

```
DanPark/
├── BACKEND/          # Spring Boot 백엔드 서버
├── app/              # Expo Router 앱 구조
├── assets/           # 이미지, 폰트 등 정적 리소스
├── DanPark/          # YOLOv5 모델 및 학습 코드
└── sanggyeonggwan_dataset/  # 학습 데이터셋
```

## 주요 기능

- YOLOv5를 활용한 차량 감지
- 실시간 주차 가능 공간 계산
- Expo 기반 모바일 앱을 통한 주차장 정보 제공
- Spring Boot 기반 백엔드 API

## 기술 스택

- **AI/ML**: YOLOv5, PyTorch
- **Backend**: Spring Boot, Java 17
- **Frontend**: React Native, Expo Router
- **Database**: MySQL

## 설치 및 실행

### 모바일 앱 실행

```bash
npm install
npm run ios  # iOS
npm run android  # Android
```

각 폴더의 README.md를 참고하세요:
- [BACKEND/README.md](BACKEND/README.md) - 백엔드 서버 설치 및 실행
- [DanPark/requirements.txt](DanPark/requirements.txt) - YOLO 모델 의존성

## 개발팀

단국대학교 소프트웨어학과

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
>>>>>>> feature/danpark-ui
