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

### 2.5️⃣ 환경 테스트 (선택사항, 강력 권장!)
```bash
# Mac/Windows 호환성 및 모델 로드 테스트
python test_environment.py
```
**⚠️ 중요**: 만약 실행이 안 되면, 먼저 이 테스트를 실행해서 문제를 진단하세요!

### 3️⃣ 바로 실행! (1분)

#### 가장 간단한 방법:
```bash
# 상경관 주차장 테스트 (샘플 이미지 포함)
python run_detection.py test_samples/sanggyeonggwan_parking.jpeg

# 웹캠 테스트
python run_detection.py

# 비디오 테스트
python run_detection.py parking.mp4
```

#### 또는 직접 실행:
```bash
# 샘플 이미지로 테스트
python detect.py --weights weights/best.pt --source test_samples/sanggyeonggwan_parking.jpeg

# 웹캠 테스트
python detect.py --weights weights/best.pt --source 0
```

## 📌 중요 파일
- **모델**: `weights/best.pt` (14.6MB, Windows에서 학습된 캠퍼스 전용 모델)
- **실행**: `run_detection.py` (Mac/Windows 자동 인식)
- **샘플**: `test_samples/sanggyeonggwan_parking.jpeg` (상경관 주차장 CCTV 원본)
- **결과**: `runs/detect/` 폴더에 저장됨

## 🆘 문제 해결

### 🔍 먼저 환경 테스트를 실행하세요!
```bash
python test_environment.py
```
이 스크립트가 문제를 자동으로 진단하고 해결 방법을 알려줍니다.

### "Windows에서 학습한 모델이 Mac에서 안 돼요"
**해결책**: 모델을 CPU 모드로 로드하도록 설정되어 있습니다. `test_environment.py`를 실행해서 PyTorch가 제대로 설치되었는지 확인하세요.

```bash
# Mac에서 PyTorch 재설치
pip uninstall torch torchvision
pip install torch torchvision
```

### "모델 파일이 없어요" 또는 "파일 크기가 너무 작아요"
```bash
git lfs install
git lfs pull  # Git LFS로 모델 다운로드
```

### "Mac M1/M2에서 설치가 안 돼요"
```bash
# Mac Apple Silicon 전용
pip install torch torchvision
```

### "Windows GPU에서 사용하고 싶어요"
```bash
# CUDA 11.8 지원
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118
```

### "import 에러가 나요"
```bash
pip install -r requirements.txt --upgrade
```

## 🎯 테스트 이미지
프로젝트에 상경관 주차장 CCTV 샘플 이미지가 포함되어 있습니다:
- `test_samples/sanggyeonggwan_parking.jpeg` - 상경관 주차장 전경
- `test_samples/sanggyeonggwan_parking2.jpeg` - 상경관 주차장 다른 각도

이 이미지들로 모델 성능을 바로 확인할 수 있습니다!

## 📞 문의
문제가 있으면 develop 브랜치에 이슈 등록하세요!

---
**마지막 업데이트**: 2025년 (Windows 11에서 학습, Mac/Windows 테스트 완료)