import { Dispatch, FC, SetStateAction, useContext } from 'react';
import { IoArrowBack, IoPlayCircle, IoPauseSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router';

import { context } from '../Context';

interface HeaderProps {
  canRotate: boolean;
  setRotate: Dispatch<SetStateAction<boolean>>;
}

export const Header: FC<HeaderProps> = ({ canRotate, setRotate }) => {
  const navigate = useNavigate();
  const contextValues = useContext(context);

  if (!contextValues) return null;

  const { activeCar, activeBodyColor } = contextValues;

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
      <div className="header-right" onClick={() => setRotate(!canRotate)}>
        {canRotate ? (
          <IoPauseSharp size={32} className="icon" />
        ) : (
          <IoPlayCircle size={32} className="icon" />
        )}
      </div>
    </header>
  );
};
