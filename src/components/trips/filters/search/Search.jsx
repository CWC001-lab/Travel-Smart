import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import './Search.css';

const Search = ({ onSearch }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setSearchTerm('');
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <motion.div 
      className={`search-container ${isExpanded ? 'expanded' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.input
            ref={inputRef}
            type="text"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "200px", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
      <motion.button
        onClick={handleToggle}
        className="search-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaSearch />
      </motion.button>
    </motion.div>
  );
};

export default Search;
