import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { FC, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TextureLoader } from 'three';

import {
  brakeCaliperColors,
  seatColors,
  wheelColors,
  windowTintOptions,
} from 'assets/cars';
import concreteTexture from 'assets/concrete-texture.jpg';
import {
  CameraAnimation,
  ConfigPalette,
  Header,
  Legal,
  ResponsiveCamera,
} from 'components';
import { useAppSelector } from 'store';
import {
  setActiveBodyColor,
  setActiveBrakeCaliperColor,
  setActiveSeatColor,
  setActiveWheelColor,
  setActiveWindowTint,
} from 'store/selections';

export const CarConfiguratorPage: FC = () => {
  const {
    activeBodyColor,
    activeCar,
    activeBrakeCaliperColor,
    activeSeatColor,
    activeWheelColor,
    activeWindowTint,
    suspensionHeight,
  } = useAppSelector(({ selectionsSlice }) => selectionsSlice);
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

    if (!activeSeatColor) {
      dispatch(setActiveSeatColor(seatColors[0]));
    }

    if (!activeWheelColor) {
      dispatch(setActiveWheelColor(wheelColors[0]));
    }

    if (!activeWindowTint) {
      dispatch(setActiveWindowTint(windowTintOptions[0]));
    }
  }, [activeBodyColor, activeCar, activeBrakeCaliperColor]);

  const ModelFile = activeCar?.modelTsx;

  const FlatSurface = () => {
    const texture = useLoader(TextureLoader, concreteTexture);

    return (
      <mesh position={[0, -3.05, 0]}>
        <cylinderGeometry args={[10, 10, 0.25, 32, 32]} />
        <meshStandardMaterial color="lightgray" map={texture} />
      </mesh>
    );
  };

  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [30, 11.5, 34], fov: 10 }}
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
                seatColor={activeSeatColor}
                wheelColor={activeWheelColor}
                annotations={activeCar.annotations}
                windowTint={activeWindowTint}
                suspensionHeight={suspensionHeight}
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
      <Legal />
    </>
  );
};
