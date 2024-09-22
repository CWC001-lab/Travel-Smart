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
  res.status(200).json({ message: 'API is working' });
}
