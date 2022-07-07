import {
  // MapControls,
  ArcballControls,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import * as THREE from 'three';

import MapCamp from '../../components/MapCamp';
import MapGroup from '../../components/MapGroup';
import WorldData from '../../custom.geo.min.json';

window.THREE = THREE;

console.log('WorldData', WorldData);

// const MapImage = 'https://i.imgur.com/YFPZzDv.jpg';

function MapRender() {
  return (
    <>
      <div id="canvas-container">
        <Canvas
          className="canvas-map"
          orthographic
          camera={{
            position: [0, 0, 32],
            zoom: 64,
            near: 0.1,
            far: 64,
          }}
        >
          <Suspense fallback={null}>
            <MapGroup />
          </Suspense>
          <MapCamp />
          <gridHelper />
          <axesHelper />
          <ArcballControls />
          {/* <MapControls maxZoom={1.6} minZoom={0.2} /> */}
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            {/* <GizmoViewcube /> */}
            <GizmoViewport />
          </GizmoHelper>
          <OrbitControls makeDefault />
        </Canvas>
      </div>
    </>
  );
}

export default MapRender;
