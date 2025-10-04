# 단주차 (DanPark)

단국대학교 주차 공간 탐지 시스템

## 프로젝트 개요

단주차는 YOLOv5 기반의 실시간 주차 공간 탐지 시스템입니다.
캠퍼스 내 주차장의 CCTV 영상을 분석하여 주차 가능 공간을 실시간으로 제공합니다.

## 기술 스택

### Frontend

-   **Framework**: React Native with Expo Router
-   **Language**: TypeScript
-   **Key Libraries**:
    -   React Navigation (화면 라우팅)
    -   Reanimated & Gesture Handler (애니메이션)
    -   Bottom Sheet (UI)
    -   React Native Maps (지도)

### Backend

-   **Framework**: Spring Boot
-   **Language**: Java 17
-   **Database**: MySQL

### AI/ML

-   **Model**: YOLOv5
-   **Framework**: PyTorch
-   **Task**: 차량 감지 및 주차 공간 탐지

## 프로젝트 구조

```
DanPark/
├── app/                    # Expo Router 앱 화면
├── components/             # React 컴포넌트
├── assets/                 # 이미지, 폰트 등 리소스
├── hooks/                  # Custom Hooks
├── context/                # Context API
├── BACKEND/                # Spring Boot 백엔드
├── yolo/                   # YOLOv5 모델 및 학습 코드
│   ├── weights/           # 학습된 모델 파일
│   ├── data/              # 데이터셋 설정
│   └── requirements.txt   # Python 의존성
└── venv/                  # Python 가상환경
```

## 초기 설정

### 1. 저장소 클론

```bash
git clone https://github.com/wechang123/DanPark.git
cd DanPark
```

### 2. iOS 시뮬레이터 설정 및 실행 방법 (JunWon)

#### 필수 요구사항

1. **Xcode 설치**

    - Mac App Store에서 최신 버전의 Xcode 설치
    - Command Line Tools 설치: `xcode-select --install`

2. **iOS 시뮬레이터 설치**
    - Xcode > Preferences > Components에서 원하는 iOS 버전의 시뮬레이터 설치

#### 프로젝트 설정

```bash
# 1. 프로젝트 의존성 설치
npm install

# 2. iOS 관련 의존성 설치
cd ios
pod install
cd ..

# 3. 캐시 초기화와 함께 Expo 개발 서버 실행
npx expo start --clear
```

#### 시뮬레이터 실행 방법

1. Expo 개발 서버가 실행되면 터미널에서 `i` 키를 눌러 iOS 시뮬레이터 실행
2. 또는 `npx expo run:ios` 명령어로 직접 실행

#### 주요 특징과 장점

1. **네이티브 기능 테스트**: 카메라, 위치 서비스 등 실제 디바이스 기능 테스트 가능
2. **디버깅 용이성**:
    - 실시간 콘솔 로그 확인
    - React Native Debugger 연동
    - 네트워크 요청 모니터링
3. **빠른 개발 환경**:
    - Hot Reload 지원
    - 실시간 코드 수정 반영
4. **다양한 디바이스 테스트**:
    - 여러 iOS 버전 테스트 가능
    - 다양한 iPhone/iPad 모델 시뮬레이션

#### 문제 해결

1. **캐시 초기화**: `--clear` 옵션으로 이전 빌드 캐시를 완전히 삭제하고 새로 시작
2. **의존성 문제 해결**: 패키지 충돌이나 캐시 관련 문제를 해결하는데 효과적
3. **메모리 최적화**: 불필요한 캐시를 제거하여 더 깨끗한 개발 환경 제공
4. **디버깅 용이성**: 캐시로 인한 오류를 배제할 수 있어 문제 해결이 쉬움
5. **크로스 플랫폼 지원**: iOS, Android, Web 등 모든 플랫폼에서 사용 가능

### 3. Frontend 설정

```bash
# Node.js 패키지 설치
npm install

# iOS 시뮬레이터 실행 (macOS only)
npm run ios

# Android 에뮬레이터 실행
npm run android

# 개발 서버만 실행
npm start
```

### 4. Backend 설정

```bash
cd BACKEND

# Gradle을 이용한 빌드 및 실행
./gradlew bootRun

# 또는 IDE(IntelliJ, Eclipse)에서 실행
```

**요구사항**: Java 17 이상

### 5. YOLO 모델 설정

```bash
cd yolo

# Python 가상환경 생성 (최초 1회)
python -m venv venv

# 가상환경 활성화
source venv/bin/activate  # macOS/Linux
# 또는
venv\Scripts\activate     # Windows

# 의존성 설치
pip install -r requirements.txt

# 차량 인식 테스트
python detect.py --weights weights/best.pt --source 테스트이미지경로
```

**요구사항**: Python 3.8 이상

## 개발 워크플로우

### 브랜치 전략

```bash
# 1. develop 브랜치에서 최신 코드 받기
git checkout develop
git pull origin develop

# 2. 기능 브랜치 생성
git checkout -b feature/기능명

# 3. 개발 진행 및 커밋
git add .
git commit -m "feat: 기능 설명"

# 4. 원격 저장소에 푸시
git push origin feature/기능명

# 5. GitHub에서 Pull Request 생성
# develop 브랜치로 PR 요청
```

### 브랜치 명명 규칙

-   `feature/기능명`: 새로운 기능 개발
-   `fix/버그명`: 버그 수정
-   `refactor/설명`: 코드 리팩토링
-   `docs/설명`: 문서 작업

### 커밋 메시지 규칙

```
feat: 새로운 기능 추가
fix: 버그 수정
refactor: 코드 리팩토링
docs: 문서 수정
chore: 빌드, 설정 파일 수정
style: 코드 포맷팅
test: 테스트 코드
```

예시:

```bash
git commit -m "feat: 주차장 즐겨찾기 기능 추가"
git commit -m "fix: 지도 마커 표시 오류 수정"
git commit -m "refactor: API 호출 로직 개선"
```

## 의존성 관리

### Frontend (React Native/Expo)

새로운 npm 패키지 설치 시:

```bash
# 패키지 설치 (package.json 자동 업데이트)
npm install 패키지명

# 설치 후 반드시 커밋에 포함
git add package.json package-lock.json
git commit -m "chore: 패키지명 추가"
```

### Backend (Spring Boot)

새로운 Java 의존성 추가 시:

1. `BACKEND/build.gradle` 파일의 `dependencies` 섹션에 추가
2. Gradle 동기화 실행
3. 변경사항 커밋

### YOLO (Python)

새로운 Python 패키지 설치 시:

```bash
# 가상환경 활성화 확인
source venv/bin/activate

# 패키지 설치
pip install 패키지명

# requirements.txt 업데이트
pip freeze > yolo/requirements.txt

# 변경사항 커밋
git add yolo/requirements.txt
git commit -m "chore: 패키지명 추가"
```

## 주요 명령어

### Frontend

```bash
npm start          # Expo 개발 서버 시작
npm run ios        # iOS 시뮬레이터 실행
npm run android    # Android 에뮬레이터 실행
npm run web        # 웹 브라우저에서 실행
npm run lint       # ESLint 실행
```

### Backend

```bash
./gradlew bootRun          # 애플리케이션 실행
./gradlew build            # 빌드
./gradlew test             # 테스트 실행
```

### YOLO

```bash
# 차량 인식
python detect.py --weights weights/best.pt --source 이미지경로

# 모델 학습
python train.py --data data.yaml --weights weights/best.pt --epochs 100

# 모델 검증
python val.py --weights weights/best.pt --data data.yaml
```

## 환경 변수

필요한 환경 변수는 각 서브 프로젝트의 `.env` 파일에 설정:

-   Frontend: `.env` (프로젝트 루트)
-   Backend: `BACKEND/src/main/resources/application.properties`
-   YOLO: 필요시 `yolo/.env`

**주의**: `.env` 파일은 `.gitignore`에 포함되어 있으므로 커밋되지 않습니다.

## 문제 해결

### npm install 실패 시

```bash
# node_modules 삭제 후 재설치
rm -rf node_modules
npm install
```

### iOS 빌드 실패 시

```bash
cd ios
pod install
cd ..
npm run ios
```

### Python 의존성 오류 시

```bash
# 가상환경 재생성
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install -r yolo/requirements.txt
```

## 개발팀

단국대학교 소프트웨어학과

## 라이선스

이 프로젝트는 교육 목적으로 개발되었습니다.
