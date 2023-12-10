import React, { useState, useEffect } from 'react';
import Home from './playerheadtohead/home';
import Live from './elimation/live';
import TopPlayer from './top4player/topplayer';
import Map from './planepath/map';
import './App.css';

function App() {
  const storedPage = localStorage.getItem('currentPage') || 'home';
  const [currentPage, setCurrentPage] = useState(storedPage);

  useEffect(() => {
    // Save the current page to local storage
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'live':
        return <Live />;
      case 'topplayer':
        return <TopPlayer />;
      case 'map':
        return <Map />;
      default:
        return null; // Handle unknown pages gracefully
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <button onClick={() => handlePageChange('home')} className={currentPage === 'home' ? 'active' : ''}>
        <h2>Home</h2>
      </button>
      <button onClick={() => handlePageChange('live')} className={currentPage === 'live' ? 'active' : ''}>
        <h2>Live</h2>
      </button>
      <button onClick={() => handlePageChange('topplayer')} className={currentPage === 'topplayer' ? 'active' : ''}>
        <h2>Top Player</h2>
      </button>
      <button onClick={() => handlePageChange('map')} className={currentPage === 'map' ? 'active' : ''}>
        <h2>Map</h2>
      </button>

      {renderPage()}
    </div>
  );
}

export default App;
