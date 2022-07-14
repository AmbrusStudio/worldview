import { mountStoreDevtool } from 'simple-zustand-devtools'
import create from 'zustand'

import { CampVol } from '../types'

type State = {
  visible: boolean
  campVol: CampVol[]
  setVisible: (value: boolean) => void
  setCampVol: (value: CampVol[]) => void
}

export const useStoreMapDrawer = create<State>((set) => ({
  visible: false,
  campVol: [],
  setVisible: (value) => set({ visible: value }),
  setCampVol: (value) => set({ campVol: value }),
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('useStoreMapDrawer', useStoreMapDrawer)
}
