import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router';

import { cars } from 'assets/cars';
import { Car } from 'models';
import { CarConfiguratorPage } from 'pages/CarConfiguratorPage';
import { HomePage } from 'pages/HomePage';
import { getCarPathname } from 'utils';
import { context } from './Context';

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [activeCar, setActiveCar] = useState<Car | undefined>();
  const [activeBodyColor, setActiveBodyColor] = useState<string | undefined>();

  useEffect(() => {
    if (pathname && !activeCar) {
      const carByPathName = cars.find(
        ({ name }) => getCarPathname(name) === pathname
      );

      if (!carByPathName) {
        navigate('/');
      } else {
        setActiveCar(carByPathName);
      }
    }
  }, []);

  return (
    <context.Provider
      value={{ activeCar, setActiveCar, activeBodyColor, setActiveBodyColor }}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:carName" element={<CarConfiguratorPage />} />
      </Routes>
    </context.Provider>
  );
}

export default App;
