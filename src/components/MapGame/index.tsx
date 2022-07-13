import { useTexture } from '@react-three/drei';
import { FC, useEffect, useRef } from 'react';
import * as THREE from 'three';

import MapImage from '../../assets/images/map.png';
import { planeHeight, planeWidth } from '../../constants';
import { useStoreMap } from '../../store';

// type MapGameProps = {};

const MapGame: FC = () => {
  const textureMap = useTexture(MapImage);
  const mapRef = useRef<THREE.PlaneGeometry>(null);
  const setMapRef = useStoreMap((state) => state.setMapRef);

  // save MapControls Ref
  useEffect(() => {
    if (mapRef.current) {
      setMapRef(mapRef.current);
    }
  }, [mapRef]);

  return (
    <mesh position={[0, 0, 0]} onClick={(e) => console.log('point', e.point)}>
      <planeGeometry args={[planeWidth, planeHeight]} ref={mapRef} />
      <meshBasicMaterial transparent map={textureMap} side={THREE.DoubleSide} />
    </mesh>
  );
};

export default MapGame;
