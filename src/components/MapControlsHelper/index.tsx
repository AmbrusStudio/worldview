import { MapControls } from '@react-three/drei';

const MapControlsHelper = () => {
  return (
    <>
      <MapControls enableRotate={false} minZoom={1} maxZoom={2} makeDefault />
    </>
  );
};

export default MapControlsHelper;
