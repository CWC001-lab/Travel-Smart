import React from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import './Descriptions.css';

const Descriptions = ({ place, onClose }) => {
  if (!place) return null;

  const accommodationTypes = place.accommodationType || place.accommodation || [];
  const transportationTypes = place.localTransportation || place.transportation || [];

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
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        <div className="description-flex">
          <div className="description-image">
            <img src={place.image} alt={place.name} />
          </div>
          <div className="description-details">
            <h2>{place.name}</h2>
            <p><strong>Location:</strong> {place.location.city || place.location.place}, {place.location.country}</p>
            <p><strong>Rating:</strong> {place.rating} ⭐</p>
            <p><strong>Price:</strong> ${place.price}</p>
            {place.description && <p><strong>Description:</strong> {place.description}</p>}
            {accommodationTypes.length > 0 && <p><strong>Accommodation:</strong> {accommodationTypes.join(', ')}</p>}
            {transportationTypes.length > 0 && <p><strong>Transportation:</strong> {transportationTypes.join(', ')}</p>}
            {place.tourType && <p><strong>Tour Type:</strong> {place.tourType.join(', ')}</p>}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Descriptions;
