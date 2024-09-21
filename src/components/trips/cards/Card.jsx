import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaBookmark, FaInfoCircle, FaShare } from 'react-icons/fa';
import './Card.css';

const Card = ({ place, index, onPlaceSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={place.image} alt={place.name} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{place.name}</h3>
        <p className="card-location">{place.city}, {place.country}</p>
        <span className="card-rating">{parseFloat(place.rating).toFixed(1)} ⭐</span>
        <p className="card-description">{place.description}</p>
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

const CardList = ({ filters, searchTerm, onPlaceSelect }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlacesData = async () => {
      try {
        const response = await axios.get('/api/places');
        console.log('API Response:', response.data);

        if (Array.isArray(response.data)) {
          setPlaces(response.data);
        } else {
          setError('Unexpected response format');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching places data:', error);
        console.error('Error details:', error.response?.data);
        setError(`Failed to fetch data: ${error.message}`);
        setLoading(false);
      }
    };

    fetchPlacesData();
  }, []);

  const filteredPlaces = places.filter(place => 
    place.rating >= (filters.rating || 0) &&
    (filters.country ? place.country === filters.country : true) &&
    (filters.tourTypes.length === 0 || filters.tourTypes.some(type => place.tourTypes.includes(type))) &&
    (searchTerm ? place.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  place.country.toLowerCase().includes(searchTerm.toLowerCase()) : true)
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="card-list-container">
      {error && <div className="error-message">{error}</div>}
      <div className="card-list">
        <h2 className="section-title">Popular Destinations</h2>
        <div className="cards">
          {filteredPlaces.map((place, index) => (
            <Card 
              key={place.id} 
              place={place} 
              index={index} 
              onPlaceSelect={onPlaceSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardList;