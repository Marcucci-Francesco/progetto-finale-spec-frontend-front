import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VideoBackground from '../components/VideoBackground';
import { useGlobalContext } from '../context/GlobalContext.jsx';

const HomePage = () => {
  const { cars, fetchCars } = useGlobalContext();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [filtered, setFiltered] = useState([]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  useEffect(() => {
    let list = cars;

    if (category !== 'all') {
      list = list.filter(
        (c) =>
          c.category &&
          c.category.toLowerCase().trim() === category.toLowerCase().trim()
      );
    }

    if (query.trim()) {
      list = list.filter((c) =>
        c.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFiltered(list);
    setShowList(query.trim().length > 0 || category !== 'all');
  }, [cars, query, category]);

  const categories = [
    { label: 'Tutte le categorie', value: 'all' },
    { label: 'SUV', value: 'suv' },
    { label: 'Auto Sportiva', value: 'auto sportiva' },
    { label: 'Berlina', value: 'berlina' },
    { label: 'Berlina Sportiva', value: 'berlina sportiva' },
    { label: 'Gran Turismo', value: 'gran turismo' },
    { label: 'Supercar', value: 'supercar' },
    { label: 'Spider', value: 'spider' },
    { label: 'Hypercar', value: 'hypercar' },
    { label: 'Pickup', value: 'pickup' },
  ];

  return (
    <VideoBackground>
      <div className="d-flex flex-column justify-content-center align-items-center h-100 text-white px-3 text-center">
        <h1 className="display-4 fw-bold mb-4">Benvenuto!</h1>

        <div className="w-100" style={{ maxWidth: '700px' }}>
          <div className="d-flex mb-3 gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Cerca un modello..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ minHeight: '250px' }}>
            {showList && (
              filtered.length > 0 ? (
                <ul
                  className="list-group text-start overflow-auto"
                  style={{
                    maxHeight: '250px',
                    borderRadius: '0.25rem',
                    backgroundColor: 'white',
                  }}
                >
                  {filtered.map((item) => (
                    <li
                      key={item.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span>{item.title}</span>
                      <Link to={`/cars/${item.id}`} className="btn btn-sm btn-primary">
                        Dettagli
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white mt-3">Nessun risultato trovato.</p>
              )
            )}
          </div>
        </div>
      </div>
    </VideoBackground>
  );
};

export default HomePage;