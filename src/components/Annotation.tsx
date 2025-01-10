import { Html } from '@react-three/drei';
import { useEffect, useState } from 'react';
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
  const dispatch = useDispatch();
  const { showAnnotations, activeAnnotationIndex } = useAppSelector(
    ({ controlsSlice }) => controlsSlice
  );

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

  return (
    <Html position={new Vector3(position.x, position.y, position.z)}>
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
  );
};
