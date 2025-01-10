import { createContext, Dispatch, SetStateAction } from "react";

import { Car } from "assets/constants";

export const context = createContext<{
  activeCar: Car | undefined;
  setActiveCar: Dispatch<SetStateAction<Car | undefined>>;
} | null>(null);
