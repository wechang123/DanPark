"""
캠퍼스 차량 인식 빠른 테스트 스크립트
사용법: python quick_test.py [이미지/비디오 경로]
"""

import sys
import torch
from pathlib import Path

def test_campus_model():
    """캠퍼스 모델로 차량 인식 테스트"""

    # 모델 로드
    print("🚗 캠퍼스 차량 인식 모델 로딩 중...")
    model = torch.hub.load('.', 'custom', path='weights/campus_best.pt', source='local')

    # 입력 소스 결정
    if len(sys.argv) > 1:
        source = sys.argv[1]
        print(f"📸 입력 소스: {source}")
    else:
        # 테스트 이미지가 없으면 웹캠 사용
        source = 0
        print("📸 웹캠 사용 (이미지 경로를 인자로 전달 가능)")

    # 추론 실행
    print("🔍 인식 중...")
    results = model(source)

    # 결과 출력
    results.print()  # 콘솔에 결과 출력
    results.show()   # 이미지 창에 표시

    # 결과 저장
    save_dir = Path('runs/detect/quick_test')
    save_dir.mkdir(parents=True, exist_ok=True)
    results.save(save_dir=str(save_dir))
    print(f"✅ 결과가 {save_dir}에 저장되었습니다!")

    # 검출된 객체 정보
    detections = results.pandas().xyxy[0]
    if not detections.empty:
        print("\n🎯 검출된 객체:")
        for idx, row in detections.iterrows():
            print(f"  - {row['name']}: 신뢰도 {row['confidence']:.2f}")
    else:
        print("\n❌ 검출된 객체가 없습니다.")

if __name__ == "__main__":
    try:
        test_campus_model()
    except Exception as e:
        print(f"❌ 오류 발생: {e}")
        print("\n💡 도움말:")
        print("  1. requirements.txt 설치 확인: pip install -r requirements.txt")
        print("  2. 모델 파일 존재 확인: weights/campus_best.pt")
        print("  3. 사용법: python quick_test.py [이미지경로]")