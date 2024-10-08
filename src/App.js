import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home/Home';
import TripsCatalog from './components/trips/trips_catalog/TripsCatalog';
import { NavBar } from './components/navbar/Navbar';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import AiTourGuide from './components/aitourguide/AiTourGuide';
import { TourReviews } from './components/tour_reviews/TourReviews';
function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/trips-catalog" element={<TripsCatalog />} />
          <Route path="/trip-reviews" element={<TourReviews />} />
          <Route path="/contact-us" element={<Contact />} />
          {/* Add other routes here */}
        </Routes>
<AiTourGuide/>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
