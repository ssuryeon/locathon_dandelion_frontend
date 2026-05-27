import { useEffect, useState } from 'react'
import type { LatLng } from '../lib/geo'

type GeoStatus = 'idle' | 'requesting' | 'watching' | 'error'

export type UseGeolocationState = {
  status: GeoStatus
  position?: LatLng
  accuracyM?: number
  error?: string
  updatedAtMs?: number
}

type UseGeolocationOptions = {
  enableHighAccuracy?: boolean
  timeoutMs?: number
  maximumAgeMs?: number
}

export function useGeolocation(options: UseGeolocationOptions = {}): UseGeolocationState {
  const { enableHighAccuracy = true, timeoutMs = 10000, maximumAgeMs = 1000 } = options

  const [state, setState] = useState<UseGeolocationState>({ status: 'idle' })

  useEffect(() => {
    if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
      setState({ status: 'error', error: 'Geolocation is not supported by this browser.' })
      return
    }

    setState({ status: 'requesting' })

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const next: LatLng = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }

        setState({
          status: 'watching',
          position: next,
          accuracyM: pos.coords.accuracy,
          updatedAtMs: Date.now(),
        })
      },
      (err) => {
        const message =
          err.code === err.PERMISSION_DENIED
            ? 'Location permission was denied.'
            : err.code === err.POSITION_UNAVAILABLE
              ? 'Location position is unavailable.'
              : err.code === err.TIMEOUT
                ? 'Location request timed out.'
                : err.message

        setState({ status: 'error', error: message })
      },
      {
        enableHighAccuracy,
        timeout: timeoutMs,
        maximumAge: maximumAgeMs,
      },
    )

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [enableHighAccuracy, timeoutMs, maximumAgeMs])

  return state
}

