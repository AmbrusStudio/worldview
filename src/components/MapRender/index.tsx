import { GizmoHelper, GizmoViewport, MapControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import * as THREE from 'three';

import MapCamp from '../../components/MapCamp';
import MapGroup from '../../components/MapGroup';

window.THREE = THREE;

// const MapImage = 'https://i.imgur.com/YFPZzDv.jpg';

function MapRender() {
  return (
    <>
      <div id="canvas-container">
        <Canvas
          className="canvas-map"
          orthographic
          camera={{ position: [0, 0, 50], zoom: 6, up: [0, 0, 1], far: 10000 }}
        >
          <Suspense fallback={null}>
            <MapGroup />
          </Suspense>
          <MapCamp />
          <gridHelper />
          <axesHelper />
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport />
          </GizmoHelper>
          <MapControls minZoom={4} maxZoom={8} enableRotate={false} />
        </Canvas>
      </div>
    </>
  );
}

export default MapRender;
