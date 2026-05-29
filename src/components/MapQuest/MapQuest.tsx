import { useCallback, useEffect, useMemo, useState } from 'react'
import { useGeolocation } from '../../hooks/useGeolocation'
import type { Spot } from '../../lib/spotGeneration'
import { generateSpots } from '../../lib/spotGeneration'
import MapOverlay from './MapOverlay'
import KakaoMapPanel from './KakaoMapPanel'
import {
  MAP_IMAGE_URL,
  SPOT_COUNT,
  SPOT_MAX_DISTANCE_M,
  SPOT_MIN_DISTANCE_M,
  STAMP_RADIUS_M,
} from '../../config'
import './mapQuest.css'

const STORAGE_KEY = 'locathon_quest_state'

type QuestState = {
  origin: { lat: number; lng: number }
  spots: Spot[]
  stampedSpotIds: string[]
}

function loadQuestState(): QuestState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as QuestState
  } catch {
    return null
  }
}

function saveQuestState(state: QuestState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

export default function MapQuest() {
  const geo = useGeolocation()

  const [origin, setOrigin] = useState<{ lat: number; lng: number } | null>(null)
  const [spots, setSpots] = useState<Spot[]>([])
  const [stampedSpotIds, setStampedSpotIds] = useState<string[]>([])
  const [initialized, setInitialized] = useState(false)

  // localStorage에서 불러오기 (최초 1회)
  useEffect(() => {
    const saved = loadQuestState()
    if (saved) {
      setOrigin(saved.origin)
      setSpots(saved.spots)
      setStampedSpotIds(saved.stampedSpotIds)
    }
    setInitialized(true)
  }, [])

  // 저장된 스팟이 없고 GPS가 준비됐을 때만 최초 생성
  useEffect(() => {
    if (!initialized) return
    if (!geo.position) return
    if (spots.length > 0) return

    const newOrigin = { lat: geo.position.lat, lng: geo.position.lng }
    const newSpots = generateSpots(geo.position, SPOT_COUNT, SPOT_MIN_DISTANCE_M, SPOT_MAX_DISTANCE_M)
    setOrigin(newOrigin)
    setSpots(newSpots)
    setStampedSpotIds([])
    saveQuestState({ origin: newOrigin, spots: newSpots, stampedSpotIds: [] })
  }, [initialized, geo.position, spots.length])

  // 스탬프 상태가 바뀌면 저장
  useEffect(() => {
    if (!origin || spots.length === 0) return
    saveQuestState({ origin, spots, stampedSpotIds })
  }, [origin, spots, stampedSpotIds])

  const onStamp = useCallback((spotId: string) => {
    setStampedSpotIds((prev) => (prev.includes(spotId) ? prev : [...prev, spotId]))
  }, [])

  const regenerateSpots = useCallback(() => {
    if (!geo.position) return
    const newOrigin = { lat: geo.position.lat, lng: geo.position.lng }
    const newSpots = generateSpots(geo.position, SPOT_COUNT, SPOT_MIN_DISTANCE_M, SPOT_MAX_DISTANCE_M)
    setOrigin(newOrigin)
    setSpots(newSpots)
    setStampedSpotIds([])
    saveQuestState({ origin: newOrigin, spots: newSpots, stampedSpotIds: [] })
  }, [geo.position])

  const statusText = useMemo(() => {
    if (geo.status === 'requesting') return '위치 요청 중...'
    if (geo.status === 'watching') {
      const accuracy =
        geo.accuracyM !== undefined ? ` (정확도 약 ${Math.round(geo.accuracyM)}m)` : ''
      return `현재 위치 추적 중${accuracy}`
    }
    if (geo.status === 'error') return geo.error ?? '위치 오류'
    return '위치 대기 중'
  }, [geo.accuracyM, geo.error, geo.status])

  return (
    <div className="mapQuestWrap">
      <div className="statusBar">
        <div className="statusItem">{statusText}</div>
        <div className="statusItem">
          스탬프: {stampedSpotIds.length}/{spots.length}
          {origin ? (
            <span>
              {' '}
              (origin: {origin.lat.toFixed(4)}, {origin.lng.toFixed(4)})
            </span>
          ) : null}
        </div>
        <button
          type="button"
          className="regenerateBtn"
          onClick={regenerateSpots}
          disabled={!geo.position}
        >
          스팟 재생성
        </button>
      </div>

      <div className="mapFrame" aria-label="지도 이미지 위 스팟/도장 오버레이">
        <img className="mapImage" src={MAP_IMAGE_URL} alt="map" />
        <MapOverlay
          currentPosition={geo.position}
          spots={spots}
          stampedSpotIds={stampedSpotIds}
          onStamp={onStamp}
          stampRadiusM={STAMP_RADIUS_M}
        />
      </div>

      <KakaoMapPanel
        currentPosition={geo.position}
        accuracyM={geo.accuracyM}
        spots={spots}
      />
    </div>
  )
}
