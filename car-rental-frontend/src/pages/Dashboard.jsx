// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('book'); // 'book' or 'recommendations'
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mock carousel data
  const carouselItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      title: 'Luxury Experience',
      description: 'Premium vehicles for special occasions'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      title: 'Adventure Ready',
      description: 'SUVs and 4x4s for your next adventure'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      title: 'City Driving',
      description: 'Compact and efficient cars for urban life'
    }
  ];

  // Mock AI recommendations
  const aiRecommendations = [
    {
      id: 1,
      car: 'Tesla Model 3',
      reason: 'Based on your preference for eco-friendly vehicles',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80',
      price: '$89/day'
    },
    {
      id: 2,
      car: 'BMW 5 Series',
      reason: 'Matches your previous luxury sedan rentals',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80',
      price: '$109/day'
    },
    {
      id: 3,
      car: 'Toyota RAV4',
      reason: 'Perfect for your upcoming mountain trip',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80',
      price: '$75/day'
    }
  ];

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('loggedInUser'));
    if (userData) {
      setUser(userData);
    }

    // Auto-rotate carousel
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = '/';
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      {/* Navbar */}
      <header className="dashboard-navbar">
        <div className="nav-brand">
          <Link to="/" className="logo">
            <i className="fas fa-car"></i>RentPlus
          </Link>
        </div>
        <div className="nav-welcome">
          <h2>Welcome, {user.name}!</h2>
        </div>
        <div className="nav-actions">
          <button onClick={handleLogout} className="logout-btn">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </header>
      

      {/* Carousel */}
      <div className="carousel">
        <div className="carousel-inner" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {carouselItems.map((item, index) => (
            <div key={item.id} className="carousel-item">
              <img src={item.image} alt={item.title} />
              <div className="carousel-caption">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link to="/fleet" className="btn-primary">Explore Now</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-indicators">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              className={index === currentSlide ? 'active' : ''}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
        <button className="carousel-control prev" onClick={() => setCurrentSlide(currentSlide === 0 ? carouselItems.length - 1 : currentSlide - 1)}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="carousel-control next" onClick={() => setCurrentSlide(currentSlide === carouselItems.length - 1 ? 0 : currentSlide + 1)}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      {/* Toggle Section */}
      <div className="dashboard-toggle">
        <div className="toggle-buttons">
          <button 
            className={activeTab === 'book' ? 'active' : ''}
            onClick={() => setActiveTab('book')}
          >
            <i className="fas fa-calendar-check"></i> Book a Car
          </button>
          <button 
            className={activeTab === 'recommendations' ? 'active' : ''}
            onClick={() => setActiveTab('recommendations')}
          >
            <i className="fas fa-robot"></i> AI Recommendations
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {activeTab === 'book' ? (
          <div className="booking-section">
            <h2>Quick Booking</h2>
            <div className="booking-form">
              <div className="form-group">
                <label>Pickup Location</label>
                <input type="text" placeholder="Enter location" />
              </div>
              <div className="form-group">
                <label>Pickup Date</label>
                <input type="date" />
              </div>
              <div className="form-group">
                <label>Return Date</label>
                <input type="date" />
              </div>
              <div className="form-group">
                <label>Car Type</label>
                <select>
                  <option value="">Select car type</option>
                  <option value="economy">Economy</option>
                  <option value="suv">SUV</option>
                  <option value="luxury">Luxury</option>
                  <option value="sports">Sports</option>
                </select>
              </div>
              <button className="btn-primary">Search Available Cars</button>
            </div>

            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-grid">
                <Link to="/fleet" className="action-card">
                  <i className="fas fa-search"></i>
                  <h4>Browse Fleet</h4>
                  <p>Explore all available vehicles</p>
                </Link>
                <div className="action-card">
                  <i className="fas fa-history"></i>
                  <h4>Rental History</h4>
                  <p>View your past rentals</p>
                </div>
                <div className="action-card">
                  <i className="fas fa-heart"></i>
                  <h4>Favorites</h4>
                  <p>Your saved vehicles</p>
                </div>
                <div className="action-card">
                  <i className="fas fa-headset"></i>
                  <h4>Support</h4>
                  <p>24/7 customer service</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="recommendations-section">
            <h2>Smart AI Recommendations</h2>
            <p className="recommendations-subtitle">Our AI has analyzed your preferences and rental history to suggest these perfect matches</p>
            
            <div className="ai-recommendations">
              {aiRecommendations.map(rec => (
                <div key={rec.id} className="recommendation-card">
                  <div className="recommendation-image">
                    <img src={rec.image} alt={rec.car} />
                    <div className="ai-badge">
                      <i className="fas fa-robot"></i> AI Recommended
                    </div>
                  </div>
                  <div className="recommendation-content">
                    <h4>{rec.car}</h4>
                    <p className="recommendation-reason">{rec.reason}</p>
                    <div className="recommendation-price">{rec.price}</div>
                    <div className="recommendation-actions">
                      <button className="btn-primary">Book Now</button>
                      <button className="btn-secondary">View Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="ai-explanation">
              <h3>How our AI works</h3>
              <p>Our recommendation engine analyzes your rental history, preferences, and current needs to suggest the perfect vehicle for your next trip.</p>
              <div className="ai-features">
                <div className="ai-feature">
                  <i className="fas fa-history"></i>
                  <h4>Rental History</h4>
                  <p>Learns from your past choices</p>
                </div>
                <div className="ai-feature">
                  <i className="fas fa-map-marker-alt"></i>
                  <h4>Location Based</h4>
                  <p>Considers your destination</p>
                </div>
                <div className="ai-feature">
                  <i className="fas fa-weather"></i>
                  <h4>Weather Adaptive</h4>
                  <p>Suggests vehicles for conditions</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;