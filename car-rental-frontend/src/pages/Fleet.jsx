// src/pages/Fleet.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CarCard from '../components/CarCard';
import { carsData } from '../data/carsData';
import '../styles/Fleet.css';

const Fleet = () => {
  const [cars, setCars] = useState(carsData);
  const [filteredCars, setFilteredCars] = useState(carsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    priceRange: [0, 200],
    seating: 'all',
    transmission: 'all',
    fuelType: 'all'
  });
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique values for filter options
  const carTypes = ['all', ...new Set(carsData.map(car => car.type))];
  const seatingOptions = ['all', ...new Set(carsData.map(car => car.seats))].sort((a, b) => a - b);
  const transmissionOptions = ['all', ...new Set(carsData.map(car => car.transmission))];
  const fuelTypeOptions = ['all', ...new Set(carsData.map(car => car.fuelType))];

  // Apply filters and search
  useEffect(() => {
    let results = carsData;

    // Apply search term
    if (searchTerm) {
      results = results.filter(car =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.features.some(feature => 
          feature.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply filters
    if (filters.type !== 'all') {
      results = results.filter(car => car.type === filters.type);
    }

    if (filters.seating !== 'all') {
      results = results.filter(car => car.seats >= parseInt(filters.seating));
    }

    if (filters.transmission !== 'all') {
      results = results.filter(car => car.transmission === filters.transmission);
    }

    if (filters.fuelType !== 'all') {
      results = results.filter(car => car.fuelType === filters.fuelType);
    }

    // Apply price range
    results = results.filter(car => 
      car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Default sorting (featured)
        break;
    }

    setFilteredCars(results);
  }, [searchTerm, filters, sortBy]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      type: 'all',
      priceRange: [0, 200],
      seating: 'all',
      transmission: 'all',
      fuelType: 'all'
    });
    setSearchTerm('');
    setSortBy('featured');
  };

  return (
    <div className="fleet-page">
      {/* Header Section */}
      <div className="fleet-header">
        <h1>Our Vehicle Fleet</h1>
        <p>Choose from our wide selection of premium vehicles for any occasion</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="fleet-controls">
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search by make, model, or features..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="controls-right">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
            <option value="name">Name: A to Z</option>
          </select>

          <button 
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <i className="fas fa-filter"></i>
            Filters
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="fleet-content">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="filters-sidebar">
            <div className="filter-group">
              <h3>Vehicle Type</h3>
              <div className="filter-options">
                {carTypes.map(type => (
                  <label key={type} className="filter-option">
                    <input
                      type="radio"
                      name="type"
                      value={type}
                      checked={filters.type === type}
                      onChange={() => handleFilterChange('type', type)}
                    />
                    <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h3>Price Range</h3>
              <div className="price-range">
                <span>${filters.priceRange[0]} - ${filters.priceRange[1]}</span>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                />
              </div>
            </div>

            <div className="filter-group">
              <h3>Seating Capacity</h3>
              <div className="filter-options">
                {seatingOptions.map(seats => (
                  <label key={seats} className="filter-option">
                    <input
                      type="radio"
                      name="seating"
                      value={seats}
                      checked={filters.seating === seats}
                      onChange={() => handleFilterChange('seating', seats)}
                    />
                    <span>{seats === 'all' ? 'Any' : `${seats}+ Seats`}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h3>Transmission</h3>
              <div className="filter-options">
                {transmissionOptions.map(transmission => (
                  <label key={transmission} className="filter-option">
                    <input
                      type="radio"
                      name="transmission"
                      value={transmission}
                      checked={filters.transmission === transmission}
                      onChange={() => handleFilterChange('transmission', transmission)}
                    />
                    <span>{transmission === 'all' ? 'Any' : transmission}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h3>Fuel Type</h3>
              <div className="filter-options">
                {fuelTypeOptions.map(fuelType => (
                  <label key={fuelType} className="filter-option">
                    <input
                      type="radio"
                      name="fuelType"
                      value={fuelType}
                      checked={filters.fuelType === fuelType}
                      onChange={() => handleFilterChange('fuelType', fuelType)}
                    />
                    <span>{fuelType === 'all' ? 'Any' : fuelType}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="reset-filters" onClick={resetFilters}>
              Reset All Filters
            </button>
          </div>
        )}

        {/* Results Section */}
        <div className="fleet-results">
          <div className="results-header">
            <h2>{filteredCars.length} Vehicles Found</h2>
            <div className="view-options">
              <button className="view-option active">
                <i className="fas fa-th"></i>
              </button>
              <button className="view-option">
                <i className="fas fa-list"></i>
              </button>
            </div>
          </div>

          {filteredCars.length > 0 ? (
            <div className="cars-grid">
              {filteredCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <i className="fas fa-car"></i>
              <h3>No vehicles match your criteria</h3>
              <p>Try adjusting your filters or search term</p>
              <button className="btn-primary" onClick={resetFilters}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Fleet;