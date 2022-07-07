import { useRef, useMemo, useEffect, useState, FC } from 'react';
import { Center } from '@react-three/drei';
import { Box3, Sphere, Vector3 } from 'three';
import * as THREE from 'three';
import { useControls } from 'leva';
import WorldData from '../../custom.geo.min.json';
import MapShape from '../../components/MapShape';
import { worldDataToShapes } from '../../utils';
import { WorldFeaturesType } from '../../types/index.d';

type MapGroupProps = {};

const MapGroup: FC<MapGroupProps> = () => {
  const [center, setCenter] = useState(() => new Vector3(0, 0, 0));
  const ref = useRef<THREE.Group>(null!);

  const { mapRotationZ, mapScale } = useControls({
    mapRotationZ: {
      min: -5,
      max: 5,
      value: 0,
    },
    mapScale: {
      min: 0.01,
      max: 1,
      value: 1,
    },
  });

  const worldShapes = useMemo(
    () => worldDataToShapes(WorldData.features as WorldFeaturesType[]),
    []
  );

  console.log('worldShapes', worldShapes);

  useEffect(() => {
    console.log('ref.current', ref.current);

    const box = new Box3().setFromObject(ref.current);
    const sphere = new Sphere();
    box.getBoundingSphere(sphere);

    console.log('sphere', sphere);

    // TODO：invalid
    setCenter((vec) => vec.set(-sphere.center.x, -sphere.center.y, -1));
  }, []);

  return (
    <Center position={[0, 0, 0]}>
      <mesh>
        <group
          position={center}
          ref={ref}
          rotation={[0, 0, mapRotationZ]}
          scale={new Vector3(mapScale, mapScale, mapScale)}
        >
          {worldShapes.map((props: any, index: number) => (
            <MapShape
              key={props.shape.uuid}
              index={index}
              {...props}
              color="#2196f3"
            />
          ))}
        </group>
      </mesh>
    </Center>
  );
};

export default MapGroup;
