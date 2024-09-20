import React from 'react';

const TourCard = ({ tour }) => {
  return (
    <div className="tour-card">
      <div className="tour-image">
        <img src={tour.image} alt={tour.title} />
      </div>
      <div className="tour-content">
        <h3>{tour.title}</h3>
        <p>{tour.description}</p>
      </div>
    </div>
  );
};

export default TourCard;
