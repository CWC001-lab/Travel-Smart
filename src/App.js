import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import TripsCatalog from './components/trips/trips_catalog/TripsCatalog';
import { NavBar } from './components/navbar/Navbar';
import About from './components/about/About';
import Contact from './components/contact/Contact';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trips-catalog" element={<TripsCatalog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
