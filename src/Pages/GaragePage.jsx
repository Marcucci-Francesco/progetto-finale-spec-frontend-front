import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VideoBackground from "../components/VideoBackground";
import { useGlobalContext } from "../context/GlobalContext.jsx";

const GaragePage = () => {
  const { garage } = useGlobalContext();
  const [garageCars, setGarageCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGarageCars = async () => {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL;

      const detailed = await Promise.all(
        garage.map(async (id) => {
          try {
            const res = await fetch(`${apiUrl}/carses/${id}`);
            const json = await res.json();
            return json.car || json.cars || json;
          } catch (err) {
            console.error("Errore nel fetch dell'auto:", err);
            return null;
          }
        })
      );

      setGarageCars(detailed.filter(Boolean));
      setLoading(false);
    };

    if (garage.length > 0) {
      loadGarageCars();
    } else {
      setGarageCars([]);
      setLoading(false);
    }
  }, [garage]);

  if (loading) {
    return (
      <VideoBackground>
        <h1 className="d-flex justify-content-center align-items-center min-vh-100 text-white playfair">
          Caricamento garage...
        </h1>
      </VideoBackground>
    );
  }

  if (garageCars.length === 0) {
    return (
      <VideoBackground>
        <h1 className="d-flex justify-content-center align-items-center min-vh-100 text-white playfair">
          Il tuo garage è vuoto.
        </h1>
      </VideoBackground>
    );
  }


  return (
    <VideoBackground>
      <div className="container mt-4 py-5 playfair">
        <h2 className="text-white text-center mt-5 mb-4">IL TUO GARAGE</h2>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          {garageCars.map((car) => {
            const imgSrc = car.image;

            return (
              <div className="col" key={car.id}>
                <div className="card h-100 shadow">
                  <img
                    src={imgSrc}
                    alt={car.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />

                  <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="card-title text-center mb-3">{car.title}</h5>

                    <div className="d-flex justify-content-center gap-2 mt-auto">
                      <Link to={`/cars/${car.id}`} className="btn btn-primary">
                        Dettagli
                      </Link>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => setGarageCars((prev) => prev.filter((c) => c.id !== car.id))}
                      >
                        Rimuovi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </VideoBackground>
  );
};

export default GaragePage;

