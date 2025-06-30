import React, { useState, useEffect } from "react";
import VideoBackground from "../components/VideoBackground";
import { useGlobalContext } from "../context/GlobalContext";

const ComparePage = () => {
  const { cars, fetchCars } = useGlobalContext();

  const [firstId, setFirstId] = useState("");
  const [secondId, setSecondId] = useState("");
  const [firstCar, setFirstCar] = useState(null);
  const [secondCar, setSecondCar] = useState(null);

  useEffect(() => {
    if (cars.length === 0) fetchCars();
  }, [cars.length, fetchCars]);

  useEffect(() => {
    const findCar = (id) => cars.find((c) => c.id === Number(id)) || null;
    setFirstCar(findCar(firstId));
    setSecondCar(findCar(secondId));
  }, [firstId, secondId, cars]);

  const renderDetails = (car) => {
    if (!car) return <p className="text-white">Seleziona un'auto</p>;

    const {
      title,
      description,
      releaseYear,
      category,
      price,
      horsepower,
      topSpeed,
      fuel = [],
      transmission,
    } = car;

    return (
      <div className="text-white bg-dark bg-opacity-50 rounded p-3 h-100">
        <h4 className="mb-3 text-center">{title}</h4>
        <ul className="list-unstyled small mb-0">
          <li>
            <strong>Anno:</strong> {releaseYear ?? "n.d."}
          </li>
          <li>
            <strong>Categoria:</strong> {category ?? "n.d."}
          </li>
          <li>
            <strong>Prezzo:</strong> € {price ? price.toLocaleString("it-IT") : "n.d."}
          </li>
          <li>
            <strong>Cavalli:</strong> {horsepower ?? "n.d."} CV
          </li>
          <li>
            <strong>Velocità Max:</strong> {topSpeed ?? "n.d."} km/h
          </li>
          <li>
            <strong>Alimentazione:</strong>{" "}
            {Array.isArray(fuel) ? fuel.join(", ") : fuel || "n.d."}
          </li>
          <li>
            <strong>Trasmissione:</strong> {transmission ?? "n.d."}
          </li>
          <li>
            <strong>Descrizione:</strong> {description}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <VideoBackground>
      <div className="container py-5 mt-5">
        <h2 className="text-white text-center mb-5 mt-4">Confronta due auto</h2>

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
};

export default ComparePage;