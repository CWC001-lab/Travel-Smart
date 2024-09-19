import React, { useState } from 'react';
import './About.css';

const About = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="about-container">
      <h1>ABOUT US</h1>
      <div id="details">
        <div id="first">
          <p id="header">AT <b id="smart">TRAVELSMART</b> WE ARE PASSIONATE ABOUT TURNING YOUR TRAVEL DREAMS INTO REALITY</p>
          <p>
            Founded by adventure enthusiasts, we explore the world to bring you the best travel tips, destinations, and experiences.
            {showMore && (
              <span id="span">
                Whether you're seeking a peaceful retreat, thrilling adventure, or cultural immersion, we craft personalized itineraries tailored to your needs. Our mission is to inspire, guide, and support every step of your journey.
                Ready to explore? Let's make your next adventure unforgettable!
              </span>
            )}
          </p>
          <button onClick={toggleMore}>{showMore ? 'Show less' : 'Show more'}</button>
        </div>
        <div id="image">
          <img src="/images/open-book-world-travel.png" alt="World Travel" id="imgs2" />
        </div>
      </div>

      <div id="values">
        <h1>VALUES</h1>
        <div id="val">
          <div id="word">
            <h2>Budget-Friendly Tips</h2>
            <span id="under">VALUES</span>
            <h5>Budget-Friendly Tips</h5>
            <p>Offers smart travel tips and budget-friendly hacks, such as finding cheap flights, accommodation deals, and money-saving strategies during the trip.</p>
          </div>
          <img src="/images/img2.jpg" alt="Budget-Friendly Tips" id="imgv" />
        </div>

        <div id="val">
          <img src="/images/img1.jpg" alt="User-Centric Information" id="imgv" />
          <div id="word">
            <h2>User-Centric Information</h2>
            <span id="under">VALUES</span>
            <h5>User-Centric Information</h5>
            <p>Provides detailed and up-to-date information on travel destinations, including attractions, accommodation options, transportation, and local customs to help travelers make informed decisions.</p>
          </div>
        </div>

        <div id="val">
          <div id="word">
            <h2>Cultural Sensitivity</h2>
            <span id="under">VALUES</span>
            <h5>Cultural Sensitivity</h5>
            <p>Educates travelers on respecting local cultures and traditions, fostering positive interactions with local communities and promoting ethical travel.</p>
          </div>
          <img src="/images/kalen-emsley-7bwQXzbF6KE-unsplash.jpg" alt="Cultural Sensitivity" id="imgv" />
        </div>
      </div>
    </div>
  );
};

export default About;
