// src/pages/Cars.jsx
import React, { useEffect, useState } from "react";
import CarCard from "../components/CarCard";
//import { getCars } from "../services/api";
import "../styles/Cars.css";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getCars().then((data) => {
      if (mounted) setCars(data);
    }).finally(() => setLoading(false));
    return () => (mounted = false);
  }, []);

  return (
    <div className="page cars-page">
      <div className="page-header">
        <h2>Available Cars</h2>
      </div>

      {loading ? <p>Loading cars...</p> : (
        <div className="car-grid">
          {cars.length === 0 ? <p>No cars found.</p> : cars.map((c) => <CarCard key={c._id || c.id} car={c} />)}
        </div>
      )}
    </div>
  );
}
