// src/pages/AIRecommendations.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AIRecommendation.css';

const AIRecommendations = () => {
  const [user, setUser] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [preferences, setPreferences] = useState({
    budget: 3,
    comfort: 3,
    ecoFriendly: 3,
    techFeatures: 3
  });

  // Mock AI recommendations data
  const mockRecommendations = [
    {
      id: 1,
      car: 'Tesla Model 3',
      reason: 'Based on your preference for eco-friendly vehicles',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80',
      price: 89,
      type: 'electric',
      features: ['Autopilot', 'Premium Interior', 'Over-the-air Updates'],
      matchScore: 92,
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      car: 'BMW 5 Series',
      reason: 'Matches your previous luxury sedan rentals',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80',
      price: 109,
      type: 'luxury',
      features: ['Heated Seats', 'Premium Sound System', 'Parking Assistant'],
      matchScore: 88,
      rating: 4.6,
      reviews: 89
    },
    {
      id: 3,
      car: 'Toyota RAV4 Hybrid',
      reason: 'Perfect for your upcoming mountain trip',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80',
      price: 75,
      type: 'suv',
      features: ['All-Wheel Drive', 'Spacious Interior', 'Hybrid Efficiency'],
      matchScore: 85,
      rating: 4.7,
      reviews: 156
    },
    {
      id: 4,
      car: 'Porsche 911',
      reason: 'Special occasion vehicle based on your anniversary next week',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      price: 199,
      type: 'sports',
      features: ['Premium Performance', 'Sport Chrono Package', 'Premium Sound'],
      matchScore: 79,
      rating: 4.9,
      reviews: 67
    },
    {
      id: 5,
      car: 'Honda Civic',
      reason: 'Economical choice for your daily commute',
      image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      price: 45,
      type: 'economy',
      features: ['Fuel Efficient', 'Apple CarPlay', 'Reliable'],
      matchScore: 76,
      rating: 4.5,
      reviews: 203
    },
    {
      id: 6,
      car: 'Ford Mustang Mach-E',
      reason: 'Electric performance based on your interest in sports cars',
      image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      price: 95,
      type: 'electric',
      features: ['Extended Range', 'BlueCruise', 'Premium Sound System'],
      matchScore: 83,
      rating: 4.6,
      reviews: 92
    }
  ];

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('loggedInUser'));
    if (userData) {
      setUser(userData);
    }

    // Simulate API call to get recommendations
    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setLoading(false);
    }, 1500);
  }, []);

  const handlePreferenceChange = (preference, value) => {
    setPreferences(prev => ({
      ...prev,
      [preference]: value
    }));
  };

  const handleFeedback = (recommendationId, isPositive) => {
    // In a real app, this would send feedback to the backend
    console.log(`Feedback for ${recommendationId}: ${isPositive ? 'positive' : 'negative'}`);
    
    // Update UI to show feedback was received
    setRecommendations(prev => prev.map(rec => 
      rec.id === recommendationId 
        ? {...rec, feedback: isPositive ? 'positive' : 'negative'} 
        : rec
    ));
  };

  const filteredRecommendations = activeFilter === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.type === activeFilter);

  if (loading) {
    return (
      <div className="ai-recommendations-page">
        <div className="loading-container">
          <div className="ai-loader">
            <i className="fas fa-robot"></i>
            <p>Our AI is finding your perfect matches...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-recommendations-page">
      {/* Header */}
      <header className="ai-header">
        <div className="container">
          <h1>
            <i className="fas fa-robot"></i> AI Recommendations
          </h1>
          <p>Personalized vehicle suggestions just for you</p>
        </div>
      </header>

      {/* Preference Settings */}
      <section className="preference-settings">
        <div className="container">
          <h2>Fine-tune Your Preferences</h2>
          <div className="preference-sliders">
            <div className="slider-group">
              <label>Budget</label>
              <input 
                type="range" 
                min="1" 
                max="5" 
                value={preferences.budget}
                onChange={(e) => handlePreferenceChange('budget', parseInt(e.target.value))}
              />
              <div className="slider-labels">
                <span>Economy</span>
                <span>Luxury</span>
              </div>
            </div>
            
            <div className="slider-group">
              <label>Comfort</label>
              <input 
                type="range" 
                min="1" 
                max="5" 
                value={preferences.comfort}
                onChange={(e) => handlePreferenceChange('comfort', parseInt(e.target.value))}
              />
              <div className="slider-labels">
                <span>Basic</span>
                <span>Premium</span>
              </div>
            </div>
            
            <div className="slider-group">
              <label>Eco-Friendliness</label>
              <input 
                type="range" 
                min="1" 
                max="5" 
                value={preferences.ecoFriendly}
                onChange={(e) => handlePreferenceChange('ecoFriendly', parseInt(e.target.value))}
              />
              <div className="slider-labels">
                <span>Standard</span>
                <span>Eco</span>
              </div>
            </div>
            
            <div className="slider-group">
              <label>Tech Features</label>
              <input 
                type="range" 
                min="1" 
                max="5" 
                value={preferences.techFeatures}
                onChange={(e) => handlePreferenceChange('techFeatures', parseInt(e.target.value))}
              />
              <div className="slider-labels">
                <span>Basic</span>
                <span>Advanced</span>
              </div>
            </div>
          </div>
          <button className="btn-primary" onClick={() => setLoading(true)}>
            <i className="fas fa-sync"></i> Update Recommendations
          </button>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="recommendation-filters">
        <div className="container">
          <h2>Your Personalized Matches</h2>
          <div className="filter-buttons">
            <button 
              className={activeFilter === 'all' ? 'active' : ''}
              onClick={() => setActiveFilter('all')}
            >
              All Recommendations
            </button>
            <button 
              className={activeFilter === 'electric' ? 'active' : ''}
              onClick={() => setActiveFilter('electric')}
            >
              Electric Vehicles
            </button>
            <button 
              className={activeFilter === 'suv' ? 'active' : ''}
              onClick={() => setActiveFilter('suv')}
            >
              SUVs
            </button>
            <button 
              className={activeFilter === 'luxury' ? 'active' : ''}
              onClick={() => setActiveFilter('luxury')}
            >
              Luxury
            </button>
            <button 
              className={activeFilter === 'sports' ? 'active' : ''}
              onClick={() => setActiveFilter('sports')}
            >
              Sports
            </button>
          </div>
        </div>
      </section>

      {/* Recommendations Grid */}
      <section className="recommendations-grid">
        <div className="container">
          {filteredRecommendations.length > 0 ? (
            <div className="recommendations-list">
              {filteredRecommendations.map(rec => (
                <div key={rec.id} className="recommendation-card">
                  <div className="card-header">
                    <div className="ai-match-badge">
                      <i className="fas fa-robot"></i> {rec.matchScore}% Match
                    </div>
                    {rec.feedback && (
                      <div className={`feedback-badge ${rec.feedback}`}>
                        {rec.feedback === 'positive' ? (
                          <><i className="fas fa-thumbs-up"></i> Liked</>
                        ) : (
                          <><i className="fas fa-thumbs-down"></i> Not interested</>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="vehicle-image">
                    <img src={rec.image} alt={rec.car} />
                    <div className="vehicle-type">{rec.type}</div>
                  </div>
                  
                  <div className="card-content">
                    <h3>{rec.car}</h3>
                    <p className="recommendation-reason">{rec.reason}</p>
                    
                    <div className="vehicle-features">
                      {rec.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="feature-tag">{feature}</span>
                      ))}
                      {rec.features.length > 2 && (
                        <span className="feature-tag">+{rec.features.length - 2} more</span>
                      )}
                    </div>
                    
                    <div className="rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <i 
                            key={i} 
                            className={`fas fa-star ${i < Math.floor(rec.rating) ? 'filled' : ''}`}
                          ></i>
                        ))}
                      </div>
                      <span className="rating-text">{rec.rating} ({rec.reviews} reviews)</span>
                    </div>
                    
                    <div className="price">${rec.price}/day</div>
                    
                    <div className="card-actions">
                      <button className="btn-primary">
                        <i className="fas fa-calendar-check"></i> Book Now
                      </button>
                      <button className="btn-secondary">
                        <i className="fas fa-info-circle"></i> Details
                      </button>
                    </div>
                    
                    <div className="feedback-actions">
                      <span>Is this recommendation helpful?</span>
                      <button 
                        className={`feedback-btn ${rec.feedback === 'positive' ? 'active' : ''}`}
                        onClick={() => handleFeedback(rec.id, true)}
                      >
                        <i className="fas fa-thumbs-up"></i>
                      </button>
                      <button 
                        className={`feedback-btn ${rec.feedback === 'negative' ? 'active' : ''}`}
                        onClick={() => handleFeedback(rec.id, false)}
                      >
                        <i className="fas fa-thumbs-down"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-recommendations">
              <i className="fas fa-search"></i>
              <h3>No recommendations match your current filters</h3>
              <p>Try adjusting your filters or preferences to see more options</p>
              <button 
                className="btn-secondary"
                onClick={() => setActiveFilter('all')}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* AI Explanation Section */}
      <section className="ai-explanation">
        <div className="container">
          <h2>How Our AI Finds Your Perfect Match</h2>
          <div className="explanation-grid">
            <div className="explanation-card">
              <div className="explanation-icon">
                <i className="fas fa-history"></i>
              </div>
              <h3>Rental History Analysis</h3>
              <p>We analyze your past rentals to understand your preferences for vehicle types, features, and rental patterns.</p>
            </div>
            
            <div className="explanation-card">
              <div className="explanation-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>Location Intelligence</h3>
              <p>Based on your destination and current location, we suggest vehicles suited for your route and local conditions.</p>
            </div>
            
            <div className="explanation-card">
              <div className="explanation-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <h3>Trip Context Awareness</h3>
              <p>We consider the purpose of your trip, duration, and number of passengers to find the perfect vehicle.</p>
            </div>
            
            <div className="explanation-card">
              <div className="explanation-icon">
                <i className="fas fa-cloud-sun"></i>
              </div>
              <h3>Weather Adaptation</h3>
              <p>Our system checks weather forecasts for your rental period to recommend suitable vehicles for the conditions.</p>
            </div>
            
            <div className="explanation-card">
              <div className="explanation-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Collaborative Filtering</h3>
              <p>We learn from users with similar profiles and preferences to discover vehicles you might love.</p>
            </div>
            
            <div className="explanation-card">
              <div className="explanation-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Real-time Availability</h3>
              <p>Our recommendations prioritize currently available vehicles and consider peak pricing patterns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Privacy Section */}
      <section className="privacy-section">
        <div className="container">
          <h2>Your Privacy Matters</h2>
          <p>
            We use your data only to improve your experience. You can always 
            <button className="privacy-btn">adjust your privacy settings</button> 
            or 
            <button className="privacy-btn">clear your rental history</button> 
            at any time.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AIRecommendations;