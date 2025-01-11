import { Size, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setControlsEnabled } from 'store/controls';
import * as THREE from 'three';

export const ResponsiveCamera = () => {
  const targetWidth = 4;

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

export const CameraAnimation = () => {
  const dispatch = useDispatch();
  const {
    camera,
    scene,
  }: { camera: THREE.PerspectiveCamera; scene: THREE.Scene } = useThree();
  const initialFov = 8;
  const targetFov = 20;
  const targetPosition = [30, 11.5, 34];
  const targetRotationY = Math.PI / 2; // Negative rotation to go in the opposite direction
  const initialRotationY = -Math.PI / 2; // 30 degrees (Math.PI / 6 radians)
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
      targetPosition[1] * easeT + 11.5 * (1 - easeT),
      targetPosition[2] * easeT + 34 * (1 - easeT)
    );

    // Fov interpoláció
    camera.fov = initialFov * (1 - easeT) + targetFov * easeT; // Kezdeti fov: 10
    camera.updateProjectionMatrix();

    // Car rotation interpolation around the Y-axis (opposite direction with initial 30 degrees)
    const carRotationY = initialRotationY + targetRotationY * easeT; // Adding the initial 30 degrees (Math.PI / 6)
    scene.rotation.y = carRotationY; // Apply rotation to the scene (or car object)

    if (t >= 1) {
      setIsAnimating(false); // Animáció vége
      // Az OrbitControls pozíciójának beállítása a kamera aktuális állapotára
      dispatch(setControlsEnabled(true)); // Engedélyezzük az OrbitControls-t
    }
  });

  useEffect(() => {
    dispatch(setControlsEnabled(false)); // Letiltjuk az OrbitControls-t az animáció elején
  }, [setControlsEnabled]);

  return null;
};
