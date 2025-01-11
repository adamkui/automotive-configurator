import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from 'store';
import { setActiveAnnotationIndex } from 'store/controls';
import { Vector3 } from 'three';

interface AnnotationProps {
  position: { x: number; y: number; z: number };
  index: number;
  label: string;
  description: string;
}

export const Annotation = ({
  description,
  index,
  label,
  position,
}: AnnotationProps) => {
  const markerRef = useRef<any>(null);
  const dispatch = useDispatch();
  const { controlsSlice, selectionsSlice } = useAppSelector((state) => state);

  const { activeAnnotationIndex, showAnnotations } = controlsSlice;
  const { activeCar } = selectionsSlice;

  const [isOpen, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!showAnnotations && isOpen) {
      setOpen(false);
    }
  }, [showAnnotations]);

  useEffect(() => {
    if (activeAnnotationIndex !== index && isOpen) {
      setOpen(false);
      return;
    }

    if (activeAnnotationIndex === index) {
      setOpen(true);
    }
  }, [activeAnnotationIndex]);

  const toggleAnnotation = () => {
    if (!showAnnotations) {
      return;
    }

    if (activeAnnotationIndex !== index) {
      dispatch(setActiveAnnotationIndex(index));
    }

    setOpen(!isOpen);
  };

  useEffect(() => {}, [showAnnotations, activeAnnotationIndex]);

  const vec = new Vector3();

  useFrame((state) => {
    const targetPosition =
      activeCar?.annotations?.[activeAnnotationIndex - 1].cameraPosition;

    if (!showAnnotations || activeAnnotationIndex !== index || !targetPosition)
      return;

    const { x, y, z } = targetPosition;

    state.camera.lookAt(markerRef.current?.position);
    state.camera.position.lerp(vec.set(x, y, z), 0.01);
    state.camera.updateProjectionMatrix();

    return null;
  });

  return (
    <mesh ref={markerRef}>
      <Html
        position={new Vector3(position.x, position.y, position.z)}
        distanceFactor={15}
      >
        {showAnnotations ? (
          <div className="annotation">
            <button className="annotation-circle" onClick={toggleAnnotation}>
              {index}
            </button>
            {isOpen ? (
              <div className="annotation-box">
                <h3>{label}</h3>
                <p>{description}</p>
              </div>
            ) : null}
          </div>
        ) : null}
      </Html>
    </mesh>
  );
};
