import { FC } from 'react';
import { IoArrowBack, IoPauseSharp, IoPlayCircle } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { useAppSelector } from 'store';
import { setRotate } from 'store/controls';

export const Header: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activeCar, activeBodyColor } = useAppSelector(
    ({ selectionsSlice }) => selectionsSlice
  );
  const { canRotate } = useAppSelector(({ controlsSlice }) => controlsSlice);

  const colorName =
    activeCar?.colors?.find(({ hexCode }) => hexCode === activeBodyColor)
      ?.name || '';

  return (
    <header className="header">
      <div>
        <IoArrowBack size={28} className="icon" onClick={() => navigate('/')} />
      </div>
      <div className="header-center">
        <img
          src={activeCar?.brandLogoSrc}
          alt={`${activeCar?.name}-brand-logo`}
          className="header-brand-logo"
        />
        <div className="header-car">
          <h1>{activeCar?.name}</h1>
          <h5>{colorName}</h5>
        </div>
      </div>
      <div
        className="header-right"
        onClick={() => dispatch(setRotate(!canRotate))}
      >
        {canRotate ? (
          <IoPauseSharp size={32} className="icon" />
        ) : (
          <IoPlayCircle size={32} className="icon" />
        )}
      </div>
    </header>
  );
};
