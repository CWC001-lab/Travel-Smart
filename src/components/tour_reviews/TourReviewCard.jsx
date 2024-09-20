import React from "react";
import { Col } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

export const TourReviewCard = ({ title, description, image, rating, price }) => {
  return (
    <Col xs={12} sm={6} md={3} className="mb-4">
      <div className="tour-review-card">
        <div className="card-image" style={{backgroundImage: `url(${image})`}}>
          <div className="rating">
            <FaStar /> {rating}
          </div>
        </div>
        <div className="card-content">
          <h3>{title}</h3>
          <p>{description}</p>
          <div className="price">{price}</div>
        </div>
      </div>
    </Col>
  );
};