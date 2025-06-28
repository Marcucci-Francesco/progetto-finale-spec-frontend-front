// src/pages/DetailsPage.jsx
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import VideoBackground from '../components/VideoBackground';

const DetailsPage = () => {
  const { id } = useParams();
  const {
    car,
    fetchCar,
    toggleFavorites,
    addToGarage,
    removeFromGarage,
    favorites,
    garage,
  } = useGlobalContext();

  useEffect(() => {
    if (id) fetchCar(id);
  }, [id]);

  if (!car) {
    return (
      <VideoBackground>
        <div className="d-flex justify-content-center align-items-center vh-100 text-white">
          <h4>Caricamento...</h4>
        </div>
      </VideoBackground>
    );
  }

  const {
    id: carId,
    image,
    title,
    category,
    releaseYear,
    nationality,
    price,
    description,
  } = car;

  const isFavorite = favorites.includes(carId);
  const inGarage = garage.includes(carId);

  return (
    <VideoBackground>
      <div className="container d-flex justify-content-center align-items-center min-vh-100 py-5">
        <div className="card shadow-lg overflow-hidden" style={{ maxWidth: '900px', width: '100%' }}>
          <div className="row g-0">
            <div className="col-md-6">
              <img
                src={image}
                alt={title}
                className="img-fluid h-100 w-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <div className="card-body">
                <h2 className="card-title">{title}</h2>

                <ul className="list-inline text-muted mb-3">
                  <li className="list-inline-item"><strong>Categoria:</strong> {category}</li>
                  <li className="list-inline-item"><strong>Anno:</strong> {releaseYear}</li>
                  <li className="list-inline-item"><strong>Nazionalità:</strong> {nationality}</li>
                  <li className="list-inline-item">
                    <strong>Prezzo:</strong> € {price?.toLocaleString('it-IT') ?? 'n.d.'}
                  </li>
                </ul>

                <p className="card-text">{description}</p>

                <div className="d-flex gap-2 mt-4">
                  <button
                    onClick={() => toggleFavorites(carId)}
                    className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-secondary'}`}
                  >
                    {isFavorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
                  </button>

                  <button
                    onClick={() => inGarage ? removeFromGarage(carId) : addToGarage(carId)}
                    className={`btn ${inGarage ? 'btn-warning' : 'btn-primary'}`}
                  >
                    {inGarage ? 'Rimuovi dal garage' : 'Aggiungi al garage'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VideoBackground>
  );
};

export default DetailsPage;
