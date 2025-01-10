import { Size, useFrame, useThree } from "@react-three/fiber";
import { Dispatch, useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ResponsiveCameraProps {
  targetWidth: number;
}

interface CameraAnimationProps {
  setControlsEnabled: Dispatch<React.SetStateAction<boolean>>;
}

export const ResponsiveCamera = ({ targetWidth }: ResponsiveCameraProps) => {
  const { camera, size }: { camera: THREE.PerspectiveCamera; size: Size } =
    useThree();

  const updateCamera = () => {
    const aspect = size.width / size.height;
    const distance = camera.position.z; // Kamera távolság az objektumtól
    const fov = 2 * Math.atan(targetWidth / (2 * distance)) * (180 / Math.PI); // Radián -> fok
    camera.fov = fov / aspect; // Arányos FOV
    camera.updateProjectionMatrix(); // Frissítsd a kamera mátrixát
  };

  useEffect(() => {
    updateCamera();
  }, []);

  useEffect(() => {
    updateCamera();
  }, [camera, size, targetWidth]);

  return null; // Ez a komponens nem renderel semmit, csak frissíti a kamerát
};

export const CameraAnimation = ({
  setControlsEnabled,
}: CameraAnimationProps) => {
  const { camera }: { camera: THREE.PerspectiveCamera } = useThree();
  const targetFov = 10;
  const targetPosition = [30, 9.5, 34];
  const duration = 1.5; // Animáció időtartama másodpercben
  const animationRef = useRef(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useFrame((_, delta) => {
    if (!isAnimating) return; // Ha nincs animáció, hagyjuk futni az OrbitControls-t

    animationRef.current += delta;

    const t = Math.min(animationRef.current / duration, 1); // Időarányos interpoláció
    const easeT = t * (2 - t); // Ease-out interpoláció

    // Pozíció interpoláció
    camera.position.set(
      targetPosition[0] * easeT + 30 * (1 - easeT), // Kezdeti pozíció: [30, 9.5, 34]
      targetPosition[1] * easeT + 9.5 * (1 - easeT),
      targetPosition[2] * easeT + 34 * (1 - easeT),
    );

    // Fov interpoláció
    camera.fov = 25 * (1 - easeT) + targetFov * easeT; // Kezdeti fov: 10
    camera.updateProjectionMatrix();

    if (t >= 1) {
      setIsAnimating(false); // Animáció vége
      // Az OrbitControls pozíciójának beállítása a kamera aktuális állapotára
      setControlsEnabled(true); // Engedélyezd az OrbitControls-t
    }
  });

  useEffect(() => {
    setControlsEnabled(false); // Letiltjuk az OrbitControls-t az animáció elején
  }, [setControlsEnabled]);

  return null;
};
