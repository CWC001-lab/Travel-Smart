import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from '../filters/sidebar/SideBar';
import CardList from '../cards/Card';
import Search from '../filters/search/Search';
import Descriptions from '../descriptions/Descriptions';
import axios from 'axios';
import './TripsCatalog.css';

const TripsCatalog = () => {
  const [filters, setFilters] = useState({ rating: 0, country: '', tourTypes: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

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

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get('/api/places');
        console.log('Places fetched successfully:', response.data);
      } catch (error) {
        console.error('Error fetching places:', error);
        if (error.response) {
          console.error('Error response:', error.response.data);
        }
      }
    };

    fetchPlaces();
  }, []);

  return (
    <div className={`trips-catalog ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar 
        onFilterChange={handleFilterChange} 
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <Search onSearch={handleSearch} />
      <div className="main-content">
        <CardList 
          filters={filters} 
          searchTerm={searchTerm} 
          onPlaceSelect={handlePlaceSelect}
        />
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
