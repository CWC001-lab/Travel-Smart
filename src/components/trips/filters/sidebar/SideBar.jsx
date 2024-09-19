import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFilter, FaTimes } from 'react-icons/fa';
import './SideBar.css';

// List of countries with their flags (emoji flags)
const countries = [
  { code: '', name: 'All Countries', flag: '🌎' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
];

const tourTypes = [
  { id: 'family', label: 'Family Tours' },
  { id: 'adventure', label: 'Adventure Tours' },
  { id: 'luxury', label: 'Luxury Tours' },
  { id: 'cultural', label: 'Cultural Tours' },
];

const Sidebar = ({ onFilterChange, isOpen, toggleSidebar }) => {
  const [rating, setRating] = useState(0);
  const [country, setCountry] = useState('');
  const [selectedTourTypes, setSelectedTourTypes] = useState([]);

  useEffect(() => {
    onFilterChange({ rating, country, tourTypes: selectedTourTypes });
  }, [rating, country, selectedTourTypes, onFilterChange]);

  const handleTourTypeChange = (id) => {
    setSelectedTourTypes(prev => 
      prev.includes(id) ? prev.filter(type => type !== id) : [...prev, id]
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
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </option>
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
          <div className="filter-group recommendations">
            <h3>Recommendations</h3>
            {tourTypes.map(type => (
              <div key={type.id} className="checkbox-container">
                <input
                  type="checkbox"
                  id={type.id}
                  checked={selectedTourTypes.includes(type.id)}
                  onChange={() => handleTourTypeChange(type.id)}
                />
                <label htmlFor={type.id}>{type.label}</label>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
