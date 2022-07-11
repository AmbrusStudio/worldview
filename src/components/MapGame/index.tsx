import { useTexture } from '@react-three/drei';
import { FC } from 'react';
import * as THREE from 'three';

import MapImage from '../../assets/images/map.png';

// type MapGameProps = {};

// const w = 5020
// const h = 2160
const planeWidth = 2510;
const planeHeight = 1080;

const MapGame: FC = () => {
  const textureMap = useTexture(MapImage);

  return (
    <mesh position={[0, 0, 0]} onClick={(e) => console.log('e', e.point)}>
      <planeGeometry args={[planeWidth, planeHeight]} />
      <meshBasicMaterial transparent map={textureMap} side={THREE.DoubleSide} />
    </mesh>
  );
};

export default MapGame;
