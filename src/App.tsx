import React, { useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { MapControls, Html } from '@react-three/drei';
import { SVGLoader } from 'three-stdlib';
import { Box3, Sphere, Vector3 } from 'three';
import * as THREE from 'three';
import Drawer from '@mui/material/Drawer';
import { useControls } from 'leva';

window.THREE = THREE;

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
  const [center, setCenter] = React.useState(() => new Vector3(0, 0, 0));
  const ref = React.useRef<THREE.Group>(null!);

  const { paths } = useLoader(SVGLoader, 'map-1.svg');

  const shapes = React.useMemo(
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

  React.useEffect(() => {
    const box = new Box3().setFromObject(ref.current);
    const sphere = new Sphere();
    box.getBoundingSphere(sphere);
    setCenter((vec) => vec.set(-sphere.center.x, -sphere.center.y, 0));
  }, []);

  return (
    <group position={center} ref={ref}>
      {shapes.map((props: any, index: number) => (
        <Cell key={props.shape.uuid} index={index} {...props} color="#2196f3" />
      ))}
    </group>
  );
}

function MapHtml({ setState }: { setState: (val: boolean) => void }) {
  const { positionX, positionY, positionZ } = useControls({
    positionX: 80,
    positionY: 150,
    positionZ: 0,
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
      <Html position={[200, 200, 0]} wrapperClass="role">
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

  return (
    <div id="canvas-container">
      <Canvas
        orthographic
        camera={{
          position: [0, 0, 1],
          zoom: 2,
          up: [0, 0, 1],
          // far: 10000,
        }}
      >
        {/* <color attach="background" args={[243, 243, 243]} /> */}
        <Svg />
        <MapHtml setState={setState} />
        <MapControls />
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
