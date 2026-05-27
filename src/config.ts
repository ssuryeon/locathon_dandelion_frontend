import heroMapSvgUrl from './assets/heroMapPlaceholder.svg'
import heroStampSvgUrl from './assets/stampPlaceholder.svg'

export const MAP_IMAGE_URL = heroMapSvgUrl
export const STAMP_IMAGE_URL = heroStampSvgUrl

export const STAMP_RADIUS_M = 50

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

export const OVERLAY_STAMP_SIZE_PX = 80
export const OVERLAY_SPOT_SIZE_PX = 28

