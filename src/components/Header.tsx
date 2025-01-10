import { FC, useContext } from "react";

import { context } from "../Context";

export const Header: FC = () => {
  const contextValues = useContext(context);

  if (!contextValues) return null;

  const { activeCar } = contextValues;

  return (
    <header className="header">
      <img
        src={activeCar?.brandLogoSrc}
        alt={`${activeCar?.name}-brand-logo`}
        className="header-brand-logo"
      />
      <h1 className="header-carname">{activeCar?.name}</h1>
    </header>
  );
};
