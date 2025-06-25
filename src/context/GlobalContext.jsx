import { createContext, useContext, useState } from 'react';
import axios from 'axios';


const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  const searchCars = async (query) => {
    if (!query) {
      setResults([]);
      return;
    }

    try {
      const res = await axios.get(`${apiUrl / cars}`, { params: { q: query } });
      setResults(res.data);
    } catch (error) {
      console.error('Errore nella ricerca:', error);
      setResults([]);
    }
  };

  return (
    <GlobalContext.Provider value={{ results, searchCars }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };
