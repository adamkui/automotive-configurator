import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router';

import { cars } from 'assets/cars';
import { CarConfiguratorPage } from 'pages/CarConfiguratorPage';
import { HomePage } from 'pages/HomePage';
import store, { useAppSelector } from 'store';
import { setActiveCar } from 'store/selections';
import { getCarPathname } from 'utils';

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activeCar } = useAppSelector(
    ({ selectionsSlice }) => selectionsSlice
  );

  useEffect(() => {
    if (pathname && !activeCar) {
      const carByPathName = cars.find(
        ({ name }) => getCarPathname(name) === pathname
      );

      if (!carByPathName) {
        navigate('/');
      } else {
        dispatch(setActiveCar(carByPathName));
      }
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:carName" element={<CarConfiguratorPage />} />
    </Routes>
  );
}

export default App;
