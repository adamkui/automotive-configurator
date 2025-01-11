import { FC, useEffect } from 'react';
import { IoCaretBackOutline, IoCaretForwardOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';

import { useAppSelector } from 'store';
import { nextAnnotation, previousAnnotation } from 'store/controls';

export const AnnotationsStepper: FC = () => {
  const dispatch = useDispatch();
  const { activeCar } = useAppSelector(
    ({ selectionsSlice }) => selectionsSlice
  );
  const { showAnnotations, activeAnnotationIndex } = useAppSelector(
    ({ controlsSlice }) => controlsSlice
  );

  const prev = () => {
    return dispatch(previousAnnotation());
  };

  const next = () => {
    if (!activeCar?.annotations?.length) return;
    return dispatch(nextAnnotation(activeCar.annotations.length));
  };

  const handleKeydownEvent = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prev();
      return;
    }

    if (e.key === 'ArrowRight') {
      next();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeydownEvent);

    return () => window.removeEventListener('keydown', handleKeydownEvent);
  }, [showAnnotations]);

  if (!showAnnotations || !activeCar?.annotations?.length) return null;

  return (
    <div className="annotations-stepper-wrapper">
      <div className="annotations-stepper">
        <IoCaretBackOutline size={32} className="icon" onClick={prev} />
        <h3>{`${activeAnnotationIndex}. ${activeCar.annotations[activeAnnotationIndex - 1]?.label ?? ''}`}</h3>
        <IoCaretForwardOutline size={32} className="icon" onClick={next} />
      </div>
    </div>
  );
};
