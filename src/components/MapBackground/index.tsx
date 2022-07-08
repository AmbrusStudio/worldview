import { useTexture } from '@react-three/drei';
import { FC } from 'react';
import * as THREE from 'three';

import MapImage from '../../assets/images/map.png';

// type MapBackgroundProps = {};

const MapBackground: FC = () => {
  const textureMap = useTexture(MapImage);
  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[5020, 2160]} />
      <meshBasicMaterial transparent map={textureMap} side={THREE.DoubleSide} />
    </mesh>
  );
};

export default MapBackground;
