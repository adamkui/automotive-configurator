import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { FC, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TextureLoader } from 'three';

import { brakeCaliperColors } from 'assets/cars';
import {
  CameraAnimation,
  ConfigPalette,
  Header,
  ResponsiveCamera,
} from 'components';
import { useAppSelector } from 'store';
import {
  setActiveBodyColor,
  setActiveBrakeCaliperColor,
} from 'store/selections';

export const CarConfiguratorPage: FC = () => {
  const { activeBodyColor, activeCar, activeBrakeCaliperColor } =
    useAppSelector(({ selectionsSlice }) => selectionsSlice);
  const { canRotate, controlsEnabled } = useAppSelector(
    ({ controlsSlice }) => controlsSlice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!activeBodyColor && activeCar?.colors?.[0].hexCode) {
      dispatch(setActiveBodyColor(activeCar.colors[0].hexCode));
    }

    if (!activeBrakeCaliperColor) {
      dispatch(setActiveBrakeCaliperColor(brakeCaliperColors[0]));
    }
  }, [activeBodyColor, activeCar, activeBrakeCaliperColor]);

  const ModelFile = activeCar?.modelTsx;

  const FlatSurface = () => {
    const texture = useLoader(TextureLoader, '/concrete-texture.jpg');

    return (
      <mesh position={[0, -3.3, 0]}>
        <cylinderGeometry args={[11.5, 11.5, 0.75, 32, 32]} />
        <meshStandardMaterial color="lightgray" map={texture} />
      </mesh>
    );
  };

  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [30, 9.5, 34], fov: 20 }}
          className="canvas"
        >
          <Environment preset="warehouse" />
          <ResponsiveCamera />
          <CameraAnimation />
          <Suspense fallback={null}>
            {ModelFile ? (
              <ModelFile
                color={activeBodyColor}
                brakeCaliperColor={activeBrakeCaliperColor}
              />
            ) : null}
            <FlatSurface />
          </Suspense>
          <OrbitControls
            autoRotate={canRotate}
            autoRotateSpeed={0.33}
            enableDamping
            dampingFactor={0.1}
            enabled={controlsEnabled}
          />
        </Canvas>
      </Suspense>
      <ConfigPalette />
    </>
  );
};
