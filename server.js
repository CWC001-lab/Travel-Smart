const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());

app.get('/api/places', async (req, res) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
      params: {
        query: 'popular tourist attractions',
        key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      }
    });

    const places = await Promise.all(response.data.results.map(async (place) => {
      const photoReference = place.photos && place.photos[0].photo_reference;
      const photoUrl = photoReference
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
        : 'https://via.placeholder.com/400';

      const detailsResponse = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
        params: {
          place_id: place.place_id,
          fields: 'name,formatted_address,geometry,rating,types,photos',
          key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
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
        attractions: details.types.filter(type => ['tourist_attraction', 'point_of_interest', 'landmark'].includes(type)).join(', '),
        description: 'A popular tourist destination known for its cultural heritage and beautiful scenery.'
      };
    }));

    res.json(places);
  } catch (error) {
    console.error('Error fetching Google Places data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
