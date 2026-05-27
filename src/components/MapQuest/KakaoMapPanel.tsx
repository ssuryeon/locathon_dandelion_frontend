import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { LatLng } from '../../lib/geo'
import type { Spot } from '../../lib/spotGeneration'

type KakaoMapPanelProps = {
  currentPosition?: LatLng
  accuracyM?: number
  spots: Spot[]
}

type KakaoGlobal = {
  maps: {
    load: (cb: () => void) => void
    LatLng: new (lat: number, lng: number) => unknown
    Map: new (container: HTMLElement, options: Record<string, unknown>) => {
      setCenter: (latlng: unknown) => void
      relayout: () => void
    }
    Marker: new (options: Record<string, unknown>) => {
      setMap: (map: unknown | null) => void
      setPosition: (latlng: unknown) => void
    }
    Circle: new (options: Record<string, unknown>) => {
      setMap: (map: unknown | null) => void
      setPosition: (latlng: unknown) => void
      setRadius: (radius: number) => void
    }
    MarkerImage: new (src: string, size: unknown, options?: { offset?: unknown }) => unknown
    Size: new (width: number, height: number) => unknown
    Point: new (x: number, y: number) => unknown
  }
}

const CURRENT_LOCATION_DOT_PX = 22

function createCurrentLocationMarkerImage(kakao: KakaoGlobal) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${CURRENT_LOCATION_DOT_PX}" height="${CURRENT_LOCATION_DOT_PX}" viewBox="0 0 22 22">
    <circle cx="11" cy="11" r="8" fill="#1a73e8"/>
    <circle cx="11" cy="11" r="8" fill="none" stroke="#ffffff" stroke-width="3"/>
  </svg>`
  const src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
  const size = new kakao.maps.Size(CURRENT_LOCATION_DOT_PX, CURRENT_LOCATION_DOT_PX)
  const offset = new kakao.maps.Point(
    CURRENT_LOCATION_DOT_PX / 2,
    CURRENT_LOCATION_DOT_PX / 2,
  )
  return new kakao.maps.MarkerImage(src, size, { offset })
}

function ensureKakaoScript(appKey: string): Promise<KakaoGlobal> {
  const win = window as unknown as { kakao?: KakaoGlobal }
  if (win.kakao?.maps) return Promise.resolve(win.kakao)

  const existing = document.getElementById('kakao-sdk-script') as HTMLScriptElement | null

  if (existing) {
    return new Promise((resolve) => {
      const t = window.setInterval(() => {
        if (win.kakao?.maps) {
          window.clearInterval(t)
          resolve(win.kakao)
        }
      }, 200)
    })
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.id = 'kakao-sdk-script'
    script.async = true
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(
      appKey,
    )}&autoload=false`

    script.onload = () => {
      const kakao = (window as unknown as { kakao: KakaoGlobal }).kakao
      if (!kakao?.maps) {
        reject(new Error('Kakao SDK loaded but maps is missing.'))
        return
      }

      kakao.maps.load(() => resolve(kakao))
    }

    script.onerror = () => reject(new Error('Failed to load Kakao Maps SDK script.'))

    document.head.appendChild(script)
  })
}

export default function KakaoMapPanel({
  currentPosition,
  accuracyM,
  spots,
}: KakaoMapPanelProps) {
  const appKey = useMemo(() => import.meta.env.VITE_KAKAO_APP_KEY as string | undefined, [])
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'ready' | 'error' | 'missing_appkey'
  >(appKey ? 'idle' : 'missing_appkey')
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const [sdkReady, setSdkReady] = useState(false)
  const [mapReady, setMapReady] = useState(false)

  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<InstanceType<KakaoGlobal['maps']['Map']> | null>(null)
  const kakaoRef = useRef<KakaoGlobal | null>(null)
  const currentMarkerRef = useRef<InstanceType<KakaoGlobal['maps']['Marker']> | null>(null)
  const accuracyCircleRef = useRef<InstanceType<KakaoGlobal['maps']['Circle']> | null>(null)
  const spotMarkersRef = useRef<InstanceType<KakaoGlobal['maps']['Marker']>[]>([])
  const currentLocationImageRef = useRef<ReturnType<
    typeof createCurrentLocationMarkerImage
  > | null>(null)

  const positionRef = useRef(currentPosition)
  positionRef.current = currentPosition

  // 1) Load Kakao SDK once.
  useEffect(() => {
    if (!appKey) return

    let cancelled = false
    setStatus('loading')

    ensureKakaoScript(appKey)
      .then((kakao) => {
        if (cancelled) return
        kakaoRef.current = kakao
        setSdkReady(true)
        setStatus('ready')
      })
      .catch((e) => {
        if (cancelled) return
        setStatus('error')
        setErrorMessage(e instanceof Error ? e.message : String(e))
      })

    return () => {
      cancelled = true
    }
  }, [appKey])

  // 2) Create map once SDK + container + first GPS fix are ready.
  useEffect(() => {
    if (!sdkReady || mapRef.current) return
    const kakao = kakaoRef.current
    const container = mapContainerRef.current
    const pos = currentPosition
    if (!kakao || !container || !pos) return

    const center = new kakao.maps.LatLng(pos.lat, pos.lng)
    mapRef.current = new kakao.maps.Map(container, {
      center,
      level: 3,
    })
    mapRef.current.relayout()
    setMapReady(true)
  }, [sdkReady, currentPosition])

  const syncMarkers = useCallback(() => {
    const map = mapRef.current
    const kakao = kakaoRef.current
    const pos = positionRef.current
    if (!map || !kakao || !pos) return

    const latlng = new kakao.maps.LatLng(pos.lat, pos.lng)
    map.setCenter(latlng)

    if (!currentLocationImageRef.current) {
      currentLocationImageRef.current = createCurrentLocationMarkerImage(kakao)
    }

    if (!currentMarkerRef.current) {
      currentMarkerRef.current = new kakao.maps.Marker({
        position: latlng,
        image: currentLocationImageRef.current,
        zIndex: 10,
      })
      currentMarkerRef.current.setMap(map)
    } else {
      currentMarkerRef.current.setPosition(latlng)
    }

    if (accuracyM !== undefined && Number.isFinite(accuracyM) && accuracyM > 0) {
      if (!accuracyCircleRef.current) {
        accuracyCircleRef.current = new kakao.maps.Circle({
          center: latlng,
          radius: accuracyM,
          strokeWeight: 2,
          strokeColor: '#1a73e8',
          strokeOpacity: 0.55,
          strokeStyle: 'solid',
          fillColor: '#1a73e8',
          fillOpacity: 0.12,
          zIndex: 5,
        })
        accuracyCircleRef.current.setMap(map)
      } else {
        accuracyCircleRef.current.setPosition(latlng)
        accuracyCircleRef.current.setRadius(accuracyM)
      }
    } else if (accuracyCircleRef.current) {
      accuracyCircleRef.current.setMap(null)
      accuracyCircleRef.current = null
    }

    for (const marker of spotMarkersRef.current) {
      marker.setMap(null)
    }
    spotMarkersRef.current = []

    for (const spot of spots) {
      const spotMarker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(spot.position.lat, spot.position.lng),
        zIndex: 1,
      })
      spotMarker.setMap(map)
      spotMarkersRef.current.push(spotMarker)
    }
  }, [accuracyM, spots])

  // 3) Keep markers/center in sync whenever GPS or spots change.
  useEffect(() => {
    if (!mapReady) return
    syncMarkers()
  }, [mapReady, currentPosition, accuracyM, spots, syncMarkers])

  const recenterToCurrent = useCallback(() => {
    syncMarkers()
  }, [syncMarkers])

  return (
    <div className="kakaoPanel" aria-label="지도 API로 현재 위치 확인">
      <div className="kakaoPanelHeader">
        <span>Kakao Maps (현재 위치 확인)</span>
        {mapReady && currentPosition ? (
          <button type="button" className="kakaoRecenterBtn" onClick={recenterToCurrent}>
            내 위치로
          </button>
        ) : null}
      </div>

      {status === 'missing_appkey' ? (
        <div className="kakaoPanelBody">
          `VITE_KAKAO_APP_KEY`가 설정되어 있지 않아 Kakao 지도를 표시할 수 없습니다.
        </div>
      ) : status === 'error' ? (
        <div className="kakaoPanelBody">
          Kakao 지도를 불러오지 못했습니다: {errorMessage ?? 'unknown error'}
        </div>
      ) : (
        <div className="kakaoMapWrap">
          <div ref={mapContainerRef} className="kakaoMap" />
          {status === 'loading' || (sdkReady && !mapReady && !currentPosition) ? (
            <div className="kakaoLoadingOverlay">GPS 위치 대기 중...</div>
          ) : null}
        </div>
      )}

      {currentPosition ? (
        <div className="kakaoCoords">
          lat {currentPosition.lat.toFixed(6)}, lng {currentPosition.lng.toFixed(6)}
          {accuracyM !== undefined ? ` · 정확도 약 ${Math.round(accuracyM)}m` : null}
        </div>
      ) : null}
    </div>
  )
}
