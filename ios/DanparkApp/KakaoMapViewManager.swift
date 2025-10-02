import Foundation
import UIKit
import KakaoMapsSDK_SPM

@objc(KakaoMapViewManager)
class KakaoMapViewManager: RCTViewManager {

  override func view() -> UIView! {
    return KakaoMapView()
  }

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}

class KakaoMapView: UIView {

  // private var mapController: KMController?
  // private var mapView: KakaoMap?

  @objc var initialRegion: NSDictionary = [:] {
    didSet {
      updateRegion()
    }
  }

  @objc var markers: NSArray = [] {
    didSet {
      updateMarkers()
    }
  }

  override init(frame: CGRect) {
    super.init(frame: frame)
    setupMap()
  }

  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  private func setupMap() {
    // TODO: KakaoMap 초기화
    backgroundColor = .lightGray
  }

  override func layoutSubviews() {
    super.layoutSubviews()
    // mapView?.frame = bounds
  }

  private func updateRegion() {
    // TODO: 지도 중심 설정
  }

  private func updateMarkers() {
    // TODO: 마커 추가
  }
}
