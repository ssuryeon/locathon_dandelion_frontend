export type LatLng = { lat: number; lng: number }

const EARTH_RADIUS_M = 6371000

const toRad = (deg: number) => (deg * Math.PI) / 180
const toDeg = (rad: number) => (rad * 180) / Math.PI

export function haversineDistanceMeters(a: LatLng, b: LatLng): number {
  const φ1 = toRad(a.lat)
  const φ2 = toRad(b.lat)
  const Δφ = toRad(b.lat - a.lat)
  const Δλ = toRad(b.lng - a.lng)

  const sinΔφ = Math.sin(Δφ / 2)
  const sinΔλ = Math.sin(Δλ / 2)

  const h =
    sinΔφ * sinΔφ + Math.cos(φ1) * Math.cos(φ2) * (sinΔλ * sinΔλ)

  return 2 * EARTH_RADIUS_M * Math.asin(Math.min(1, Math.sqrt(h)))
}

// Returns bearing from `from` to `to`, where 0deg points to North and increases clockwise.
export function bearingDegrees(from: LatLng, to: LatLng): number {
  const φ1 = toRad(from.lat)
  const φ2 = toRad(to.lat)
  const λ1 = toRad(from.lng)
  const λ2 = toRad(to.lng)

  const y = Math.sin(λ2 - λ1) * Math.cos(φ2)
  const x =
    Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1)

  const θ = Math.atan2(y, x)
  const bearing = (toDeg(θ) + 360) % 360
  return bearing
}

export function destinationPoint(from: LatLng, distanceMeters: number, bearingDeg: number): LatLng {
  const δ = distanceMeters / EARTH_RADIUS_M
  const θ = toRad(bearingDeg)

  const φ1 = toRad(from.lat)
  const λ1 = toRad(from.lng)

  const sinφ1 = Math.sin(φ1)
  const cosφ1 = Math.cos(φ1)

  const sinδ = Math.sin(δ)
  const cosδ = Math.cos(δ)

  const φ2 = Math.asin(sinφ1 * cosδ + cosφ1 * sinδ * Math.cos(θ))
  const λ2 =
    λ1 +
    Math.atan2(Math.sin(θ) * sinδ * cosφ1, cosδ - sinφ1 * Math.sin(φ2))

  return {
    lat: toDeg(φ2),
    lng: ((toDeg(λ2) + 540) % 360) - 180, // normalize to [-180, 180]
  }
}

