// src/pages/CarDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { carsData } from '../data/carsData';
import '../styles/CarDetail.css';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [bookingDates, setBookingDates] = useState({
    pickupDate: '',
    returnDate: ''
  });

  useEffect(() => {
    const carData = carsData.find(c => c.id === parseInt(id));
    if (carData) {
      setCar(carData);
    } else {
      navigate('/fleet');
    }
  }, [id, navigate]);

  if (!car) {
    return (
      <div className="car-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading car details...</p>
      </div>
    );
  }

  // Mock additional images for the gallery
  const carImages = [
    car.image,
    car.image, // In a real app, you would have multiple images
    car.image,
    car.image
  ];

  const handleBooking = () => {
    // Save booking data to localStorage or context
    const bookingInfo = {
      carId: car.id,
      carName: car.name,
      carImage: car.image,
      price: car.price,
      ...bookingDates
    };
    
    localStorage.setItem('currentBooking', JSON.stringify(bookingInfo));
    navigate('/booking');
  };

  const calculateTotal = () => {
    if (bookingDates.pickupDate && bookingDates.returnDate) {
      const start = new Date(bookingDates.pickupDate);
      const end = new Date(bookingDates.returnDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return days * car.price;
    }
    return 0;
  };

  return (
    <div className="car-detail-page">
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/fleet">Our Fleet</Link>
        <span>/</span>
        <span>{car.name}</span>
      </nav>

      <div className="car-detail-container">
        {/* Car Images Gallery */}
        <div className="car-gallery">
          <div className="main-image">
            <img src={carImages[selectedImage]} alt={car.name} />
          </div>
          <div className="image-thumbnails">
            {carImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${car.name} view ${index + 1}`}
                className={selectedImage === index ? 'active' : ''}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Car Info and Booking Widget */}
        <div className="car-booking-section">
          <div className="car-info">
            <h1>{car.name}</h1>
            <div className="car-meta">
              <span className="car-type">{car.type}</span>
              <div className="car-rating">
                <i className="fas fa-star"></i>
                <span>{car.rating} ({car.reviews} reviews)</span>
              </div>
            </div>
            <p className="car-description">{car.description}</p>

            <div className="key-specs">
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
              <div className="spec">
                <i className="fas fa-door-closed"></i>
                <span>{car.doors} Doors</span>
              </div>
            </div>
          </div>

          {/* Booking Widget */}
          <div className="booking-widget">
            <h3>Book This Vehicle</h3>
            <div className="price-display">
              <span className="price">${car.price}</span>
              <span className="period">/ day</span>
            </div>

            <div className="date-selection">
              <div className="date-input">
                <label>Pickup Date</label>
                <input
                  type="date"
                  value={bookingDates.pickupDate}
                  onChange={(e) => setBookingDates({
                    ...bookingDates,
                    pickupDate: e.target.value
                  })}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="date-input">
                <label>Return Date</label>
                <input
                  type="date"
                  value={bookingDates.returnDate}
                  onChange={(e) => setBookingDates({
                    ...bookingDates,
                    returnDate: e.target.value
                  })}
                  min={bookingDates.pickupDate || new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            {calculateTotal() > 0 && (
              <div className="price-summary">
                <div className="summary-row">
                  <span>${car.price} × {Math.ceil((new Date(bookingDates.returnDate) - new Date(bookingDates.pickupDate)) / (1000 * 60 * 60 * 24))} days</span>
                  <span>${calculateTotal()}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>
            )}

            <button 
              className="book-now-btn"
              onClick={handleBooking}
              disabled={!bookingDates.pickupDate || !bookingDates.returnDate}
            >
              Book Now
            </button>

            <div className="location-info">
              <i className="fas fa-map-marker-alt"></i>
              <span>Available at: {car.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Details Tabs */}
      <div className="details-tabs">
        <div className="tabs-header">
          <button 
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={activeTab === 'specifications' ? 'active' : ''}
            onClick={() => setActiveTab('specifications')}
          >
            Specifications
          </button>
          <button 
            className={activeTab === 'features' ? 'active' : ''}
            onClick={() => setActiveTab('features')}
          >
            Features
          </button>
          <button 
            className={activeTab === 'reviews' ? 'active' : ''}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>

        <div className="tabs-content">
          {activeTab === 'overview' && (
            <div className="tab-panel">
              <h2>Vehicle Overview</h2>
              <p>{car.description}</p>
              <p>The {car.name} is a perfect choice for {car.type} enthusiasts looking for a reliable and comfortable vehicle. With its impressive features and excellent fuel efficiency, it's ideal for both city driving and long trips.</p>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="tab-panel">
              <h2>Technical Specifications</h2>
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Make & Model</span>
                  <span className="spec-value">{car.make} {car.model}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Year</span>
                  <span className="spec-value">{car.year}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Vehicle Type</span>
                  <span className="spec-value">{car.type}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Fuel Type</span>
                  <span className="spec-value">{car.fuelType}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Transmission</span>
                  <span className="spec-value">{car.transmission}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Seating Capacity</span>
                  <span className="spec-value">{car.seats} people</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Doors</span>
                  <span className="spec-value">{car.doors}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="tab-panel">
              <h2>Features & Amenities</h2>
              <div className="features-grid">
                {car.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <i className="fas fa-check-circle"></i>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="tab-panel">
              <h2>Customer Reviews</h2>
              <div className="reviews-summary">
                <div className="average-rating">
                  <div className="rating-number">{car.rating}</div>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star ${i < Math.floor(car.rating) ? 'filled' : ''}`}
                      ></i>
                    ))}
                  </div>
                  <div className="total-reviews">{car.reviews} reviews</div>
                </div>
              </div>

              <div className="reviews-list">
                <div className="review">
                  <div className="review-header">
                    <div className="reviewer">Rajesh K.</div>
                    <div className="review-rating">
                      <i className="fas fa-star filled"></i>
                      5.0
                    </div>
                  </div>
                  <p>"Excellent car! Very comfortable and efficient. The pickup was smooth and the vehicle was in perfect condition."</p>
                  <div className="review-date">October 15, 2023</div>
                </div>

                <div className="review">
                  <div className="review-header">
                    <div className="reviewer">Priya M.</div>
                    <div className="review-rating">
                      <i className="fas fa-star filled"></i>
                      4.5
                    </div>
                  </div>
                  <p>"Good vehicle for family trips. Spacious and comfortable. The fuel efficiency was better than expected."</p>
                  <div className="review-date">September 28, 2023</div>
                </div>

                <div className="review">
                  <div className="review-header">
                    <div className="reviewer">Amit S.</div>
                    <div className="review-rating">
                      <i className="fas fa-star filled"></i>
                      4.0
                    </div>
                  </div>
                  <p>"Decent car for the price. Had a small issue with the AC but the support team resolved it quickly."</p>
                  <div className="review-date">August 5, 2023</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Similar Vehicles Section */}
      <div className="similar-vehicles">
        <h2>Similar Vehicles</h2>
        <div className="similar-cars-grid">
          {carsData
            .filter(c => c.type === car.type && c.id !== car.id)
            .slice(0, 3)
            .map(similarCar => (
              <div key={similarCar.id} className="similar-car-card">
                <img src={similarCar.image} alt={similarCar.name} />
                <div className="similar-car-info">
                  <h4>{similarCar.name}</h4>
                  <div className="similar-car-price">${similarCar.price}/day</div>
                  <Link to={`/cars/${similarCar.id}`} className="view-similar-btn">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CarDetail;