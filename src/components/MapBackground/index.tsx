import { TransformControls, useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { FC, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TransformControls as TransformControlsImpl } from 'three-stdlib';

import MapImage from '../../assets/images/map.png';
// import MapCamp from '../../components/MapCamp';

// type MapBackgroundProps = {};

// const w = 5020
// const h = 2160
const w = 2510;
const h = 1080;

const MapBackground: FC = () => {
  const textureMap = useTexture(MapImage);
  const { scene, camera } = useThree();
  const ref = useRef<TransformControlsImpl>(null!);

  const set = useThree((state) => state.set);
  const state = useThree((state) => state);
  console.log('state', state);

  useFrame((state, delta) => {
    // console.log('camera', camera);
    // console.log('state, delta', state, delta);

    if (ref.current) {
      const zoom = (ref.current as any).camera.zoom;
      const mapWidth = (w * zoom - window.innerWidth) / 2;
      const mapHeight = (h * zoom - window.innerHeight) / 2;

      if ((ref.current as any).object.position.x >= mapWidth) {
        (ref.current as any).object.position.x = mapWidth;
      } else if ((ref.current as any).object.position.x <= -mapWidth) {
        (ref.current as any).object.position.x = -mapWidth;
      }
      if ((ref.current as any).object.position.y >= mapHeight) {
        (ref.current as any).object.position.y = mapHeight;
      } else if ((ref.current as any).object.position.y <= -mapHeight) {
        (ref.current as any).object.position.y = -mapHeight;
      }
    }
  });

  useEffect(() => {
    const cb = (e: KeyboardEvent) => e.key === 'Escape' && ref.current.reset();
    document.addEventListener('keydown', cb);
    return () => document.removeEventListener('keydown', cb);
  }, []);

  useEffect(() => {
    console.log('scene', camera);
    if (ref.current && camera && scene) {
      (window as any).scene = scene;
      (window as any).ref = ref;
      (window as any).camera = camera;
    }
  }, []);

  return (
    <TransformControls
      ref={ref}
      size={1}
      mode="translate"
      showX={true}
      showY={true}
      showZ={true}
      // onObjectChange={(e) => console.log('e', e)}
    >
      <group>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[w, h]} />
          {/* <planeGeometry args={[2510, 1080]} /> */}
          <meshBasicMaterial
            // transparent
            map={textureMap}
            side={THREE.DoubleSide}
            color="white"
          />
        </mesh>
        {/* <MapCamp /> */}
      </group>
    </TransformControls>
  );
};

export default MapBackground;
