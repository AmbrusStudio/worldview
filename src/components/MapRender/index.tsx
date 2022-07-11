import { Canvas } from '@react-three/fiber';

import MapBackground from '../../components/MapBackground';
import MapControlsHelper from '../../components/MapControlsHelper';
import MapHelper from '../../components/MapHelper';

function MapRender() {
  return (
    <div id="canvas-container">
      <Canvas
        className="canvas-map"
        orthographic
        camera={{
          position: [0, 0, 50],
          zoom: 1,
          up: [0, 0, 1],
        }}
        flat
      >
        <MapBackground />
        {process.env.NODE_ENV === 'development' && <MapHelper />}
        <MapControlsHelper />
      </Canvas>
    </div>
  );
}

export default MapRender;
