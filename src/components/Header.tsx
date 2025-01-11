import classNames from 'classnames';
import { FC } from 'react';
import { BiSolidHide } from 'react-icons/bi';
import { HiAnnotation } from 'react-icons/hi';
import { IoArrowBack, IoPauseSharp, IoPlayCircle } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { useAppSelector } from 'store';
import { toggleAnnotations, toggleRotation } from 'store/controls';
import { AnnotationsStepper } from './AnnotationsStepper';

export const Header: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activeCar, activeBodyColor } = useAppSelector(
    ({ selectionsSlice }) => selectionsSlice
  );
  const { canRotate, showAnnotations } = useAppSelector(
    ({ controlsSlice }) => controlsSlice
  );

  const colorName =
    activeCar?.colors?.find(({ hexCode }) => hexCode === activeBodyColor)
      ?.name || '';

  const setRotation = () => {
    dispatch(toggleRotation());
  };

  const setAnnotations = () => {
    dispatch(toggleAnnotations());
  };

  return (
    <>
      <header className="header">
        <div>
          <IoArrowBack
            size={28}
            className="icon"
            onClick={() => navigate('/')}
          />
        </div>
        <div className="header-center">
          <img
            src={activeCar?.brandLogoSrc}
            alt={`${activeCar?.name}-brand-logo`}
            className="header-brand-logo"
          />
          <div className="header-car">
            <h1>{activeCar?.name}</h1>
            <h4>{colorName}</h4>
          </div>
        </div>
        <div className="header-right">
          {canRotate ? (
            <IoPauseSharp size={32} className="icon" onClick={setRotation} />
          ) : (
            <IoPlayCircle
              size={32}
              className={classNames('icon', { disabled: showAnnotations })}
              onClick={setRotation}
            />
          )}
          {showAnnotations ? (
            <BiSolidHide size={32} className="icon" onClick={setAnnotations} />
          ) : (
            <HiAnnotation size={32} className="icon" onClick={setAnnotations} />
          )}
        </div>
        <AnnotationsStepper />
      </header>
    </>
  );
};
