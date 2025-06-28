import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [car, setCar] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [garage, setGarage] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;


  const fetchCars = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/carses`);
      setCars(data);
    } catch (err) {
      console.error('Errore durante il caricamento delle auto:', err);
    }
  };


  const fetchCar = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/carses/${id}`);
      const data = await res.json();

      // Salviamo solo l’oggetto car vero
      setCar(data.cars);
    } catch (err) {
      console.error('Errore durante il caricamento della singola auto:', err);
    }
  };


  const toggleFavorites = (carId) => {
    setFavorites((prev) => {
      const isFav = prev.includes(carId);
      const updated = isFav ? prev.filter((id) => id !== carId) : [...prev, carId];
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const addToGarage = (carId) => {
    setGarage((prev) => {
      const updated = [...new Set([...prev, carId])];
      localStorage.setItem('garage', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromGarage = (carId) => {
    setGarage((prev) => {
      const updated = prev.filter((id) => id !== carId);
      localStorage.setItem('garage', JSON.stringify(updated));
      return updated;
    });
  };

  const value = {
    cars,
    car,
    favorites,
    garage,
    fetchCars,
    fetchCar,
    toggleFavorites,
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
