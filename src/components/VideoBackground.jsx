import React, { useState } from 'react';
import videoSrc from '../assets/video/home.mp4';
import { useGlobalContext } from '../context/GlobalContext.jsx';

const VideoBackground = () => {
  const { results, searchCars } = useGlobalContext();
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    searchCars(value);
    setShowDropdown(true);
  };

  return (
    <div className="position-relative w-100 vh-100 overflow-hidden">
      <video
        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50" />

      <div className="position-relative z-1 d-flex flex-column justify-content-center align-items-center h-100 text-white px-3 text-center">
        <h1 className="display-4 fw-bold mb-4">Benvenuto!</h1>

        <div className="w-100 position-relative" style={{ maxWidth: '500px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Cerca un modello..."
            value={query}
            onChange={handleChange}
            onFocus={() => query && setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)} // per cliccare sul dropdown
          />

          {showDropdown && results.length > 0 && (
            <ul className="dropdown-menu show w-100 mt-1 text-start">
              {results.map((item) => (
                <li key={item.id} className="dropdown-item">
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoBackground;
