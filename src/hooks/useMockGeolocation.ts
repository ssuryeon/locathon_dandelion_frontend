import { useEffect, useState } from 'react'
import type { UseGeolocationState } from './useGeolocation'

// 맵 위 스팟을 왼쪽(경애공방)→오른쪽(막걸리 계보) 순으로 1초마다 이동
const SPOTS = [
  { lat: 37.280480, lng: 127.014690 }, // 경애공방
  { lat: 37.279913, lng: 127.014976 }, // 영화당
  { lat: 37.279444, lng: 127.014911 }, // 스튜디오 로티니
  { lat: 37.278941, lng: 127.015264 }, // 카페 레퓨즈
  { lat: 37.278078, lng: 127.015766 }, // 막걸리 계보
]
const STEP_MS = 1000

export function useMockGeolocation(enabled = true): UseGeolocationState {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!enabled || step >= SPOTS.length - 1) return
    const id = setTimeout(() => setStep((s) => s + 1), STEP_MS)
    return () => clearTimeout(id)
  }, [step, enabled])

  return {
    status: 'watching',
    position: SPOTS[step],
    accuracyM: 5,
    updatedAtMs: Date.now(),
  }
}
