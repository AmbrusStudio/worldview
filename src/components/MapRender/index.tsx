import { GizmoHelper, GizmoViewport, MapControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import * as THREE from 'three';

import MapBackground from '../../components/MapBackground';
import MapCamp from '../../components/MapCamp';

window.THREE = THREE;

function MapRender() {
  return (
    <>
      <div id="canvas-container">
        <Canvas
          className="canvas-map"
          orthographic
          camera={{ position: [0, 0, 50], zoom: 1, up: [0, 0, 1] }}
        >
          <Suspense fallback={null}>
            <MapBackground />
          </Suspense>
          <MapCamp />
          <gridHelper />
          <axesHelper />
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport />
          </GizmoHelper>
          <MapControls minZoom={0.5} maxZoom={2} enableRotate={false} />
        </Canvas>
      </div>
    </>
  );
}

export default MapRender;
