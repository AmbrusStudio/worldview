import { useTexture } from '@react-three/drei';
import { FC } from 'react';
import * as THREE from 'three';

import MapImage from '../../assets/images/map.png';
import { planeHeight, planeWidth } from '../../constants';

// type MapGameProps = {};

const MapGame: FC = () => {
  const textureMap = useTexture(MapImage);

  return (
    <mesh position={[0, 0, 0]} onClick={(e) => console.log('point', e.point)}>
      <planeGeometry args={[planeWidth, planeHeight]} />
      <meshBasicMaterial transparent map={textureMap} side={THREE.DoubleSide} />
    </mesh>
  );
};

export default MapGame;
