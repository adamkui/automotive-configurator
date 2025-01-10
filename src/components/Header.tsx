import { FC, useContext } from 'react';

import { context } from '../Context';

export const Header: FC = () => {
  const contextValues = useContext(context);

  if (!contextValues) return null;

  const { activeCar, activeBodyColor } = contextValues;

  const colorName =
    activeCar?.colors?.find(({ hexCode }) => hexCode === activeBodyColor)
      ?.name || '';

  return (
    <header className="header">
      <img
        src={activeCar?.brandLogoSrc}
        alt={`${activeCar?.name}-brand-logo`}
        className="header-brand-logo"
      />
      <div className="header-car">
        <h1>{activeCar?.name}</h1>
        <h5>{colorName}</h5>
      </div>
    </header>
  );
};
