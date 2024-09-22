import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFilter, FaTimes } from 'react-icons/fa';
import './SideBar.css';

// const continents = [
//   { code: '', name: 'All Continents' },
//   { code: 'Europe', name: 'Europe' },
//   { code: 'Asia', name: 'Asia' },
//   { code: 'Africa', name: 'Africa' },
//   { code: 'North America', name: 'North America' },
//   { code: 'South America', name: 'South America' },
//   { code: 'Oceania', name: 'Oceania' },
// ];

const countries = [
  'All Countries', 'France', 'Peru', 'China', 'Greece', 'United States', 'Tanzania', 'Japan',
  'Norway', 'Cambodia', 'Indonesia', 'Maldives', 'Morocco', 'Uganda', 'Egypt', 'South Africa',
  'Zambia', 'Canada', 'Mexico', 'Brazil', 'Argentina', 'Ecuador', 'Australia', 'New Zealand',
  'Fiji', 'French Polynesia'
];

const tourTypes = [
  'Sightseeing', 'Cultural', 'Historical', 'Adventure', 'Beach', 'Nature'
];

const Sidebar = ({ onFilterChange, isOpen, toggleSidebar, initialCountry }) => {
  const [rating, setRating] = useState(0);
  const [country, setCountry] = useState(initialCountry || '');
  const [selectedTourTypes, setSelectedTourTypes] = useState([]);

  useEffect(() => {
    onFilterChange({ rating, country, tourTypes: selectedTourTypes });
  }, [rating, country, selectedTourTypes, onFilterChange]);

  const handleTourTypeChange = (type) => {
    setSelectedTourTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  return (
    <>
      <motion.button
        className="sidebar-trigger"
        onClick={toggleSidebar}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <FaTimes /> : <FaFilter />}
      </motion.button>
      
      <motion.div
        className="sidebar"
        initial={false}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="sidebar-content">
          <h2 className="sidebar-title">Explore Destinations</h2>
          
          <div className="filter-group country-select">
            <label htmlFor="country">Select Country</label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">All Countries</option>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="filter-group rating-slider">
            <label htmlFor="rating">Minimum Rating: {rating} ⭐</label>
            <input
              type="range"
              id="rating"
              min="0"
              max="5"
              step="0.5"
              value={rating}
              onChange={(e) => setRating(parseFloat(e.target.value))}
            />
            <div className="rating-labels">
              <span>0</span>
              <span>2.5</span>
              <span>5</span>
            </div>
          </div>

          <div className="filter-group tour-types">
            <h3>Tour Types</h3>
            <div className="tour-types-grid">
              {tourTypes.map(type => (
                <div key={type} className="checkbox-container">
                  <input
                    type="checkbox"
                    id={type}
                    checked={selectedTourTypes.includes(type)}
                    onChange={() => handleTourTypeChange(type)}
                  />
                  <label htmlFor={type}>{type}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
