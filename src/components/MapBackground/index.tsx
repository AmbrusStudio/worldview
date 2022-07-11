import { FC } from 'react';

import MapCamp from '../../components/MapCamp';
import MapGame from '../../components/MapGame';

// type MapBackgroundProps = {};

const MapBackground: FC = () => {
  return (
    <group>
      <MapGame />
      <MapCamp />
    </group>
  );
};

export default MapBackground;
