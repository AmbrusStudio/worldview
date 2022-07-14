import { mountStoreDevtool } from 'simple-zustand-devtools'
import create from 'zustand'

type State = {
  mapRef?: THREE.PlaneGeometry
  setMapRef: (value: THREE.PlaneGeometry) => void
}

export const useStoreMap = create<State>((set) => ({
  mapRef: undefined,
  setMapRef: (value) => set({ mapRef: value }),
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('useStoreMap', useStoreMap)
}
