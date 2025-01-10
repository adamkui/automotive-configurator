import { FC } from "react";

import { CarSelector } from "components";

export const HomePage: FC = () => {
  return (
    <div className="home-page">
      <h3>Select your car to configure</h3>
      <CarSelector />
    </div>
  );
};
