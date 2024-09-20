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
        ...req.query,
        key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.get('/api/place-details', async (req, res) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
      params: {
        place_id: req.query.place_id,
        fields: 'name,formatted_address,geometry,rating,types',
        key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching place details' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
