import React from 'react';
import { FaStar } from 'react-icons/fa';
import './TestimonialCard.css';

const TestimonialCard = ({ image, name, title, testimonial, rating }) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-header">
        <img src={image} alt={name} className="testimonial-image" />
        <div className="testimonial-info">
          <h3>{name}</h3>
          <p>{title}</p>
        </div>
      </div>
      <div className="testimonial-content">
        <p>"{testimonial}"</p>
      </div>
      <div className="testimonial-rating">
        {[...Array(5)].map((_, index) => (
          <FaStar key={index} color={index < rating ? "#ffc107" : "#e4e5e9"} />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;
