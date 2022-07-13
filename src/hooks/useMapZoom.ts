import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

import { useStoreMapControls } from '../store';
import { getMapZoom } from '../utils';

export function useMapZoom() {
  const { camera, size } = useThree();
  const mapControlsRef = useStoreMapControls((state) => state.mapControlsRef);
  // set camera zoom
  useEffect(() => {
    const zoom = getMapZoom(size.width, size.height);

    camera.zoom = zoom;
    camera.updateProjectionMatrix();
  }, [camera, size]);

  // set mapControls minZoom maxZoom
  useEffect(() => {
    if (!mapControlsRef) {
      return;
    }

    const zoom = getMapZoom(size.width, size.height);
    mapControlsRef.minZoom = zoom;
    mapControlsRef.maxZoom = zoom + 1;
  }, [mapControlsRef, size]);

  return {};
}
