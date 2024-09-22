import axios from 'axios';

const tourTypes = [
  'cultural', 'adventure', 'luxury', 'eco-friendly', 'historical', 'culinary',
  'wildlife', 'beach', 'urban exploration', 'spiritual', 'photography',
  'volunteer', 'educational', 'romantic', 'family-friendly', 'solo travel',
  'backpacking', 'art and museum', 'festival', 'sports and recreation'
];

const getRandomTourTypes = () => {
  const shuffled = tourTypes.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 5) + 2);
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

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      console.log('API request received');
      
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
          console.log(`Fetching data for ${city}`);
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

          // ... rest of the code ...
        }));
      }));

      places = places.flat().filter(place => place !== null);

      console.log('Places fetched successfully:', places.length);
      res.status(200).json(places);
    } catch (error) {
      console.error('Error in API route:', error);
      res.status(500).json({ 
        error: error.message || 'An unexpected error occurred',
        stack: error.stack
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
