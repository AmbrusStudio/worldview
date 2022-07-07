import { FC, useState } from 'react';
import * as THREE from 'three';

type MapShapeProps = {
  readonly color: string;
  readonly shape: THREE.Shape;
  readonly fillOpacity: number;
  readonly index: number;
};

const MapShape: FC<MapShapeProps> = ({ color, shape, fillOpacity, index }) => {
  const [hovered, hover] = useState(false);

  return (
    <mesh
      onPointerOver={(e) => hover(true)}
      onPointerOut={() => hover(false)}
      onPointerUp={(e) => console.log(e)}
    >
      <meshBasicMaterial
        color={hovered ? 'hotpink' : color}
        opacity={fillOpacity}
        depthWrite={false}
        transparent
      />
      <shapeBufferGeometry args={[shape]} />
    </mesh>
  );
};

export default MapShape;
