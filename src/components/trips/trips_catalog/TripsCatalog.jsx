import React, { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../filters/sidebar/SideBar';
import Card from '../cards/Card';
import Search from '../filters/search/Search';
import Descriptions from '../descriptions/Descriptions';
import travelData from '../../../data/travel_data.json';
import './TripsCatalog.css';

const TripsCatalog = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCountry = searchParams.get('country') || '';

  const [filters, setFilters] = useState({
    rating: 0,
    country: initialCountry,
    tourTypes: [],
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // Combine all places from different categories
    const allPlaces = [
      ...travelData.popularDestinations,
      ...travelData.tourPackages,
      ...Object.values(travelData.continentalPackages).flat()
    ];
    setPlaces(allPlaces);
  }, []);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
  };

  const handleCloseModal = () => {
    setSelectedPlace(null);
  };

  const filteredPlaces = places.filter(place => 
    place.rating >= (filters.rating || 0) &&
    (filters.country ? place.location.country === filters.country : true) &&
    (filters.tourTypes.length > 0 ? filters.tourTypes.some(type => place.tourType && place.tourType.includes(type)) : true) &&
    (searchTerm ? place.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  place.location.country.toLowerCase().includes(searchTerm.toLowerCase()) : true)
  );

  return (
    <div className={`trips-catalog ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar 
        onFilterChange={handleFilterChange} 
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        initialCountry={initialCountry}
      />
      <Search 
        onSearch={handleSearch} 
        toggleSidebar={toggleSidebar} 
        isSidebarOpen={isSidebarOpen}
      />
      <div className="main-content">
        <h2 className="section-title">Popular Destinations</h2>
        <div className="card-container">
          {filteredPlaces.map((place, index) => (
            <Card 
              key={place.id} 
              place={place}
              index={index} 
              onPlaceSelect={handlePlaceSelect}
              cardType={place.cardType || 'default'}
            />
          ))}
        </div>
      </div>
      {selectedPlace && (
        <Descriptions 
          place={selectedPlace} 
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default TripsCatalog;
