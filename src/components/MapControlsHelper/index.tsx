import { MapControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { MapControls as MapControlsImpl } from 'three-stdlib';

import { planeHeight, planeWidth } from '../../constants';
import { useStoreMapControls } from '../../store';
import { isContainerExceedsMapLimits } from '../../utils';

const MapControlsHelper = () => {
  const { camera, size } = useThree();
  const mapControlsRef = useRef<MapControlsImpl>(null);
  const setMapControlsRef = useStoreMapControls(
    (state) => state.setMapControlsRef
  );

  // save MapControls Ref
  useEffect(() => {
    if (mapControlsRef.current) {
      setMapControlsRef(mapControlsRef.current);
    }
  }, [mapControlsRef, setMapControlsRef]);

  const limitPanningDistance = useCallback(
    (e?: THREE.Event) => {
      // map limit
      if (isContainerExceedsMapLimits(size.width, size.height, camera.zoom)) {
        return;
      }

      // 704.5 102
      // 1056.75 320

      const pan = (planeWidth * camera.zoom - size.width) / 2 / camera.zoom;
      const vertical =
        (planeHeight * camera.zoom - size.height) / 2 / camera.zoom;

      // console.log('pan vertical', pan, vertical);

      const maxX = pan;
      const minX = -pan;
      const maxY = vertical;
      const minY = -vertical;
      const x = e?.target.target.x;
      const y = e?.target.target.y;
      if (x < minX || x > maxX) {
        e?.target.target.setX(x < minX ? minX : maxX);
        camera.position.setX(x < minX ? minX : maxX);
      }
      if (y < minY || y > maxY) {
        e?.target.target.setY(y < minY ? minY : maxY);
        camera.position.setY(y < minY ? minY : maxY);
      }
    },
    [camera.zoom, camera.position, size]
  );

  return (
    <MapControls
      ref={mapControlsRef}
      enableRotate={false}
      minZoom={1}
      maxZoom={2}
      zoomSpeed={0.3}
      onChange={(e) => {
        // console.log(e?.target);
        limitPanningDistance(e);
      }}
      makeDefault
    />
  );
};

export default MapControlsHelper;
