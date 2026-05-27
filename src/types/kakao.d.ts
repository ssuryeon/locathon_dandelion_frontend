export {}

declare global {
  interface Window {
    kakao?: {
      maps: {
        load: (cb: () => void) => void
        LatLng: new (lat: number, lng: number) => any
        Map: new (container: HTMLElement, options: any) => any
        Marker: new (options: any) => any
        Circle: new (options: any) => any
        MarkerImage: new (src: string, size: any, options?: { offset?: any }) => any
        Size: new (width: number, height: number) => any
        Point: new (x: number, y: number) => any
      }
    }
  }
}

