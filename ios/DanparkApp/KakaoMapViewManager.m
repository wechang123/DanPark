#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(KakaoMapViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(initialRegion, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(markers, NSArray)

@end
