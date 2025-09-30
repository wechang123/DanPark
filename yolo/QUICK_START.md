# 🚀 DanPark 차량 인식 - 5분 안에 시작하기

## 협업자 여러분, 이렇게만 하세요! (Mac/Windows 공통)

### 1️⃣ 프로젝트 받기 (1분)
```bash
git clone https://github.com/wechang123/DanPark.git
cd DanPark
git checkout develop
git pull origin develop
cd yolo
```

### 2️⃣ 환경 설정 (2분)
```bash
# Python 3.8+ 필요
pip install torch torchvision
pip install -r requirements.txt
```

### 3️⃣ 바로 실행! (1분)

#### 가장 간단한 방법:
```bash
# 웹캠 테스트
python run_detection.py

# 이미지 테스트
python run_detection.py test.jpg

# 비디오 테스트
python run_detection.py parking.mp4
```

#### 또는 직접 실행:
```bash
python detect.py --weights weights/best.pt --source 0
```

## 📌 중요 파일
- **모델**: `weights/best.pt` (14.6MB, Windows에서 학습된 캠퍼스 전용 모델)
- **실행**: `run_detection.py` (Mac/Windows 자동 인식)
- **결과**: `runs/detect/` 폴더에 저장됨

## 🆘 문제 해결

### "모델 파일이 없어요"
```bash
git lfs pull  # Git LFS로 모델 다운로드
```

### "Mac에서 안 돼요"
```bash
# Mac 전용 설치 (M1/M2)
pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
```

### "Windows에서 안 돼요"
```bash
# Windows 전용 (CUDA 지원)
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118
```

## 🎯 테스트 이미지
프로젝트에 테스트용 이미지가 없다면:
1. 캠퍼스 주차장 사진 사용
2. 또는 웹캠으로 실시간 테스트 (source=0)

## 📞 문의
문제가 있으면 develop 브랜치에 이슈 등록하세요!

---
**마지막 업데이트**: 2025년 (Windows 11에서 학습, Mac/Windows 테스트 완료)