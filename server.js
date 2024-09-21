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
      'Africa': ['Cairo', 'Cape Town', 'Marrakech', 'Nairobi', 'Victoria Falls'],
      'Asia': ['Tokyo', 'Bangkok', 'Singapore', 'Dubai', 'Hong Kong'],
      'Europe': ['Paris', 'Rome', 'London', 'Barcelona', 'Amsterdam'],
      'North America': ['New York', 'San Francisco', 'Vancouver', 'Mexico City', 'Havana'],
      'South America': ['Rio de Janeiro', 'Buenos Aires', 'Cusco', 'Cartagena', 'Santiago'],
      'Oceania': ['Sydney', 'Auckland', 'Bali', 'Fiji', 'Queenstown']
    };

    let places = await Promise.all(Object.entries(destinations).flatMap(async ([continent, cities]) => {
      // Get data for all cities in each continent
      return await Promise.all(cities.map(async (city) => {
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
          params: {
            query: `tourist attractions in ${city}`,
            key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
          }
        });

        if (response.data.status !== 'OK') {
          console.error(`Failed to fetch data for ${city}: ${response.data.error_message}`);
          return []; // Return empty array if there's an error, so other cities can still be processed
        }

        // Process up to 7 attractions per city
        return await Promise.all(response.data.results.slice(0, 7).map(async (place) => {
          const photoReference = place.photos && place.photos[0].photo_reference;
          const photoUrl = photoReference
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
            : 'https://via.placeholder.com/400';

          // Fetch additional details
          const detailsResponse = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
            params: {
              place_id: place.place_id,
              fields: 'name,formatted_address,geometry,rating,types,photos',
              key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
            }
          });

          const details = detailsResponse.data.result;

          // Use a hypothetical accommodation API (replace with actual API call)
          const accommodationTypes = ['Hotel', 'Hostel', 'Apartment', 'Resort', 'Guesthouse'];
          const accommodation = accommodationTypes[Math.floor(Math.random() * accommodationTypes.length)];

          // Use a hypothetical transport API (replace with actual API call)
          const transportOptions = ['Bus', 'Metro', 'Taxi', 'Bike rental', 'Walking tours'];
          const transportation = transportOptions[Math.floor(Math.random() * transportOptions.length)];

          const recommendedActivity = getRecommendedActivity(details.types);

          return {
            id: place.place_id,
            name: place.name,
            city: city,
            country: place.formatted_address.split(',').slice(-1)[0].trim(),
            continent: continent,
            location: `${place.geometry.location.lat.toFixed(2)}, ${place.geometry.location.lng.toFixed(2)}`,
            rating: place.rating,
            image: photoUrl,
            tourTypes: getRandomTourTypes(),
            transportation: transportation,
            accommodation: accommodation,
            attractions: details.types.filter(type => ['tourist_attraction', 'point_of_interest', 'landmark'].includes(type)).join(', '),
            description: `Located in the city of ${city}, ${continent}, this destination is known for its cultural heritage and beautiful scenery. It's an ideal location for ${recommendedActivity}.`
          };
        }));
      }));
    }));

    // Flatten the array, sort by rating, and limit to 40 results
    places = places.flat(2).sort((a, b) => a.rating - b.rating).slice(0, 40);

    console.log('Places:', places); // Log the places data
    res.json(places);
  } catch (error) {
    console.error('Error fetching Google Places data:', error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
