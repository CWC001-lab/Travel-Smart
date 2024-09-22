import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBookmark, FaInfoCircle, FaShare } from 'react-icons/fa';
import './Card.css';

const Card = ({ place, index, onPlaceSelect, cardType }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Add a check to ensure place is defined
  if (!place) {
    return null; // or return a placeholder component
  }

  return (
    <motion.div
      className={`card ${cardType}-card`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {place.image && <img src={place.image} alt={place.name} className="card-image" />}
      <div className="card-content">
        <h3 className="card-title">{place.name}</h3>
        {place.location && (
          <p className="card-location">
            {place.location.city && `${place.location.city}, `}
            {place.location.country}
          </p>
        )}
        {place.rating && <span className="card-rating">{parseFloat(place.rating).toFixed(1)} ⭐</span>}
        {place.price && <p className="card-price">Price: ${place.price}</p>}
        {place.description && <p className="card-description">{place.description}</p>}
        {place.accommodation && <p>Accommodation: {place.accommodation.join(', ')}</p>}
        {place.transportation && <p>Transportation: {place.transportation.join(', ')}</p>}
        {place.tourType && <p>Tour Type: {place.tourType.join(', ')}</p>}
      </div>
      <motion.div 
        className="card-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div className="card-icons">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => console.log('Save location')}
          >
            <FaBookmark />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onPlaceSelect(place)}
          >
            <FaInfoCircle />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => console.log('Share')}
          >
            <FaShare />
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Card;