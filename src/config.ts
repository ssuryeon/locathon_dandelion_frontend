import heroMapSvgUrl from './assets/heroMapPlaceholder.svg'
import heroStampSvgUrl from './assets/stampPlaceholder.svg'

export const MAP_IMAGE_URL = heroMapSvgUrl
export const STAMP_IMAGE_URL = heroStampSvgUrl

export const STAMP_RADIUS_M = 30

// Number of spots shown around the current location.
export const SPOT_COUNT = 6

// Spot generation range around the user's current location.
export const SPOT_MIN_DISTANCE_M = 60
export const SPOT_MAX_DISTANCE_M = 450

// Distance -> pixel conversion for the image overlay.
// This is a "visual approximation" because we don't have a real image->geo calibration.
export const METERS_PER_PIXEL_BASE = 1.4

// Base layout size used for overlay coordinate calculations.
export const MAP_BASE_WIDTH_PX = 900
export const MAP_BASE_HEIGHT_PX = 540


// 조정 가이드:
//   spots가 왼쪽 → south 낮추기  |  오른쪽 → south 높이기
//   spots가 위쪽 → west 낮추기   |  아래쪽 → west 높이기
export const MAP_BOUNDS = {
  north: 37.2815,
  south: 37.2770,
  west:  127.0120,
  east:  127.0185,
}

export const OVERLAY_STAMP_SIZE_PX = 80
export const OVERLAY_SPOT_SIZE_PX = 28

