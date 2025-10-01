# YOLOv5 캠퍼스 차량 인식 모델

## 🚀 빠른 시작 (Quick Start)

### 1. 프로젝트 클론
```bash
git clone -b develop https://github.com/wechang123/DanPark.git
cd DanPark/yolo
```

### 2. 의존성 설치
```bash
pip install -r requirements.txt
```

### 3. 차량 인식 테스트 실행

#### 이미지 테스트
```bash
# 단일 이미지
python detect.py --weights weights/campus_best.pt --source test.jpg

# 여러 이미지 (폴더)
python detect.py --weights weights/campus_best.pt --source images/
```

#### 비디오 테스트
```bash
python detect.py --weights weights/campus_best.pt --source video.mp4
```

#### 웹캠 테스트
```bash
python detect.py --weights weights/campus_best.pt --source 0
```

## 📊 결과 확인
- 인식 결과는 `runs/detect/` 폴더에 저장됩니다
- 각 실행마다 새로운 폴더가 생성됩니다 (exp, exp2, exp3...)

## 🎯 옵션 설정

### 신뢰도 조정
```bash
python detect.py --weights weights/campus_best.pt --source test.jpg --conf-thres 0.5
```

### 결과 저장 없이 보기만
```bash
python detect.py --weights weights/campus_best.pt --source test.jpg --view-img --nosave
```

### 특정 클래스만 검출
```bash
# 예: 자동차(2), 버스(5)만 검출
python detect.py --weights weights/campus_best.pt --source test.jpg --classes 2 5
```

## 💻 시스템 요구사항
- Python 3.8+
- Windows, macOS, Linux 모두 지원
- GPU 권장 (없어도 CPU로 실행 가능)

## 📝 주의사항
- 첫 실행시 Git LFS로 모델 파일(15MB)이 다운로드됩니다
- GPU가 없는 경우 자동으로 CPU 모드로 실행됩니다