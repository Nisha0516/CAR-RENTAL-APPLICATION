import React from "react";
import "../styles/carcard.css";

const CarCard = ({ car }) => {
  return (
    <div className="car-card">
      <img src={car.image} alt={car.name} />
      <h3>{car.name}</h3>
      <p>Price: ₹{car.price}/day</p>
      <button>Rent Now</button>
    </div>
  );
};

export default CarCard;
