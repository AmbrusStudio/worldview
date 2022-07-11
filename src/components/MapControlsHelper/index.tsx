import { MapControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useCallback } from 'react';
import * as THREE from 'three';

import { planeHeight, planeWidth } from '../../constants';

const MapControlsHelper = () => {
  const { camera } = useThree();

  const limitPanningDistance = useCallback((e?: THREE.Event) => {
    // 704.5 102
    // 1056.75 320

    const pan =
      (planeWidth * camera.zoom - window.innerWidth) / 2 / camera.zoom;
    const vertical =
      (planeHeight * camera.zoom - window.innerHeight) / 2 / camera.zoom;

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
  }, []);

  return (
    <>
      <MapControls
        enableRotate={false}
        minZoom={1}
        maxZoom={2}
        onChange={(e) => {
          // console.log(e?.target);
          limitPanningDistance(e);
        }}
        makeDefault
      />
    </>
  );
};

export default MapControlsHelper;
