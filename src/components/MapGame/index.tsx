import { useTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { FC, useMemo } from 'react';
import * as THREE from 'three';

import MapImage from '../../assets/images/map.png';
import { getMapSizeByContainer } from '../../utils';

// type MapGameProps = {};

const MapGame: FC = () => {
  const textureMap = useTexture(MapImage);
  const { size } = useThree();
  const [w, h] = useMemo(
    () => getMapSizeByContainer(size.width, size.height),
    [size]
  );

  return (
    <mesh position={[0, 0, 0]} onClick={(e) => console.log('point', e.point)}>
      <planeGeometry args={[w, h]} />
      <meshBasicMaterial transparent map={textureMap} side={THREE.DoubleSide} />
    </mesh>
  );
};

export default MapGame;
