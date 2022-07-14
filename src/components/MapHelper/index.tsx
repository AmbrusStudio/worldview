import { GizmoHelper, GizmoViewport } from '@react-three/drei'

const MapHelper = () => {
  return (
    <group position={[0, 0, 40]}>
      <gridHelper />
      <axesHelper />
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport />
      </GizmoHelper>
    </group>
  )
}

export default MapHelper
