import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";

import { context } from "./Context";
import { Car, cars } from "assets/constants";
import { CarConfiguratorPage } from "pages/CarConfiguratorPage";
import { HomePage } from "pages/HomePage";
import { getCarPathname } from "utils";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [activeCar, setActiveCar] = useState<Car | undefined>();

  useEffect(() => {
    if (pathname && !activeCar) {
      const carByPathName = cars.find(
        ({ name }) => getCarPathname(name) === pathname,
      );

      if (!carByPathName) {
        navigate("/");
      } else {
        setActiveCar(carByPathName);
      }
    }
  }, []);

  return (
    <context.Provider value={{ activeCar, setActiveCar }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:carName" element={<CarConfiguratorPage />} />
      </Routes>
    </context.Provider>
  );
}

export default App;
