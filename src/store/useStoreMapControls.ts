import { mountStoreDevtool } from 'simple-zustand-devtools'
import { MapControls as MapControlsImpl } from 'three-stdlib'
import create from 'zustand'

type State = {
  mapControlsRef?: MapControlsImpl
  setMapControlsRef: (value: MapControlsImpl) => void
}

export const useStoreMapControls = create<State>((set) => ({
  mapControlsRef: undefined,
  setMapControlsRef: (value) => set({ mapControlsRef: value }),
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('useStoreMapControls', useStoreMapControls)
}
