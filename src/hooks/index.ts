import { mountStoreDevtool } from 'simple-zustand-devtools';
import create from 'zustand';

type State = {
  visible: boolean;
  setVisible: (value: boolean) => void;
};

const useStoreMapDrawer = create<State>((set) => ({
  visible: false,
  setVisible: (value) => set({ visible: value }),
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('useStoreMapDrawer', useStoreMapDrawer);
}

export default useStoreMapDrawer;
