// src/pages/CarDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
//import { getCarById } from "../services/api";
import "../styles/CarDetails.css";

export default function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCarById(id).then((c) => setCar(c)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="page"><p>Loading...</p></div>;
  if (!car) return <div className="page"><p>Car not found</p></div>;

  return (
    <div className="page cardetails-page">
      <div className="cardetails">
        <div className="cardetails-left">
          {car.images && car.images.length > 0 ? (
            <img src={car.images[0]} alt={`${car.brand} ${car.model}`} />
          ) : <div className="no-img-large">No Image</div>}
        </div>
        <div className="cardetails-right">
          <h2>{car.brand} {car.model}</h2>
          <p className="muted">{car.type} • {car.city}</p>
          <p><strong>Price per day:</strong> ₹{car.basePricePerDay}</p>
          <p><strong>Owner:</strong> {car.ownerName || "Individual Owner"}</p>
          <p>{car.description || "No description provided."}</p>

          <div style={{ marginTop: 16 }}>
            <Link to={`/booking/${car._id}`} className="btn-primary">Book This Car</Link>
            <Link to="/cars" className="btn-outline" style={{ marginLeft: 8 }}>Back</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
