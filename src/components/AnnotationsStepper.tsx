import { FC } from 'react';
import { IoCaretBackOutline, IoCaretForwardOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';

import { useAppSelector } from 'store';
import { previousAnnotation, setActiveAnnotationIndex } from 'store/controls';

export const AnnotationsStepper: FC = () => {
  const dispatch = useDispatch();

  const { activeCar } = useAppSelector(
    ({ selectionsSlice }) => selectionsSlice
  );
  const { showAnnotations, activeAnnotationIndex } = useAppSelector(
    ({ controlsSlice }) => controlsSlice
  );

  if (!showAnnotations || !activeCar?.annotations?.length) return null;

  return (
    <div className="annotations-stepper-wrapper">
      <div className="annotations-stepper">
        <IoCaretBackOutline
          size={32}
          className="icon"
          onClick={() => dispatch(previousAnnotation())}
        />
        <h3>{`${activeAnnotationIndex} ${activeCar.annotations[activeAnnotationIndex - 1]?.label ?? ''}`}</h3>
        <IoCaretForwardOutline
          size={32}
          className="icon"
          onClick={() =>
            dispatch(
              setActiveAnnotationIndex(
                Math.min(
                  activeCar.annotations!.length,
                  activeAnnotationIndex + 1
                )
              )
            )
          }
        />
      </div>
    </div>
  );
};
