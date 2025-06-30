import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import VideoBackground from "../components/VideoBackground";

const DetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    car,
    fetchCar,
    addToGarage,
    removeFromGarage,
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
    transmission,
    transmissionRatios,
    fuel,
    horsepower,
    doors,
    topSpeed,
  } = car;

  const inGarage = garage.includes(carId);

  return (
    <VideoBackground>
      <div className="container d-flex flex-column align-items-start min-vh-100 py-5 mt-5">

        <button
          type="button"
          className="btn btn-secondary mb-4 d-flex align-items-center gap-2 mt-4"
          onClick={() => navigate(-1)}
        >
          <span className="fs-5">&#8592;</span>
          <span>Indietro</span>
        </button>

        <div
          className="card shadow-lg w-100"
          style={{ maxWidth: "1200px", height: "60vh" }}
        >
          <div className="row g-0 h-100">

            <div className="col-md-6">
              <img
                src={image}
                alt={title}
                className="img-fluid w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="col-md-6 d-flex flex-column h-100">
              <div className="flex-grow-1 overflow-auto p-4">
                <h2 className="card-title mb-3">{title}</h2>

                <ul className="list-group text-muted mb-3">
                  <li className="list-group-item">
                    <strong>Categoria:</strong> {category}
                  </li>
                  <li className="list-group-item">
                    <strong>Anno:</strong> {releaseYear}
                  </li>
                  <li className="list-group-item">
                    <strong>Nazionalità:</strong> {nationality}
                  </li>
                  <li className="list-group-item">
                    <strong>Prezzo:</strong> € {price?.toLocaleString("it-IT") ?? "n.d."}
                  </li>
                </ul>

                <h4>Descrizione</h4>
                <p>{description}</p>

                <h4>Dettagli tecnici</h4>
                <ul className="list-group text-muted mb-4">
                  <li className="list-group-item">
                    <strong>Alimentazione:</strong> {fuel}
                  </li>
                  <li className="list-group-item">
                    <strong>Cambio:</strong> {transmission}
                  </li>
                  <li className="list-group-item">
                    <strong>Rapporti:</strong> {transmissionRatios ?? 2}
                  </li>
                  <li className="list-group-item">
                    <strong>Potenza:</strong> {horsepower} CV
                  </li>
                  <li className="list-group-item">
                    <strong>Velocità massima:</strong> {topSpeed} Km/h
                  </li>
                  <li className="list-group-item">
                    <strong>Porte:</strong> {doors}
                  </li>
                </ul>

                <button
                  className={`btn ${inGarage ? "btn-warning" : "btn-primary"}`}
                  onClick={() =>
                    inGarage ? removeFromGarage(carId) : addToGarage(carId)
                  }
                >
                  {inGarage ? "Rimuovi dal garage" : "Aggiungi al garage"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VideoBackground>
  );
};

export default DetailsPage;
