import { bearingDegrees, haversineDistanceMeters, type LatLng } from './geo';
import { MAP_BASE_HEIGHT_PX, MAP_BASE_WIDTH_PX, MAP_BOUNDS, METERS_PER_PIXEL_BASE } from '../config';

export function geoToMapPx(args: {
  containerWidthPx: number
  containerHeightPx: number
  target: LatLng
}): { x: number; y: number } {
  const { containerWidthPx, containerHeightPx, target } = args
  const x = ((target.lat - MAP_BOUNDS.south) / (MAP_BOUNDS.north - MAP_BOUNDS.south)) * containerWidthPx
  const y = ((target.lng - MAP_BOUNDS.west) / (MAP_BOUNDS.east - MAP_BOUNDS.west)) * containerHeightPx
  return { x, y }
}

export function projectToImagePx(args: {
  containerWidthPx: number
  containerHeightPx: number
  current: LatLng
  target: LatLng
}) {
  const { containerWidthPx, containerHeightPx, current, target } = args
  const scaleX = containerWidthPx / MAP_BASE_WIDTH_PX
  const scaleY = containerHeightPx / MAP_BASE_HEIGHT_PX

  const distanceM = haversineDistanceMeters(current, target)
  const bearing = bearingDegrees(current, target)

  // bearing: 0deg is North; convert to screen coords (x: east, y: south)
  const offsetPxBase = distanceM / METERS_PER_PIXEL_BASE
  const theta = (bearing * Math.PI) / 180
  const dxBase = Math.sin(theta) * offsetPxBase
  const dyBase = -Math.cos(theta) * offsetPxBase

  const xBase = MAP_BASE_WIDTH_PX / 2 + dxBase
  const yBase = MAP_BASE_HEIGHT_PX / 2 + dyBase

  return {
    x: xBase * scaleX,
    y: yBase * scaleY,
  }
}