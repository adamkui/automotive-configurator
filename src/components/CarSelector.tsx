import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { cars } from 'assets/cars';
import { Car } from 'models';
import { setActiveCar } from 'store/selections';
import { getCarPathname } from 'utils';

export const CarSelector: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectCar = (car: Car) => {
    dispatch(setActiveCar(car));
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
