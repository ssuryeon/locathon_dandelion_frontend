import type { LatLng } from './geo'
import { destinationPoint } from './geo'

export type Spot = {
  id: string
  position: LatLng
  distanceFromOriginM: number
  bearingDeg: number
}

const toRandomInRange = (min: number, max: number) => min + Math.random() * (max - min)

export function generateSpots(origin: LatLng, count: number, minDistanceM: number, maxDistanceM: number): Spot[] {
  if (!Number.isFinite(origin.lat) || !Number.isFinite(origin.lng)) return []

  const spots: Spot[] = []

  for (let i = 0; i < count; i++) {
    const distanceFromOriginM = toRandomInRange(minDistanceM, maxDistanceM)
    const bearingDeg = toRandomInRange(0, 360)

    const position = destinationPoint(origin, distanceFromOriginM, bearingDeg)

    spots.push({
      id: `spot_${i}_${Math.floor(distanceFromOriginM)}`,
      position,
      distanceFromOriginM,
      bearingDeg,
    })
  }

  return spots
}

