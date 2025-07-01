import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [car, setCar] = useState(null);
  const [garage, setGarage] = useState([]);


  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchCars = async () => {
    try {
      const res = await fetch(`${apiUrl}/carses`);
      const data = await res.json();

      setCars(data.cars || data);

    } catch (err) {
      console.error('Errore nel fetch delle auto:', err);
    }
  };

  const fetchCar = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/carses/${id}`);
      const data = await res.json();

      setCar(data.cars);
    } catch (err) {
      console.error('Errore durante il caricamento della singola auto:', err);
    }
  };

  const addToGarage = (id) => {
    if (!garage.includes(id)) setGarage(prev => [...prev, id]);
  };

  const removeFromGarage = (id) => {
    setGarage(prev => prev.filter(carId => carId !== id));
  };

  const value = {
    cars,
    car,
    garage,
    fetchCars,
    fetchCar,
    addToGarage,
    removeFromGarage,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };
