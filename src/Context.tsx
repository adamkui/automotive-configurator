import { createContext, Dispatch, SetStateAction } from 'react';

import { Car } from 'models';

export const context = createContext<{
  activeCar: Car | undefined;
  setActiveCar: Dispatch<SetStateAction<Car | undefined>>;
  activeBodyColor: string | undefined;
  setActiveBodyColor: Dispatch<SetStateAction<string | undefined>>;
} | null>(null);
