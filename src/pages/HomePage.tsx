import { FC } from 'react';

import { CarSelector, Legal } from 'components';

export const HomePage: FC = () => {
  return (
    <div className="home-page">
      <CarSelector />
      <Legal />
    </div>
  );
};
