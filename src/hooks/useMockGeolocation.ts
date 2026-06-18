import { useEffect, useState } from 'react'
import { destinationPoint } from '../lib/geo'
import type { UseGeolocationState } from './useGeolocation'

// 카페 레퓨즈 방향으로 300m 남쪽에서 매초 25m씩 접근
// 약 11초 후 30m 이내 진입 → markSpot 트리거
const TARGET = { lat: 37.278941, lng: 127.015264 }
const START_DISTANCE_M = 300
const STEP_M = 25
const INTERVAL_MS = 1000

export function useMockGeolocation(): UseGeolocationState {
  const [distanceM, setDistanceM] = useState(START_DISTANCE_M)

  useEffect(() => {
    const id = setInterval(() => {
      setDistanceM((d) => {
        const next = d - STEP_M
        if (next <= 0) clearInterval(id)
        return Math.max(0, next)
      })
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return {
    status: 'watching',
    position: destinationPoint(TARGET, distanceM, 180), // 남쪽에서 접근
    accuracyM: 5,
    updatedAtMs: Date.now(),
  }
}
