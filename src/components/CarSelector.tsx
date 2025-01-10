import { FC, useContext } from "react";
import { useNavigate } from "react-router";

import { cars } from "assets/cars";
import { Car } from "models";
import { getCarPathname } from "utils";
import { context } from "../Context";

export const CarSelector: FC = () => {
  const navigate = useNavigate();
  const contextValues = useContext(context);

  if (!contextValues) return null;

  const { setActiveCar } = contextValues;

  const selectCar = (car: Car) => {
    setActiveCar(car);
    navigate(getCarPathname(car.name));
  };

  return (
    <div className="car-list">
      {cars.map((car) => {
        return (
          <div
            key={car.name}
            className="car-option"
            style={{ backgroundImage: `url(${car.imageSrc})` }}
            onClick={() => selectCar(car)}
          >
            <h1>{car.name}</h1>
          </div>
        );
      })}
    </div>
  );
};
