import { FC, Suspense } from 'react'

import MapCamp from '../../components/MapCamp'
import MapGame from '../../components/MapGame'
import { useMapZoom } from '../../hooks'

// type MapBackgroundProps = {};

const MapBackground: FC = () => {
  useMapZoom()

  return (
    <Suspense fallback={null}>
      <group>
        <MapGame />
        <MapCamp />
      </group>
    </Suspense>
  )
}

export default MapBackground
