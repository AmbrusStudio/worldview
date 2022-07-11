import { FC, Suspense } from 'react';

import MapCamp from '../../components/MapCamp';
import MapGame from '../../components/MapGame';

// type MapBackgroundProps = {};

const MapBackground: FC = () => {
  return (
    <Suspense fallback={null}>
      <group>
        <MapGame />
        <MapCamp />
      </group>
    </Suspense>
  );
};

export default MapBackground;
