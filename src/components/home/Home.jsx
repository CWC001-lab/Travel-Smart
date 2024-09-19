import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const continents = [
    {
      name: "North America",
      description: "Explore North America's vibrant cities, breathtaking national parks, and iconic landmarks.",
      image: "./img/Asia.jpg"
    },
    {
      name: "South America",
      description: "Uncover South America's vibrant culture, stunning landscapes, and ancient ruins.",
      image: "./img/europe.jpg"
    },
    // Add the rest of the continents here
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % continents.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % continents.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + continents.length) % continents.length);
  };

  return (
    <>
      <div className="container">
        <div className="slide">
          {continents.map((continent, index) => (
            <div
              key={index}
              className={`item ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${continent.image})` }}
            >
              <div className="content">
                <div className="name">{continent.name}</div>
                <div className="des">{continent.description}</div>
                <button>see more</button>
              </div>
            </div>
          ))}
        </div>
        <div className="button">
          <button className="prev" onClick={prevSlide}> &lt; </button>
          <button className="next" onClick={nextSlide}> &gt; </button>
        </div>
      </div>

      <section className="about" id="about">
        <div className="about-img">
          <img src="./img/nigeria.jpg" className="pic1" alt="" />
          <img src="./img/europe.jpg" className="pic2" alt="" />
          <img src="./img/africa 2.jpg" className="pic3" alt="" />
          <img src="./img/Asia.jpg" className="pic4" alt="" />
        </div>
        <div className="about-content">
          <h2 className="heading">Welcome<span> Travel Smart</span></h2>
          <h3></h3>
          <p>
            "Where will your wanderlust take you? Welcome to Travel Smart, your trusted travel companion. Browse destinations, book flights and hotels, and get inspired by our expert travel guides."
          </p>
          <a href="#" className="btn">Read More</a>
        </div>
      </section>

      {/* Add the rest of the sections here */}
    </>
  );
};

export default Home;
