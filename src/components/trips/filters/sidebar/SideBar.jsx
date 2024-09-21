import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFilter, FaTimes } from 'react-icons/fa';
import './SideBar.css';

const continents = [
  { code: '', name: 'All Continents' },
  { code: 'Africa', name: 'Africa' },
  { code: 'Asia', name: 'Asia' },
  { code: 'Europe', name: 'Europe' },
  { code: 'North America', name: 'North America' },
  { code: 'South America', name: 'South America' },
  { code: 'Oceania', name: 'Oceania' },
];

const tourTypes = [
  'cultural', 'adventure', 'luxury', 'eco-friendly', 'historical', 'culinary',
  'wildlife', 'beach', 'urban exploration', 'spiritual', 'photography',
  'volunteer', 'educational', 'romantic', 'family-friendly', 'solo travel',
  'backpacking', 'art and museum', 'festival', 'sports and recreation'
];

const Sidebar = ({ onFilterChange, isOpen, toggleSidebar }) => {
  const [rating, setRating] = useState(0);
  const [continent, setContinent] = useState('');
  const [selectedTourTypes, setSelectedTourTypes] = useState([]);

  useEffect(() => {
    onFilterChange({ rating, continent, tourTypes: selectedTourTypes });
  }, [rating, continent, selectedTourTypes, onFilterChange]);

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
          <div className="filter-group continent-select">
            <label htmlFor="continent">Select Continent</label>
            <select
              id="continent"
              value={continent}
              onChange={(e) => setContinent(e.target.value)}
            >
              {continents.map((c) => (
                <option key={c.code} value={c.code}>{c.name}</option>
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
      </motion.div>
    </>
  );
};

export default Sidebar;
