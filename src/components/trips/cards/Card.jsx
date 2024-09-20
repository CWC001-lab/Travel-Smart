import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Descriptions from '../descriptions/Descriptions';
import './Card.css';

const Card = ({ place, index }) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <>
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
      >
        <img src={place.image} alt={place.name} className="card-image" />
        <div className="card-content">
          <h3 className="card-title">{place.name}</h3>
          <p className="card-location">{place.country}</p>
          <span className="card-rating">{parseFloat(place.rating).toFixed(1)} ⭐</span>
          <button
            className="card-details-button"
            onClick={() => setShowDescription(true)}
          >
            View Details
          </button>
        </div>
      </motion.div>
      <AnimatePresence>
        {showDescription && (
          <Descriptions
            place={place}
            onClose={() => setShowDescription(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const CardList = ({ filters, searchTerm }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGooglePlacesData = async () => {
      try {
        const response = await axios.get('/api/places', {
          params: {
            query: 'tourist attractions'
          }
        });

        const googlePlaces = await Promise.all(response.data.results.map(async (place) => {
          const photoReference = place.photos && place.photos[0].photo_reference;
          const photoUrl = photoReference
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
            : 'https://via.placeholder.com/400';

          // Fetch additional details for each place
          const detailsResponse = await axios.get('/api/place-details', {
            params: {
              place_id: place.place_id
            }
          });

          const details = detailsResponse.data.result;

          return {
            id: place.place_id,
            name: place.name,
            country: place.formatted_address.split(',').slice(-1)[0].trim(),
            location: `${place.geometry.location.lat.toFixed(2)}, ${place.geometry.location.lng.toFixed(2)}`,
            rating: place.rating,
            image: photoUrl,
            tourTypes: ['cultural', 'adventure'], // Default tour types
            transportation: 'No Public Transit Information',
            accommodation: details.types.includes('lodging') ? 'Accommodation Available' : 'No Accommodation Information',
            attractions: details.types.filter(type => ['tourist_attraction', 'point_of_interest', 'landmark'].includes(type)).join(', ')
          };
        }));

        setPlaces(googlePlaces);
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
    return [
      { id: '1', name: 'New York Family Adventure', country: 'United States', location: '40.71, -74.01', rating: 4.5, image: 'https://picsum.photos/200/300?random=1', tourTypes: ['family', 'adventure'] },
      { id: '2', name: 'Statue of Liberty Tour', country: 'United States', location: '40.69, -74.04', rating: 4.7, image: 'https://picsum.photos/200/300?random=2', tourTypes: ['cultural', 'family'] },
      { id: '3', name: 'San Francisco Bay Cruise', country: 'United States', location: '37.80, -122.41', rating: 4.3, image: 'https://picsum.photos/200/300?random=3', tourTypes: ['adventure', 'luxury'] },
      { id: '4', name: 'Grand Canyon Helicopter Tour', country: 'United States', location: '36.05, -112.14', rating: 4.8, image: 'https://picsum.photos/200/300?random=4', tourTypes: ['adventure', 'luxury'] },
      { id: '5', name: 'London Eye Experience', country: 'United Kingdom', location: '51.50, -0.12', rating: 4.4, image: 'https://picsum.photos/200/300?random=5', tourTypes: ['family', 'cultural'] },
      { id: '6', name: 'Stonehenge and Bath Day Trip', country: 'United Kingdom', location: '51.17, -1.82', rating: 4.6, image: 'https://picsum.photos/200/300?random=6', tourTypes: ['cultural', 'adventure'] },
      { id: '7', name: 'Scottish Highlands Tour', country: 'United Kingdom', location: '57.12, -4.71', rating: 4.9, image: 'https://picsum.photos/200/300?random=7', tourTypes: ['adventure', 'cultural'] },
      { id: '8', name: 'Eiffel Tower Summit Tour', country: 'France', location: '48.85, 2.29', rating: 4.7, image: 'https://picsum.photos/200/300?random=8', tourTypes: ['cultural', 'luxury'] },
      { id: '9', name: 'Loire Valley Castles Day Trip', country: 'France', location: '47.55, 1.02', rating: 4.5, image: 'https://picsum.photos/200/300?random=9', tourTypes: ['cultural', 'luxury'] },
      { id: '10', name: 'Provence Lavender Fields Tour', country: 'France', location: '43.53, 5.44', rating: 4.8, image: 'https://picsum.photos/200/300?random=10', tourTypes: ['adventure', 'cultural'] },
      { id: '11', name: 'Berlin Wall and Cold War Tour', country: 'Germany', location: '52.51, 13.38', rating: 4.6, image: 'https://picsum.photos/200/300?random=11', tourTypes: ['cultural', 'family'] },
      { id: '12', name: 'Neuschwanstein Castle Tour', country: 'Germany', location: '47.55, 10.75', rating: 4.7, image: 'https://picsum.photos/200/300?random=12', tourTypes: ['cultural', 'luxury'] },
      { id: '13', name: 'Black Forest Hiking Adventure', country: 'Germany', location: '47.98, 8.17', rating: 4.4, image: 'https://picsum.photos/200/300?random=13', tourTypes: ['adventure', 'family'] },
      { id: '14', name: 'Tokyo Sushi Making Class', country: 'Japan', location: '35.68, 139.77', rating: 4.5, image: 'https://picsum.photos/200/300?random=14', tourTypes: ['cultural', 'family'] },
      { id: '15', name: 'Mount Fuji Day Trip', country: 'Japan', location: '35.36, 138.73', rating: 4.8, image: 'https://picsum.photos/200/300?random=15', tourTypes: ['adventure', 'cultural'] },
      { id: '16', name: 'Kyoto Temple Tour', country: 'Japan', location: '35.01, 135.76', rating: 4.7, image: 'https://picsum.photos/200/300?random=16', tourTypes: ['cultural', 'luxury'] },
      { id: '17', name: 'Great Barrier Reef Diving', country: 'Australia', location: '-18.28, 147.70', rating: 4.9, image: 'https://picsum.photos/200/300?random=17', tourTypes: ['adventure', 'luxury'] },
      { id: '18', name: 'Sydney Opera House Tour', country: 'Australia', location: '-33.85, 151.21', rating: 4.6, image: 'https://picsum.photos/200/300?random=18', tourTypes: ['cultural', 'family'] },
      { id: '19', name: 'Uluru Sunset Tour', country: 'Australia', location: '-25.34, 131.03', rating: 4.8, image: 'https://picsum.photos/200/300?random=19', tourTypes: ['adventure', 'cultural'] },
      { id: '20', name: 'Banff National Park Tour', country: 'Canada', location: '51.50, -116.04', rating: 4.7, image: 'https://picsum.photos/200/300?random=20', tourTypes: ['adventure', 'family'] },
      { id: '21', name: 'Niagara Falls Boat Tour', country: 'Canada', location: '43.08, -79.07', rating: 4.5, image: 'https://picsum.photos/200/300?random=21', tourTypes: ['adventure', 'family'] },
      { id: '22', name: 'Quebec City Walking Tour', country: 'Canada', location: '46.81, -71.21', rating: 4.4, image: 'https://picsum.photos/200/300?random=22', tourTypes: ['cultural', 'family'] },
      { id: '23', name: 'Rome Colosseum Underground Tour', country: 'Italy', location: '41.89, 12.49', rating: 4.8, image: 'https://picsum.photos/200/300?random=23', tourTypes: ['cultural', 'luxury'] },
      { id: '24', name: 'Venice Gondola Ride', country: 'Italy', location: '45.43, 12.33', rating: 4.6, image: 'https://picsum.photos/200/300?random=24', tourTypes: ['romantic', 'cultural'] },
      { id: '25', name: 'Tuscan Countryside Wine Tour', country: 'Italy', location: '43.77, 11.25', rating: 4.7, image: 'https://picsum.photos/200/300?random=25', tourTypes: ['luxury', 'cultural'] },
      { id: '26', name: 'Barcelona Sagrada Familia Tour', country: 'Spain', location: '41.40, 2.17', rating: 4.7, image: 'https://picsum.photos/200/300?random=26', tourTypes: ['cultural', 'family'] },
      { id: '27', name: 'Seville Flamenco Show', country: 'Spain', location: '37.38, -5.99', rating: 4.5, image: 'https://picsum.photos/200/300?random=27', tourTypes: ['cultural', 'luxury'] },
      { id: '28', name: 'Madrid Food Tour', country: 'Spain', location: '40.41, -3.70', rating: 4.6, image: 'https://picsum.photos/200/300?random=28', tourTypes: ['cultural', 'family'] },
      { id: '29', name: 'Rio de Janeiro Christ the Redeemer Tour', country: 'Brazil', location: '-22.95, -43.21', rating: 4.7, image: 'https://picsum.photos/200/300?random=29', tourTypes: ['cultural', 'adventure'] },
      { id: '30', name: 'Amazon Rainforest Expedition', country: 'Brazil', location: '-3.46, -62.21', rating: 4.9, image: 'https://picsum.photos/200/300?random=30', tourTypes: ['adventure', 'nature'] },
      { id: '31', name: 'Iguazu Falls Boat Tour', country: 'Brazil', location: '-25.69, -54.44', rating: 4.8, image: 'https://picsum.photos/200/300?random=31', tourTypes: ['adventure', 'nature'] },
      { id: '32', name: 'Paris Catacombs Tour', country: 'France', location: '48.83, 2.33', rating: 4.4, image: 'https://picsum.photos/200/300?random=32', tourTypes: ['cultural', 'adventure'] },
      { id: '33', name: 'Scottish Whisky Distillery Tour', country: 'United Kingdom', location: '57.65, -3.31', rating: 4.6, image: 'https://picsum.photos/200/300?random=33', tourTypes: ['cultural', 'luxury'] },
      { id: '34', name: 'Munich Oktoberfest Experience', country: 'Germany', location: '48.13, 11.54', rating: 4.7, image: 'https://picsum.photos/200/300?random=34', tourTypes: ['cultural', 'adventure'] },
      { id: '35', name: 'Kyoto Tea Ceremony', country: 'Japan', location: '35.01, 135.76', rating: 4.5, image: 'https://picsum.photos/200/300?random=35', tourTypes: ['cultural', 'luxury'] },
      { id: '36', name: 'Great Ocean Road Trip', country: 'Australia', location: '-38.66, 143.10', rating: 4.8, image: 'https://picsum.photos/200/300?random=36', tourTypes: ['adventure', 'nature'] },
      { id: '37', name: 'Northern Lights Tour', country: 'Canada', location: '62.45, -114.37', rating: 4.9, image: 'https://picsum.photos/200/300?random=37', tourTypes: ['adventure', 'nature'] },
      { id: '38', name: 'Amalfi Coast Boat Tour', country: 'Italy', location: '40.63, 14.60', rating: 4.7, image: 'https://picsum.photos/200/300?random=38', tourTypes: ['luxury', 'romantic'] },
      { id: '39', name: 'Ibiza Party Boat', country: 'Spain', location: '38.90, 1.43', rating: 4.5, image: 'https://picsum.photos/200/300?random=39', tourTypes: ['adventure', 'luxury'] },
      { id: '40', name: 'Salvador Carnival Experience', country: 'Brazil', location: '-12.97, -38.50', rating: 4.8, image: 'https://picsum.photos/200/300?random=40', tourTypes: ['cultural', 'adventure'] },
    ];
  };

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
            <Card key={place.id} place={place} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardList;