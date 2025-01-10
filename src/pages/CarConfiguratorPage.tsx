import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { FC, Suspense, useContext, useEffect, useState } from 'react';
import { TextureLoader } from 'three';

import {
  CameraAnimation,
  ConfigPalette,
  Header,
  ResponsiveCamera,
} from 'components';
import { context } from '../Context';

export const CarConfiguratorPage: FC = () => {
  const contextValues = useContext(context);
  const carWidth = 4;

  if (!contextValues) return null;

  const { activeBodyColor, setActiveBodyColor } = contextValues;

  const [controlsEnabled, setControlsEnabled] = useState<boolean>(true);

  useEffect(() => {
    if (!activeBodyColor && contextValues.activeCar?.colors?.[0].hexCode) {
      setActiveBodyColor(contextValues.activeCar.colors[0].hexCode);
    }
  }, [activeBodyColor, contextValues]);

  const ModelFile = contextValues.activeCar?.modelTsx;

  const FlatSurface = () => {
    const texture = useLoader(TextureLoader, '/concrete-texture.jpg');

    return (
      <mesh position={[0, -3.3, 0]}>
        <cylinderGeometry args={[11.5, 11.5, 0.75, 32, 32]} />
        {/* Radius: 5, Height: 0.5, Segments: 32 */}
        <meshStandardMaterial color="lightgray" map={texture} />
      </mesh>
    );
  };

  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <Canvas
          // camera={{ position: [30, 9.5, 34], fov: 20 }}
          className="canvas"
        >
          <Environment preset="warehouse" />
          <ResponsiveCamera targetWidth={carWidth} />
          <CameraAnimation setControlsEnabled={setControlsEnabled} />
          <Suspense fallback={null}>
            {ModelFile ? <ModelFile color={activeBodyColor} /> : null}
            <FlatSurface />
          </Suspense>
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.33}
            enableDamping
            dampingFactor={0.1}
            enabled={controlsEnabled}
          />
        </Canvas>
      </Suspense>
      <ConfigPalette setActiveBodyColor={setActiveBodyColor} />
    </>
  );
};
