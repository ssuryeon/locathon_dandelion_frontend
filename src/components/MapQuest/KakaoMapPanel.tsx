import { useEffect, useMemo, useRef, useState } from 'react'
import type { LatLng } from '../../lib/geo'
import type { Spot } from '../../lib/spotGeneration'

type KakaoMapPanelProps = {
  currentPosition?: LatLng
  spots: Spot[]
}

type KakaoGlobal = {
  maps: {
    load: (cb: () => void) => void
    LatLng: new (lat: number, lng: number) => any
    Map: new (container: HTMLElement, options: any) => any
    Marker: new (options: any) => any
  }
}

function ensureKakaoScript(appKey: string): Promise<KakaoGlobal> {
  const win = window as unknown as { kakao?: KakaoGlobal }
  if (win.kakao?.maps) return Promise.resolve(win.kakao)

  const existing = document.getElementById('kakao-sdk-script') as
    | HTMLScriptElement
    | null

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

export default function KakaoMapPanel({ currentPosition, spots }: KakaoMapPanelProps) {
  const appKey = useMemo(() => import.meta.env.VITE_KAKAO_APP_KEY as string | undefined, [])
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'ready' | 'error' | 'missing_appkey'
  >(appKey ? 'idle' : 'missing_appkey')
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  useEffect(() => {
    if (!appKey) return
    if (!mapContainerRef.current) return

    let cancelled = false
    setStatus('loading')

    ensureKakaoScript(appKey)
      .then((kakao) => {
        if (cancelled) return
        setStatus('ready')

        if (!mapRef.current && currentPosition) {
          const center = new kakao.maps.LatLng(currentPosition.lat, currentPosition.lng)
          mapRef.current = new kakao.maps.Map(mapContainerRef.current, {
            center,
            level: 3,
          })
        }
      })
      .catch((e) => {
        if (cancelled) return
        setStatus('error')
        setErrorMessage(e instanceof Error ? e.message : String(e))
      })

    return () => {
      cancelled = true
    }
  }, [appKey, currentPosition])

  useEffect(() => {
    const map = mapRef.current
    const win = window as unknown as { kakao?: KakaoGlobal }
    if (!map || !win.kakao?.maps) return

    // Refresh markers on position/spot changes.
    for (const m of markersRef.current) {
      m.setMap(null)
    }
    markersRef.current = []

    if (currentPosition) {
      map.setCenter(new win.kakao.maps.LatLng(currentPosition.lat, currentPosition.lng))

      const currentMarker = new win.kakao.maps.Marker({
        position: new win.kakao.maps.LatLng(currentPosition.lat, currentPosition.lng),
      })
      currentMarker.setMap(map)
      markersRef.current.push(currentMarker)
    }

    for (const spot of spots) {
      const marker = new win.kakao.maps.Marker({
        position: new win.kakao.maps.LatLng(spot.position.lat, spot.position.lng),
      })
      marker.setMap(map)
      markersRef.current.push(marker)
    }
  }, [currentPosition, spots])

  return (
    <div className="kakaoPanel" aria-label="지도 API로 현재 위치 확인">
      <div className="kakaoPanelHeader">
        Kakao Maps (현재 위치 확인)
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
          {status === 'loading' ? (
            <div className="kakaoLoadingOverlay">Loading...</div>
          ) : null}
        </div>
      )}
    </div>
  )
}

