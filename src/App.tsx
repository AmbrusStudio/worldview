import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import {
  MapControls,
  ArcballControls,
  Html,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  GizmoViewcube,
  Center,
} from '@react-three/drei';
import { SVGLoader } from 'three-stdlib';
import { Box3, Sphere, Vector3 } from 'three';
import * as THREE from 'three';
import Drawer from '@mui/material/Drawer';
import { useControls } from 'leva';
import { Grid, EffectComposer } from '@react-three/postprocessing';

window.THREE = THREE;

const width = window.innerWidth;
const height = window.innerHeight;

// const MapImage = 'https://i.imgur.com/YFPZzDv.jpg';

const Cell = ({ color, shape, fillOpacity, index }: any) => {
  const [hovered, hover] = useState(false);

  return (
    <mesh
      onPointerOver={(e) => {
        // console.log(e);
        hover(true);
      }}
      onPointerOut={() => hover(false)}
    >
      <meshBasicMaterial
        color={hovered ? 'hotpink' : color}
        opacity={fillOpacity}
        depthWrite={false}
        transparent
      />
      <shapeBufferGeometry args={[shape]} />
      {index === -1 && (
        <Html wrapperClass="role">
          <img
            src="https://www.ymlx8.com/uploads/29d2d21a71f1854e1bc4cbaadd5db8ef.jpg"
            alt="author"
          />
        </Html>
      )}
    </mesh>
  );
};

function Svg() {
  const [center, setCenter] = useState(() => new Vector3(0, 0, 0));
  const ref = useRef<THREE.Group>(null!);
  const { rotationX, rotationY, rotationZ } = useControls({
    rotationX: {
      min: -5,
      max: 5,
      value: 0,
    },
    rotationY: {
      min: -5,
      max: 5,
      value: 0,
    },
    rotationZ: {
      min: -5,
      max: 5,
      value: 0,
    },
  });

  const { paths } = useLoader(SVGLoader, 'world-1.svg');

  console.log('paths', paths);

  const shapes = useMemo(
    () =>
      paths.flatMap((p: any) =>
        p.toShapes(true).map((shape: any) => ({
          shape,
          color: p.color,
          fillOpacity: p.userData.style.fillOpacity,
        }))
      ),
    [paths]
  );

  console.log('shapes', shapes);

  useEffect(() => {
    const box = new Box3().setFromObject(ref.current);
    const sphere = new Sphere();
    box.getBoundingSphere(sphere);

    console.log('sphere', sphere);

    setCenter((vec) => vec.set(-sphere.center.x, -sphere.center.y, 0));
    // setCenter((vec) => vec.set(0, 0, 0));
  }, []);

  return (
    <Center position={[0, 0, 0]}>
      <mesh>
        <group position={center} ref={ref} rotation={[0, 0, -3.2]} scale={0.01}>
          {shapes.map((props: any, index: number) => (
            <Cell
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
}

function MapHtml({ setState }: { setState: (val: boolean) => void }) {
  const { positionX, positionY, positionZ } = useControls({
    positionX: {
      min: -100,
      max: 100,
      value: 0,
    },
    positionY: {
      min: -100,
      max: 100,
      value: 0,
    },
    positionZ: {
      min: -100,
      max: 100,
      value: 0,
    },
  });

  return (
    <group>
      <Html position={[positionX, positionY, positionZ]} wrapperClass="role">
        <img
          onClick={(e) => setState(true)}
          src="https://www.meishujixun.com/uploads/b8b21c9f81947095ace9e9eeab39f966.jpg"
          alt="author"
        />
      </Html>
      <Html position={[0, 0, 0]} wrapperClass="role">
        <img
          onClick={(e) => setState(true)}
          src="https://www.ymlx8.com/uploads/29d2d21a71f1854e1bc4cbaadd5db8ef.jpg"
          alt="author"
        />
      </Html>
    </group>
  );
}

function App() {
  const [state, setState] = useState<boolean>(false);
  const { scale } = useControls({
    scale: {
      min: 0.1,
      max: 4,
      value: 0.3,
    },
  });

  return (
    <div id="canvas-container">
      <Canvas
        orthographic
        camera={{
          position: [0, 0, 32],
          zoom: 64,
          near: 0.1,
          far: 64,
        }}
      >
        {/* <color attach="background" args={[243, 243, 243]} /> */}
        <React.Suspense fallback={null}>
          <Svg />
        </React.Suspense>
        <MapHtml setState={setState} />
        <gridHelper />
        <axesHelper />
        {/* <EffectComposer>
          <Grid scale={scale} />
        </EffectComposer> */}
        <ArcballControls />
        {/* <MapControls enableRotate={false} maxZoom={1.6} minZoom={0.2} /> */}
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          {/* <GizmoViewcube /> */}
          <GizmoViewport />
        </GizmoHelper>
        <OrbitControls makeDefault />
      </Canvas>
      <Drawer anchor={'right'} open={state} onClose={() => setState(false)}>
        <div style={{ width: 400 }}>
          <img
            src="http://image.9game.cn/2020/8/26/171832690.jpg"
            alt="cover"
            style={{ width: '100%' }}
          />
        </div>
      </Drawer>
    </div>
  );
}

export default App;
