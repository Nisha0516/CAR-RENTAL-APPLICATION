// src/components/CarCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Add this import
import '../styles/CarCard.css';

const CarCard = ({ car, showDetails = true }) => {
  return (
    <div className="car-card">
      <div className="car-image">
        <img src={car.image} alt={car.name} />
        <div className="car-badge">{car.type}</div>
        {car.isRecommended && (
          <div className="recommended-badge">
            <i className="fas fa-robot"></i> AI Recommended
          </div>
        )}
      </div>
      
      <div className="car-content">
        <h3>{car.name}</h3>
        <p className="car-make-model">{car.make} {car.model} • {car.year}</p>
        
        <div className="car-specs">
          <div className="spec">
            <i className="fas fa-users"></i>
            <span>{car.seats} Seats</span>
          </div>
          <div className="spec">
            <i className="fas fa-gas-pump"></i>
            <span>{car.fuelType}</span>
          </div>
          <div className="spec">
            <i className="fas fa-cog"></i>
            <span>{car.transmission}</span>
          </div>
        </div>
        
        <div className="car-features">
          {car.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="feature-tag">{feature}</span>
          ))}
          {car.features.length > 3 && (
            <span className="feature-tag">+{car.features.length - 3} more</span>
          )}
        </div>
        
        <div className="car-price">
          <div className="price">${car.price}/day</div>
          <div className="rating">
            <i className="fas fa-star"></i>
            <span>{car.rating} ({car.reviews} reviews)</span>
          </div>
        </div>
        
        {showDetails && (
          <div className="car-actions">
            {/* UPDATE THIS LINE - Replace button with Link */}
            <Link to={`/cars/${car.id}`} className="btn-primary">
              View Details
            </Link>
            <button className="btn-secondary">
              <i className="fas fa-heart"></i> Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarCard;