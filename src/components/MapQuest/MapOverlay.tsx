import { useEffect, useMemo, useRef, useState } from 'react'
import { bearingDegrees, haversineDistanceMeters, type LatLng } from '../../lib/geo'
import type { Spot } from '../../lib/spotGeneration'
import {
  METERS_PER_PIXEL_BASE,
  MAP_BASE_HEIGHT_PX,
  MAP_BASE_WIDTH_PX,
  OVERLAY_SPOT_SIZE_PX,
  STAMP_IMAGE_URL,
  OVERLAY_STAMP_SIZE_PX,
} from '../../config'

type MapOverlayProps = {
  currentPosition?: LatLng
  spots: Spot[]
  stampedSpotIds: string[]
  onStamp: (spotId: string) => void
  stampRadiusM: number
}

function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      setSize({
        width: el.clientWidth,
        height: el.clientHeight,
      })
    }

    update()

    const ro = new ResizeObserver(() => update())
    ro.observe(el)

    return () => ro.disconnect()
  }, [])

  return { ref, size }
}

function projectToImagePx(args: {
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

export default function MapOverlay({
  currentPosition,
  spots,
  stampedSpotIds,
  onStamp,
  stampRadiusM,
}: MapOverlayProps) {
  const stampedSet = useMemo(() => new Set(stampedSpotIds), [stampedSpotIds])
  const { ref: overlayRef, size } = useElementSize<HTMLDivElement>()

  const scale = useMemo(() => {
    if (size.width === 0 || size.height === 0) return 1
    return Math.min(size.width / MAP_BASE_WIDTH_PX, size.height / MAP_BASE_HEIGHT_PX)
  }, [size.width, size.height])

  useEffect(() => {
    if (!currentPosition) return
    if (spots.length === 0) return

    for (const spot of spots) {
      if (stampedSet.has(spot.id)) continue

      const d = haversineDistanceMeters(currentPosition, spot.position)
      if (d <= stampRadiusM) {
        onStamp(spot.id)
      }
    }
  }, [currentPosition, spots, stampedSet, onStamp, stampRadiusM])

  const spotSizeReal = OVERLAY_SPOT_SIZE_PX * scale
  const stampSizeReal = OVERLAY_STAMP_SIZE_PX * scale

  const center = size.width && size.height
    ? { x: size.width / 2, y: size.height / 2 }
    : { x: 0, y: 0 }

  return (
    <div ref={overlayRef} className="mapOverlay" aria-hidden="true">
      {currentPosition ? (
        <div
          className="currentPin"
          style={{
            width: spotSizeReal,
            height: spotSizeReal,
            left: center.x,
            top: center.y,
          }}
        />
      ) : null}

      {spots.map((spot) => {
        if (!currentPosition || size.width === 0 || size.height === 0) return null

        const stamped = stampedSet.has(spot.id)
        const pos = projectToImagePx({
          containerWidthPx: size.width,
          containerHeightPx: size.height,
          current: currentPosition,
          target: spot.position,
        })

        return (
          <div
            key={spot.id}
            className={`spotMarker ${stamped ? 'stamped' : ''}`}
            style={{
              left: pos.x,
              top: pos.y,
              width: spotSizeReal,
              height: spotSizeReal,
            }}
          >
            {!stamped ? <div className="spotDot" /> : null}
            {stamped ? (
              <img
                className="stampImage"
                src={STAMP_IMAGE_URL}
                alt=""
                width={stampSizeReal}
                height={stampSizeReal}
              />
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

