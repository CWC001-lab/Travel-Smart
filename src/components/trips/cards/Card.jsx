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
        <p className="card-location">{place.country}</p>
        <span className="card-rating">{parseFloat(place.rating).toFixed(1)} ⭐</span>
        <p className="card-description">{place.description}</p>
        <p className="card-accommodation">{place.accommodation}</p>
        <p className="card-transportation">{place.transportation}</p>
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
    const fetchGooglePlacesData = async () => {
      try {
        const response = await axios.get('/api/places');
        console.log('API Response:', response.data); // Log the response data

        if (Array.isArray(response.data)) {
          setPlaces(response.data);
        } else {
          setError('Unexpected response format');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Google Places data:', error);
        setError('Failed to fetch data. Using dummy data instead.');
        setPlaces(getDummyData());
        setLoading(false);
      }
    };

    fetchGooglePlacesData();
  }, []);

  const getDummyData = () => {
    // Dummy data as fallback
    return [
      { id: '1', name: 'New York Family Adventure', country: 'United States', location: '40.71, -74.01', rating: 4.5, image: 'https://picsum.photos/200/300?random=1', tourTypes: ['family', 'adventure'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '2', name: 'Statue of Liberty Tour', country: 'United States', location: '40.69, -74.04', rating: 4.7, image: 'https://picsum.photos/200/300?random=2', tourTypes: ['cultural', 'family'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '3', name: 'San Francisco Bay Cruise', country: 'United States', location: '37.80, -122.41', rating: 4.3, image: 'https://picsum.photos/200/300?random=3', tourTypes: ['adventure', 'luxury'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '4', name: 'Grand Canyon Helicopter Tour', country: 'United States', location: '36.05, -112.14', rating: 4.8, image: 'https://picsum.photos/200/300?random=4', tourTypes: ['adventure', 'luxury'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '5', name: 'London Eye Experience', country: 'United Kingdom', location: '51.50, -0.12', rating: 4.4, image: 'https://picsum.photos/200/300?random=5', tourTypes: ['family', 'cultural'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '6', name: 'Stonehenge and Bath Day Trip', country: 'United Kingdom', location: '51.17, -1.82', rating: 4.6, image: 'https://picsum.photos/200/300?random=6', tourTypes: ['cultural', 'adventure'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '7', name: 'Scottish Highlands Tour', country: 'United Kingdom', location: '57.12, -4.71', rating: 4.9, image: 'https://picsum.photos/200/300?random=7', tourTypes: ['adventure', 'cultural'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '8', name: 'Eiffel Tower Summit Tour', country: 'France', location: '48.85, 2.29', rating: 4.7, image: 'https://picsum.photos/200/300?random=8', tourTypes: ['cultural', 'luxury'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '9', name: 'Loire Valley Castles Day Trip', country: 'France', location: '47.55, 1.02', rating: 4.5, image: 'https://picsum.photos/200/300?random=9', tourTypes: ['cultural', 'luxury'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '10', name: 'Provence Lavender Fields Tour', country: 'France', location: '43.53, 5.44', rating: 4.8, image: 'https://picsum.photos/200/300?random=10', tourTypes: ['adventure', 'cultural'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '11', name: 'Berlin Wall and Cold War Tour', country: 'Germany', location: '52.51, 13.38', rating: 4.6, image: 'https://picsum.photos/200/300?random=11', tourTypes: ['cultural', 'family'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '12', name: 'Neuschwanstein Castle Tour', country: 'Germany', location: '47.55, 10.75', rating: 4.7, image: 'https://picsum.photos/200/300?random=12', tourTypes: ['cultural', 'luxury'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '13', name: 'Black Forest Hiking Adventure', country: 'Germany', location: '47.98, 8.17', rating: 4.4, image: 'https://picsum.photos/200/300?random=13', tourTypes: ['adventure', 'family'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '14', name: 'Tokyo Sushi Making Class', country: 'Japan', location: '35.68, 139.77', rating: 4.5, image: 'https://picsum.photos/200/300?random=14', tourTypes: ['cultural', 'family'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '15', name: 'Mount Fuji Day Trip', country: 'Japan', location: '35.36, 138.73', rating: 4.8, image: 'https://picsum.photos/200/300?random=15', tourTypes: ['adventure', 'cultural'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '16', name: 'Kyoto Temple Tour', country: 'Japan', location: '35.01, 135.76', rating: 4.7, image: 'https://picsum.photos/200/300?random=16', tourTypes: ['cultural', 'luxury'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '17', name: 'Great Barrier Reef Diving', country: 'Australia', location: '-18.28, 147.70', rating: 4.9, image: 'https://picsum.photos/200/300?random=17', tourTypes: ['adventure', 'luxury'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '18', name: 'Sydney Opera House Tour', country: 'Australia', location: '-33.85, 151.21', rating: 4.6, image: 'https://picsum.photos/200/300?random=18', tourTypes: ['cultural', 'family'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '19', name: 'Uluru Sunset Tour', country: 'Australia', location: '-25.34, 131.03', rating: 4.8, image: 'https://picsum.photos/200/300?random=19', tourTypes: ['adventure', 'cultural'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '20', name: 'Banff National Park Tour', country: 'Canada', location: '51.50, -116.04', rating: 4.7, image: 'https://picsum.photos/200/300?random=20', tourTypes: ['adventure', 'family'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '21', name: 'Niagara Falls Boat Tour', country: 'Canada', location: '43.08, -79.07', rating: 4.5, image: 'https://picsum.photos/200/300?random=21', tourTypes: ['adventure', 'family'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '22', name: 'Quebec City Walking Tour', country: 'Canada', location: '46.81, -71.21', rating: 4.4, image: 'https://picsum.photos/200/300?random=22', tourTypes: ['cultural', 'family'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '23', name: 'Rome Colosseum Underground Tour', country: 'Italy', location: '41.89, 12.49', rating: 4.8, image: 'https://picsum.photos/200/300?random=23', tourTypes: ['cultural', 'luxury'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '24', name: 'Venice Gondola Ride', country: 'Italy', location: '45.43, 12.33', rating: 4.6, image: 'https://picsum.photos/200/300?random=24', tourTypes: ['romantic', 'cultural'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '25', name: 'Tuscan Countryside Wine Tour', country: 'Italy', location: '43.77, 11.25', rating: 4.7, image: 'https://picsum.photos/200/300?random=25', tourTypes: ['luxury', 'cultural'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '26', name: 'Barcelona Sagrada Familia Tour', country: 'Spain', location: '41.40, 2.17', rating: 4.7, image: 'https://picsum.photos/200/300?random=26', tourTypes: ['cultural', 'family'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '27', name: 'Seville Flamenco Show', country: 'Spain', location: '37.38, -5.99', rating: 4.5, image: 'https://picsum.photos/200/300?random=27', tourTypes: ['cultural', 'luxury'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '28', name: 'Madrid Food Tour', country: 'Spain', location: '40.41, -3.70', rating: 4.6, image: 'https://picsum.photos/200/300?random=28', tourTypes: ['cultural', 'family'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '29', name: 'Rio de Janeiro Christ the Redeemer Tour', country: 'Brazil', location: '-22.95, -43.21', rating: 4.7, image: 'https://picsum.photos/200/300?random=29', tourTypes: ['cultural', 'adventure'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '30', name: 'Amazon Rainforest Expedition', country: 'Brazil', location: '-3.46, -62.21', rating: 4.9, image: 'https://picsum.photos/200/300?random=30', tourTypes: ['adventure', 'nature'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '31', name: 'Iguazu Falls Boat Tour', country: 'Brazil', location: '-25.69, -54.44', rating: 4.8, image: 'https://picsum.photos/200/300?random=31', tourTypes: ['adventure', 'nature'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '32', name: 'Paris Catacombs Tour', country: 'France', location: '48.83, 2.33', rating: 4.4, image: 'https://picsum.photos/200/300?random=32', tourTypes: ['cultural', 'adventure'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '33', name: 'Scottish Whisky Distillery Tour', country: 'United Kingdom', location: '57.65, -3.31', rating: 4.6, image: 'https://picsum.photos/200/300?random=33', tourTypes: ['cultural', 'luxury'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '34', name: 'Munich Oktoberfest Experience', country: 'Germany', location: '48.13, 11.54', rating: 4.7, image: 'https://picsum.photos/200/300?random=34', tourTypes: ['cultural', 'adventure'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '35', name: 'Kyoto Tea Ceremony', country: 'Japan', location: '35.01, 135.76', rating: 4.5, image: 'https://picsum.photos/200/300?random=35', tourTypes: ['cultural', 'luxury'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '36', name: 'Great Ocean Road Trip', country: 'Australia', location: '-38.66, 143.10', rating: 4.8, image: 'https://picsum.photos/200/300?random=36', tourTypes: ['adventure', 'nature'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '37', name: 'Northern Lights Tour', country: 'Canada', location: '62.45, -114.37', rating: 4.9, image: 'https://picsum.photos/200/300?random=37', tourTypes: ['adventure', 'nature'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '38', name: 'Amalfi Coast Boat Tour', country: 'Italy', location: '40.63, 14.60', rating: 4.7, image: 'https://picsum.photos/200/300?random=38', tourTypes: ['luxury', 'romantic'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '39', name: 'Ibiza Party Boat', country: 'Spain', location: '38.90, 1.43', rating: 4.5, image: 'https://picsum.photos/200/300?random=39', tourTypes: ['adventure', 'luxury'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
      { id: '40', name: 'Salvador Carnival Experience', country: 'Brazil', location: '-12.97, -38.50', rating: 4.8, image: 'https://picsum.photos/200/300?random=40', tourTypes: ['cultural', 'adventure'], description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.', accommodation: 'Accommodation Available', transportation: 'No Public Transit Information' },
    ];
  };

  const filteredPlaces = Array.isArray(places) ? places.filter(place => 
    place.rating >= (filters.rating || 0) &&
    (filters.country ? place.country === filters.country : true) &&
    (filters.tourTypes.length === 0 || filters.tourTypes.some(type => place.tourTypes.includes(type))) &&
    (searchTerm ? place.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  place.country.toLowerCase().includes(searchTerm.toLowerCase()) : true)
  ) : [];

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