const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());

const tourTypes = [
  'cultural', 'adventure', 'luxury', 'eco-friendly', 'historical', 'culinary',
  'wildlife', 'beach', 'urban exploration', 'spiritual', 'photography',
  'volunteer', 'educational', 'romantic', 'family-friendly', 'solo travel',
  'backpacking', 'art and museum', 'festival', 'sports and recreation'
];

const getRandomTourTypes = () => {
  const shuffled = tourTypes.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 5) + 2); // 2 to 6 random tour types
};

const getRecommendedActivity = (types) => {
  const activities = {
    'tourist_attraction': 'sightseeing',
    'point_of_interest': 'exploring local attractions',
    'landmark': 'visiting historical sites',
    'museum': 'learning about local culture and history',
    'park': 'enjoying nature and outdoor activities',
    'church': 'experiencing religious architecture',
    'restaurant': 'tasting local cuisine',
    'bar': 'enjoying the nightlife',
    'art_gallery': 'appreciating local art',
    'zoo': 'observing wildlife'
  };
  
  for (let type of types) {
    if (activities[type]) return activities[type];
  }
  return 'exploring and enjoying local attractions';
};

app.get('/api/places', async (req, res) => {
  try {
    const destinations = {
      'Africa': ['Cairo', 'Cape Town'],
      'Asia': ['Tokyo', 'Bangkok'],
      'Europe': ['Paris', 'Rome'],
      'North America': ['New York', 'San Francisco'],
      'South America': ['Rio de Janeiro', 'Buenos Aires'],
      'Oceania': ['Sydney', 'Auckland']
    };

    let places = await Promise.all(Object.entries(destinations).flatMap(async ([continent, cities]) => {
      return await Promise.all(cities.map(async (city) => {
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
          params: {
            query: `tourist attractions in ${city}`,
            key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
          }
        });

        if (response.data.status !== 'OK') {
          console.error(`Failed to fetch data for ${city}: ${response.data.error_message}`);
          return null;
        }

        const place = response.data.results[0]; // Get only the first result
        const photoReference = place.photos && place.photos[0].photo_reference;
        const photoUrl = photoReference
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
          : 'https://via.placeholder.com/400';

        const country = place.formatted_address 
          ? place.formatted_address.split(',').slice(-1)[0].trim()
          : 'Unknown';

        return {
          id: place.place_id,
          name: place.name,
          city: city,
          country: country,
          continent: continent,
          rating: place.rating,
          image: photoUrl,
          description: `A popular destination in ${city}, ${continent}.`
        };
      }));
    }));

    places = places.flat().filter(place => place !== null);

    console.log('Places:', places);
    res.json(places);
  } catch (error) {
    console.error('Error fetching Google Places data:', error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
