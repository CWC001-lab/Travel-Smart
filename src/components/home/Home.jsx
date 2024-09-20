import React, { useCallback, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Home.css";
import img1 from "../../assets/img/img1.jpg";
import Asia from "../../assets/img/Asia.jpg";
import { FaFacebook, FaTwitter, FaAccessibleIcon } from "react-icons/fa";
import ContinentModal from './ContinentModal';
import TourCard from './TourCard';
import { Newsletter } from "./Newsletter";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  const getContinents = useCallback(() => [
    "Africa", "Asia", "Europe", "North America", "South America", "Australia", "Antarctica"
  ], []);

  const [hoveredContinent, setHoveredContinent] = useState(null);
  const [selectedContinent, setSelectedContinent] = useState(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { image: img1, location: 'Bahamas', description: 'stylish', title: 'Little nice beach' },
    { image: img1, location: 'Maldives', description: 'luxurious', title: 'Crystal clear waters' },
    { image: img1, location: 'Bali', description: 'exotic', title: 'Tropical paradise' },
    // Add more slides as needed
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0
      };
    }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const tours = [
    { id: 1, title: "Tour 1", description: "Experience the beauty of Tour 1", image: img1 },
    { id: 2, title: "Tour 2", description: "Discover the wonders of Tour 2", image: img1 },
    { id: 3, title: "Tour 3", description: "Explore the mysteries of Tour 3", image: img1 },
    { id: 4, title: "Tour 4", description: "Adventure awaits in Tour 4", image: img1 },
  ];

  const handleContinentHover = (continent) => {
    setHoveredContinent(continent);
  };

  const handleContinentClick = (continent) => {
    setSelectedContinent(continent);
  };

  return (
    <motion.div
      className="home"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <header className="header">
        <motion.div className="text-content" variants={containerVariants}>
          <motion.h1 className="outline-text" variants={itemVariants}>
            Journey to All World Corners
          </motion.h1>
          <motion.p variants={itemVariants}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi eum
            cum culpa odio, vitae ad quod distinctio praesentium dignissimos
            ipsum libero ab vero quos corrupti, fuga quae
          </motion.p>
          <motion.button className="book-tour" variants={itemVariants}>
            Book a Tour
          </motion.button>
        </motion.div>
        
        <motion.div className="image-container" variants={containerVariants}>
          <div className="slider-container">
            <AnimatePresence initial={false} custom={currentSlide}>
              <motion.div 
                key={currentSlide}
                className="slide"
                custom={currentSlide}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 1 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
                  } else if (swipe > swipeConfidenceThreshold) {
                    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
                  }
                }}
              >
                <img src={slides[currentSlide].image} alt={slides[currentSlide].title} className="slide-image" />
                <div className="slide-text">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    {slides[currentSlide].location}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    {slides[currentSlide].description}
                  </motion.p>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    {slides[currentSlide].title}
                  </motion.h1>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <motion.div className="image-wrapper2" variants={itemVariants}>
            <img src={Asia} alt="Second destination" className="half-image" />
            <div className="image-text">
              <motion.p variants={itemVariants}>Bahamas</motion.p>
              <motion.p variants={itemVariants}>stylish</motion.p>
              <motion.h1 variants={itemVariants}>Mountain</motion.h1>
            </div>
          </motion.div>
        </motion.div>
        <div className="custom-shape-divider-bottom">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </header>

      <section className="more_info">
        <div className="infoCont">
          <div className="info-counter">
            <div className="info-item">
              <div className="icon">📁</div>
              <p>Years of Operation</p>
              <h3>10</h3>
            </div>  
            <div className="info-item">
              <div className="icon">👥</div>
              <p>Satisfied Visitors</p>
              <h3>5000</h3>
            </div>
            <div className="info-item">
              <div className="icon">⭐</div>
              <p>5-star Reviews</p>
              <h3>100</h3>
            </div>
          </div>

          <div className="info-text">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            cumque deserunt quo, ab obcaecati aperiam? Omnis placeat sunt
            impedit sed et minima unde rerum, a dolor quos assumenda? Excepturi,
            dolorum? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quibusdam velit ipsam officia tempora, doloribus consequatur,
            architecto exercitationem voluptas rem, consequuntur enim. Tempore
            impedit incidunt ipsum, consectetur adipisci dolorem quia
            necessitatibus.
          </div>

          <div className="info-button">
            <span className="social-icons">
              <FaFacebook size={24} />
              <FaTwitter size={24} />
              <FaAccessibleIcon size={24} />
            </span>

            <a href="...">Learn more</a>
          </div>
        </div>



        <div className="infoImage">

      <div className="device-container">
        <div className="device-item device-item-small">
          <div className="device-screen">
            <img src={Asia} alt="Device 1" />
          </div>
        </div>
        <div className="device-item device-item-medium">
          <div className="device-screen">
            <img src={Asia} alt="Device 2" />
          </div>
        </div>
        <div className="device-item device-item-large">
          <div className="device-screen">
            <img src={Asia} alt="Device 3" />
          </div>
        </div>
      </div>


        </div>
      </section>







      <section className="AboutContainer">
<div className="AboutImage">
<img src={img1} alt="about" />
</div>

<div className="AboutText">
<h1>About Us </h1>
<p>
  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam optio, explicabo facilis dolorum eius officia nam amet odit aspernatur neque nostrum incidunt, labore fugit, ipsa ipsum error. Ratione, recusandae deleniti.
  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, adipisci ipsam illo molestias ratione nihil eum, possimus dolores dicta voluptate at quas, repellat beatae porro autem eveniet blanditiis ea dolore?
</p>

<span className="social-icons">
<FaFacebook size={35} />
              <FaTwitter size={35} />
              <FaAccessibleIcon size={35} />
</span>
</div>
      </section>



      <section className="Destinations">
        <h1>Destinations</h1>
        <div className="continent-slider">
          <div className="continent-scroll">
            {getContinents().concat(getContinents()).map((continent, index) => (
              <div 
                key={index} 
                className={`continent-item ${hoveredContinent === continent ? 'hovered' : ''}`}
                onMouseEnter={() => handleContinentHover(continent)}
                onMouseLeave={() => handleContinentHover(null)}
                onClick={() => handleContinentClick(continent)}
              >
                {continent}
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedContinent && (
          <ContinentModal 
            continent={selectedContinent} 
            onClose={() => setSelectedContinent(null)} 
          />
        )}
      </AnimatePresence>





      <section className="Tours">
        <h2>Our Tours</h2>
        <div className="tour-grid">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </section>

<Newsletter />

    </motion.div>
  );
};

export default Home;
