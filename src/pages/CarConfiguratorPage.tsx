import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { FC, Suspense, useContext, useState } from 'react';

import { bodyColors } from 'assets/cars';
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

  const [controlsEnabled, setControlsEnabled] = useState<boolean>(true);
  const [activeBodyColor, setActiveBodyColor] = useState<string | undefined>(
    bodyColors[0]
  );

  if (!contextValues) return null;

  const ModelFile = contextValues.activeCar?.modelTsx;

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
