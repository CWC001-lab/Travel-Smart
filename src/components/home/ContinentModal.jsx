import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './ContinentModal.css'; // Add this line

const ContinentModal = ({ continent, onClose }) => {
  const continentInfo = {
    Africa: {
      intro: "Discover the cradle of humanity, where diverse cultures and breathtaking landscapes await.",
      attractions: ["Serengeti National Park", "Victoria Falls", "Pyramids of Giza"],
      countries: ["Tanzania", "Zimbabwe", "Egypt"]
    },
    Asia: {
      intro: "Experience a blend of ancient traditions and cutting-edge modernity in the world's largest continent.",
      attractions: ["Great Wall of China", "Taj Mahal", "Angkor Wat"],
      countries: ["China", "India", "Cambodia"]
    },
    Europe: {
      intro: "Immerse yourself in rich history, stunning architecture, and diverse cultures in every corner.",
      attractions: ["Eiffel Tower", "Colosseum", "Santorini"],
      countries: ["France", "Italy", "Greece"]
    },
    "North America": {
      intro: "From bustling cities to untamed wilderness, explore a land of endless possibilities.",
      attractions: ["Grand Canyon", "Niagara Falls", "New York City"],
      countries: ["United States", "Canada", "Mexico"]
    },
    "South America": {
      intro: "Uncover ancient civilizations and vibrant ecosystems in this passionate and diverse continent.",
      attractions: ["Machu Picchu", "Amazon Rainforest", "Christ the Redeemer"],
      countries: ["Peru", "Brazil", "Argentina"]
    },
    Australia: {
      intro: "Journey through unique landscapes and meet extraordinary wildlife in this island continent.",
      attractions: ["Great Barrier Reef", "Sydney Opera House", "Uluru"],
      countries: ["Australia", "New Zealand", "Fiji"]
    },
    Antarctica: {
      intro: "Embark on an adventure to the earth's final frontier, a pristine wilderness of ice and wonder.",
      attractions: ["Lemaire Channel", "Deception Island", "Emperor Penguin Colonies"],
      countries: ["Antarctica"]
    }
  };

  const { intro, attractions, countries } = continentInfo[continent];

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('continent-modal')) {
      onClose();
    }
  };

  return (
    <motion.div 
      className="continent-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleOutsideClick}
    >
      <div className="modal-content">
        <h2>{continent}</h2>
        <p>{intro}</p>
        <h3>Top Attractions:</h3>
        <ul>
          {attractions.map((attraction, index) => (
            <li key={index}>{attraction}</li>
          ))}
        </ul>
        <h3>Featured Countries:</h3>
        <ul>
          {countries.map((country, index) => (
            <li key={index}>
              <Link to={`/trips?country=${encodeURIComponent(country)}`}>
                {country}
              </Link>
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="close-button">x</button>
      </div>
    </motion.div>
  );
};

export default ContinentModal;
