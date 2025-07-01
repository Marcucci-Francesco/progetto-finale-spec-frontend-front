import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VideoBackground from "../components/VideoBackground";
import { useGlobalContext } from "../context/GlobalContext";

function ComparePage() {
  const { cars, fetchCars } = useGlobalContext();

  const [firstId, setFirstId] = useState("");
  const [secondId, setSecondId] = useState("");
  const [firstCar, setFirstCar] = useState(null);
  const [secondCar, setSecondCar] = useState(null);

  useEffect(() => {
    if (cars.length === 0) fetchCars();
  }, [cars.length, fetchCars]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    async function loadDetails(id, setter) {
      if (!id) return setter(null);
      try {
        const res = await fetch(`${apiUrl}/carses/${id}`);
        const json = await res.json();
        setter(json.car || json.cars || json);
      } catch (err) {
        console.error("Errore fetch dettaglio", err);
        setter(null);
      }
    }

    loadDetails(firstId, setFirstCar);
    loadDetails(secondId, setSecondCar);
  }, [firstId, secondId]);

  const renderDetails = (car) => {
    if (!car) return <p className="text-white">Seleziona un'auto</p>;

    const {
      id,
      title,
      description,
      releaseYear,
      category,
      price,
      horsepower,
      topSpeed,
      fuel = [],
      transmission,
      image,
    } = car;

    return (
      <div
        className="text-white bg-dark bg-opacity-50 rounded p-3 d-flex flex-column"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        <h2 className="mb-3 text-center">{title}</h2>

        {image && (
          <img
            src={image}
            alt={title}
            className="img-fluid w-100 mb-3"
            style={{ maxHeight: "320px", objectFit: "cover" }}
          />
        )}

        <ul className="list-unstyled small mb-3">
          <li><strong>Anno:</strong> {releaseYear}</li>
          <li><strong>Categoria:</strong> {category}</li>
          <li><strong>Prezzo:</strong> € {price ? price.toLocaleString("it-IT") : "null"}</li>
          <li><strong>Cavalli:</strong> {horsepower} CV</li>
          <li><strong>Velocità Max:</strong> {topSpeed} km/h</li>
          <li><strong>Alimentazione:</strong> {Array.isArray(fuel) ? fuel.join(", ") : fuel || "null"}</li>
          <li><strong>Trasmissione:</strong> {transmission}</li>
          <li><strong>Descrizione:</strong> {description}</li>
        </ul>

        <Link to={`/cars/${id}`} className="btn btn-primary mt-auto text-center">
          Vai al dettaglio
        </Link>
      </div>
    );
  };

  return (
    <VideoBackground>
      <div className="container py-5 mt-5">
        <h1 className="text-white text-center mb-5 mt-4">Confronta i modelli</h1>

        <div className="row mb-4">
          <div className="col-md-6 mb-3 mb-md-0">
            <select
              className="form-select"
              value={firstId}
              onChange={(e) => setFirstId(e.target.value)}
            >
              <option value="">Seleziona la prima auto</option>
              {cars.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.title}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <select
              className="form-select"
              value={secondId}
              onChange={(e) => setSecondId(e.target.value)}
            >
              <option value="">Seleziona la seconda auto</option>
              {cars.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-6">{renderDetails(firstCar)}</div>
          <div className="col-md-6">{renderDetails(secondCar)}</div>
        </div>
      </div>
    </VideoBackground>
  );
}

export default ComparePage;
