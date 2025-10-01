#!/usr/bin/env python3
"""
DanPark 환경 테스트 스크립트
Mac/Windows 호환성 및 모델 로드 테스트
실행: python test_environment.py
"""

import sys
import platform
from pathlib import Path

def print_section(title):
    print("\n" + "="*60)
    print(f"  {title}")
    print("="*60)

def test_python_version():
    """Python 버전 확인"""
    print_section("1. Python 버전 확인")
    version = sys.version_info
    print(f"Python 버전: {version.major}.{version.minor}.{version.micro}")

    if version.major == 3 and version.minor >= 8:
        print("[OK] Python 버전 OK (3.8 이상)")
        return True
    else:
        print("[FAIL] Python 3.8 이상이 필요합니다!")
        return False

def test_pytorch():
    """PyTorch 설치 및 버전 확인"""
    print_section("2. PyTorch 확인")
    try:
        import torch
        print(f"PyTorch 버전: {torch.__version__}")
        print(f"CUDA 사용 가능: {torch.cuda.is_available()}")
        if torch.cuda.is_available():
            print(f"CUDA 버전: {torch.version.cuda}")
        else:
            print("CPU 모드로 실행됩니다")
        print("[OK] PyTorch 설치 OK")
        return True
    except ImportError:
        print("[FAIL] PyTorch가 설치되지 않았습니다!")
        print("\n해결 방법:")
        if platform.system() == "Darwin":  # Mac
            print("  pip install torch torchvision")
        else:  # Windows/Linux
            print("  pip install torch torchvision")
        return False

def test_dependencies():
    """필수 의존성 확인"""
    print_section("3. 필수 라이브러리 확인")

    required = ['cv2', 'numpy', 'PIL', 'yaml', 'tqdm']
    missing = []

    for lib in required:
        try:
            __import__(lib)
            print(f"[OK] {lib}")
        except ImportError:
            print(f"[FAIL] {lib} 없음")
            missing.append(lib)

    if missing:
        print(f"\n[FAIL] 누락된 라이브러리: {', '.join(missing)}")
        print("해결 방법: pip install -r requirements.txt")
        return False

    print("\n[OK] 모든 필수 라이브러리 설치됨")
    return True

def test_model_file():
    """모델 파일 존재 확인"""
    print_section("4. 모델 파일 확인")

    model_path = Path(__file__).parent / 'weights' / 'best.pt'

    if model_path.exists():
        size_mb = model_path.stat().st_size / (1024 * 1024)
        print(f"[OK] 모델 파일 존재: {model_path}")
        print(f"   파일 크기: {size_mb:.2f} MB")

        if size_mb < 1:
            print("[WARN] 파일 크기가 너무 작습니다. Git LFS로 다운로드되지 않았을 수 있습니다.")
            print("   해결: git lfs pull")
            return False
        return True
    else:
        print(f"[FAIL] 모델 파일 없음: {model_path}")
        print("\n해결 방법:")
        print("  1. git lfs install")
        print("  2. git lfs pull")
        return False

def test_model_load():
    """실제 모델 로드 테스트"""
    print_section("5. 모델 로드 테스트")

    try:
        import torch
        model_path = Path(__file__).parent / 'weights' / 'best.pt'

        if not model_path.exists():
            print("[FAIL] 모델 파일이 없어 로드 테스트를 건너뜁니다")
            return False

        print("모델 로딩 중...")

        # CPU에서 강제 로드 (Mac/Windows 호환성)
        checkpoint = torch.load(model_path, map_location='cpu')

        print("[OK] 모델 로드 성공!")
        print(f"   훈련 epoch: {checkpoint.get('epoch', 'N/A')}")

        # 모델 구조 확인
        if 'model' in checkpoint:
            print("   모델 구조 확인 OK")

        return True

    except Exception as e:
        print(f"[FAIL] 모델 로드 실패: {e}")
        print("\n가능한 원인:")
        print("  1. PyTorch 버전 불일치")
        print("  2. 손상된 모델 파일")
        print("  3. Git LFS 미다운로드")
        print("\n해결 방법:")
        print("  1. git lfs pull")
        print("  2. pip install --upgrade torch")
        return False

def test_sample_images():
    """테스트 샘플 이미지 확인"""
    print_section("6. 테스트 샘플 이미지 확인")

    samples_dir = Path(__file__).parent / 'test_samples'

    if not samples_dir.exists():
        print("[FAIL] test_samples 폴더가 없습니다")
        return False

    images = list(samples_dir.glob('*.jpeg')) + list(samples_dir.glob('*.jpg'))

    if images:
        print(f"[OK] {len(images)}개의 샘플 이미지 발견:")
        for img in images:
            size_mb = img.stat().st_size / (1024 * 1024)
            print(f"   - {img.name} ({size_mb:.2f} MB)")
        return True
    else:
        print("[WARN] 샘플 이미지가 없습니다")
        print("   웹캠(source=0)으로 테스트하거나 직접 이미지를 추가하세요")
        return False

def main():
    print("\n" + "DanPark 차량 인식 환경 테스트".center(60))
    print(f"OS: {platform.system()} {platform.release()}".center(60))
    print(f"아키텍처: {platform.machine()}".center(60))

    results = {
        "Python": test_python_version(),
        "PyTorch": test_pytorch(),
        "Dependencies": test_dependencies(),
        "Model File": test_model_file(),
        "Model Load": test_model_load(),
        "Sample Images": test_sample_images(),
    }

    print_section("[REPORT] 최종 결과")

    for name, result in results.items():
        status = "[OK] PASS" if result else "[FAIL] FAIL"
        print(f"{name:20s}: {status}")

    all_critical = results["Python"] and results["PyTorch"] and results["Dependencies"] and results["Model Load"]

    print("\n" + "="*60)
    if all_critical:
        print("[SUCCESS] 모든 필수 테스트 통과! 차량 인식을 실행할 수 있습니다.")
        print("\n다음 명령으로 테스트하세요:")
        print("  python run_detection.py test_samples/sanggyeonggwan_parking.jpeg")
    else:
        print("[WARN] 일부 테스트 실패. 위의 해결 방법을 따라주세요.")
        print("\n문제가 계속되면 develop 브랜치에 이슈를 등록해주세요.")
    print("="*60 + "\n")

if __name__ == "__main__":
    main()