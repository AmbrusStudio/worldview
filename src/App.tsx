import React, { useRef, useMemo, useEffect, useState, FC } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  // MapControls,
  ArcballControls,
  Html,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  // GizmoViewcube,
  Center,
} from '@react-three/drei';
import { Box3, Sphere, Vector3 } from 'three';
import * as THREE from 'three';
import Drawer from '@mui/material/Drawer';
import { useControls } from 'leva';
// import { Grid, EffectComposer } from '@react-three/postprocessing';
import WorldData from './custom.geo.min.json';
import MapLegend from './components/MapLegend';

const points = [1, 10, 15, 20, 90];

type NumberArray = {
  [index: number]: number;
};

type WorldFeaturesType = {
  geometry: {
    coordinates: any[];
    type: 'Polygon' | 'MultiPolygon';
  };
  properties: {};
  type: 'Feature';
};

type WorldDataType = {
  features: WorldFeaturesType[];
  type: 'FeatureCollection';
};

type CellProps = {
  readonly color: string;
  readonly shape: THREE.Shape;
  readonly fillOpacity: number;
  readonly index: number;
  setState: (value: boolean) => void;
};

type SvgProps = {
  setState: (value: boolean) => void;
};

window.THREE = THREE;

console.log('WorldData', WorldData);

/**
 * draw Extrude Shape
 * @param polygon
 * @returns
 */
const drawExtrudeShape = (polygon: NumberArray[]): THREE.Shape => {
  const shape = new THREE.Shape();
  polygon.forEach((p, index) => {
    if (index === 0) {
      shape.moveTo(p[0], p[1]);
    }
    shape.lineTo(p[0], p[1]);
  });

  return shape;
};

/**
 * World Data To Shapes
 * @param data
 * @returns
 */
const WorldDataToShapes = (data: WorldFeaturesType[]) => {
  return data.flatMap((feature) => {
    const paths: {
      shape: THREE.Shape;
      color: string;
      fillOpacity: number;
    }[] = [];

    if (feature.geometry.type === 'MultiPolygon') {
      feature.geometry.coordinates.forEach((points) => {
        points.forEach((p: any[]) => {
          paths.push({
            shape: drawExtrudeShape(p),
            color: '#2196f3',
            fillOpacity: 1,
          });
        });
      });
    }

    if (feature.geometry.type === 'Polygon') {
      feature.geometry.coordinates.forEach((p) => {
        paths.push({
          shape: drawExtrudeShape(p),
          color: '#2196f3',
          fillOpacity: 1,
        });
      });
    }

    return paths;
  });
};

// const MapImage = 'https://i.imgur.com/YFPZzDv.jpg';

const Cell: FC<CellProps> = ({
  color,
  shape,
  fillOpacity,
  index,
  setState,
}) => {
  const [hovered, hover] = useState(false);

  return (
    <mesh
      onPointerOver={(e) => {
        // console.log(e);
        hover(true);
      }}
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
      {points.includes(index) && (
        <Html
          wrapperClass="role"
          position={[shape.currentPoint.x, shape.currentPoint.y, 0]}
          zIndexRange={[100, 0]}
        >
          <img
            onClick={(e) => {
              console.log('e', e);
              setState(true);
            }}
            src="https://www.ymlx8.com/uploads/29d2d21a71f1854e1bc4cbaadd5db8ef.jpg"
            alt="author"
          />
        </Html>
      )}
    </mesh>
  );
};

const Svg: FC<SvgProps> = ({ setState }) => {
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
    () => WorldDataToShapes(WorldData.features as WorldFeaturesType[]),
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
            <Cell
              key={props.shape.uuid}
              index={index}
              {...props}
              color="#2196f3"
              setState={setState}
            />
          ))}
        </group>
      </mesh>
    </Center>
  );
};

function App() {
  const [state, setState] = useState<boolean>(false);

  return (
    <>
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
            <Svg setState={setState} />
          </React.Suspense>
          <gridHelper />
          <axesHelper />
          {/* <EffectComposer>
          <Grid scale={scale} />
        </EffectComposer> */}
          <ArcballControls />
          {/* <MapControls maxZoom={1.6} minZoom={0.2} /> */}
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            {/* <GizmoViewcube /> */}
            <GizmoViewport />
          </GizmoHelper>
          <OrbitControls makeDefault />
        </Canvas>
      </div>
      <MapLegend />
      <Drawer anchor={'right'} open={state} onClose={() => setState(false)}>
        <div style={{ width: 400 }}>
          <img
            src="http://image.9game.cn/2020/8/26/171832690.jpg"
            alt="cover"
            style={{ width: '100%' }}
          />
        </div>
      </Drawer>
    </>
  );
}

export default App;
