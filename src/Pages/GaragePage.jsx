import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import VideoBackground from "../components/VideoBackground";
import { useGlobalContext } from "../context/GlobalContext.jsx";

const GaragePage = () => {
  const { garage, cars, fetchCars, removeFromGarage } = useGlobalContext();

  useEffect(() => {
    if (cars.length === 0) fetchCars();
  }, [cars.length, fetchCars]);

  if (cars.length === 0) {
    return (
      <VideoBackground>
        <h1 className="d-flex justify-content-center align-items-center min-vh-100 text-white">
          Caricamento garage...
        </h1>
      </VideoBackground>
    );
  }

  const garageCars = cars.filter((car) => garage.includes(car.id));

  if (garageCars.length === 0) {
    return (
      <VideoBackground>
        <h1 className="d-flex justify-content-center align-items-center min-vh-100 text-white">
          Il tuo garage è vuoto.
        </h1>
      </VideoBackground>
    );
  }

  return (
    <VideoBackground>
      <div className="container mt-4 py-5">
        <h2 className="text-white text-center mt-5 mb-4">IL TUO GARAGE</h2>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          {garageCars.map((car) => (
            <div className="col" key={car.id}>
              <div className="card h-100 shadow">
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title text-center mb-3">{car.title}</h5>

                  <div className="d-flex justify-content-center gap-2 mt-auto">
                    <Link to={`/cars/${car.id}`} className="btn btn-primary">
                      Dettagli
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removeFromGarage(car.id)}
                    >
                      Rimuovi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </VideoBackground>
  );
};

export default GaragePage;