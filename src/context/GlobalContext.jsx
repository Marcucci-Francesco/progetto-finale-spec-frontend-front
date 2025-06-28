import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [car, setCar] = useState({});
  const [favorites, setFavorites] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(stored);
  }, []);

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
      const { data } = await axios.get(`${apiUrl}/carses/${id}`);
      setCar(data);
    } catch (err) {
      console.error('Errore nel caricamento auto:', err);
    }
  };

  const toggleFavorites = (car) => {
    setFavorites((prev) => {
      const isFav = prev.some((f) => f.id === car.id);
      const updated = isFav ? prev.filter((f) => f.id !== car.id) : [...prev, car];
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <GlobalContext.Provider value={{ cars, fetchCars, fetchCar, car, favorites, toggleFavorites }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };

