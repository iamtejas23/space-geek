// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Space Explorer</h1>
    </header>
  );
}

function MainContent() {
  const [apodData, setApodData] = useState(null);
  const [neoData, setNeoData] = useState(null);
  const [roverPhotos, setRoverPhotos] = useState([]);
  const [spacexData, setSpacexData] = useState(null);

  useEffect(() => {
    fetchApod();
    fetchNeo();
    fetchRoverPhotos();
    fetchSpacex();
  }, []);

  const fetchApod = async () => {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=HNTBQ0TKuM40tQx0w8bxbNQSKUsyJu7RO02Oi01Y`);
    const data = await response.json();
    setApodData(data);
  };

  const fetchNeo = async () => {
    const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=HNTBQ0TKuM40tQx0w8bxbNQSKUsyJu7RO02Oi01Y`);
    const data = await response.json();
    setNeoData(data);
  };

  const fetchRoverPhotos = async () => {
    const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=HNTBQ0TKuM40tQx0w8bxbNQSKUsyJu7RO02Oi01Y`);
    const data = await response.json();
    setRoverPhotos(data.photos);
  };

  const loadMoreRoverPhotos = async () => {
    // Fetch more rover photos (page 2)
    const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=HNTBQ0TKuM40tQx0w8bxbNQSKUsyJu7RO02Oi01Y`);
    const data = await response.json();
    // Append new photos to existing array
    setRoverPhotos(prevPhotos => [...prevPhotos, ...data.photos]);
  };

  const fetchSpacex = async () => {
    const response = await fetch('https://api.spacexdata.com/v4/launches');
    const data = await response.json();
    setSpacexData(data);
  };

  return (
    <main className="main-content">
      <section className="apod-section">
        <h2>Astronomy Picture of the Day</h2>
        {apodData && (
          <div className="apod">
            <img src={apodData.url} alt={apodData.title} />
            <p>{apodData.explanation}</p>
          </div>
        )}
      </section>
      <section className="neo-section">
        <h2>Near Earth Objects</h2>
        {neoData && (
          <div className="neo">
            <p>Total NEOs: {neoData.element_count}</p>
            {/* Display more NEO data here */}
          </div>
        )}
      </section>
      <section className="rover-section">
        <h2>Mars Rover Photos</h2>
        <div className="rover-photos">
          {roverPhotos && roverPhotos.map(photo => (
            <img key={photo.id} src={photo.img_src} alt={photo.id} />
          ))}
          <button onClick={loadMoreRoverPhotos}>Load More Photos</button>
        </div>
      </section>
      <section className="spacex-section">
        <h2>SpaceX Launches</h2>
        {spacexData && (
          <ul className="spacex-list">
            {spacexData.map((launch, index) => (
              <li key={index}>
                <strong>{launch.name}</strong> - {launch.date_utc}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>© 2024 Space Explorer</p>
    </footer>
  );
}

export default App;
