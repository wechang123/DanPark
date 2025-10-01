#!/usr/bin/env python3
"""
DanPark 차량 인식 시스템
맥/윈도우 공통 실행 스크립트
"""

import os
import sys
import platform
import torch
from pathlib import Path

def main():
    print("="*50)
    print("🚗 DanPark 캠퍼스 차량 인식 시스템")
    print(f"💻 OS: {platform.system()} ({platform.platform()})")
    print(f"🐍 Python: {sys.version.split()[0]}")
    print(f"🔥 PyTorch: {torch.__version__}")
    print(f"🎯 GPU: {'사용 가능' if torch.cuda.is_available() else 'CPU 모드'}")
    print("="*50)

    # 모델 경로 (학습된 best.pt 사용)
    model_path = Path(__file__).parent / 'weights' / 'best.pt'

    if not model_path.exists():
        print("❌ 모델 파일이 없습니다!")
        print("💡 해결방법:")
        print("   1. git lfs pull (Git LFS로 모델 다운로드)")
        print("   2. 또는 수동으로 weights/best.pt 파일 확인")
        return

    # 입력 소스 결정
    if len(sys.argv) > 1:
        source = sys.argv[1]
    else:
        print("\n📸 사용법:")
        print("   python run_detection.py [이미지/비디오 경로]")
        print("   python run_detection.py 0  (웹캠)")
        print("\n테스트용 웹캠을 실행합니다...")
        source = '0'  # 웹캠

    # detect.py 실행
    detect_script = Path(__file__).parent / 'detect.py'

    # 실행 명령 구성
    cmd = f'"{sys.executable}" "{detect_script}" --weights "{model_path}" --source "{source}" --conf-thres 0.5'

    # 맥에서는 --view-img 추가 (GUI 지원시)
    if platform.system() == 'Darwin':
        cmd += ' --view-img'

    print(f"\n🚀 실행 명령: {cmd}\n")
    os.system(cmd)

    print("\n✅ 실행 완료!")
    print(f"📁 결과는 runs/detect/ 폴더를 확인하세요")

if __name__ == "__main__":
    main()