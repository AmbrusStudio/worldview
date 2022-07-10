import { GizmoHelper, GizmoViewport, MapControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import * as THREE from 'three';

import MapBackground from '../../components/MapBackground';

window.THREE = THREE;

function MapRender() {
  return (
    <>
      <div id="canvas-container">
        <Canvas
          className="canvas-map"
          orthographic
          camera={{
            position: [0, 0, 200],
            zoom: 1,
            // up: [0, 0, 1],
          }}
          // linear
          flat
        >
          <Suspense fallback={null}>
            <MapBackground />
          </Suspense>
          <gridHelper />
          <axesHelper />
          <GizmoHelper
            alignment="bottom-right"
            margin={[80, 80]}
            position={[0, 0, 50]}
          >
            <GizmoViewport />
          </GizmoHelper>
          <MapControls
            minZoom={1}
            maxZoom={2}
            enableRotate={false}
            enablePan={false}
            makeDefault
            // onChange={(e) => console.log('e', e)}
          />
          {/* <OrbitControls /> */}
        </Canvas>
      </div>
    </>
  );
}

export default MapRender;
