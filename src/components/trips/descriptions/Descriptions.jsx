import React from 'react';
import { motion } from 'framer-motion';
import './Descriptions.css';

const Descriptions = ({ place, onClose }) => {
  return (
    <motion.div
      className="descriptions-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="descriptions-content"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{place.name}</h2>
        <p><strong>Country:</strong> {place.country}</p>
        <p><strong>Location:</strong> {place.location}</p>
        <p><strong>Rating:</strong> {place.rating} ⭐</p>
        <p><strong>Tour Types:</strong> {place.tourTypes.join(', ')}</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <button onClick={onClose}>Close</button>
      </motion.div>
    </motion.div>
  );
};

export default Descriptions;
