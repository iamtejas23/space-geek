import React, { useState, useEffect } from 'react';
import '../../App.css'; // Import your CSS file for styling
import asteroids from '../../assets/asteroids.png';
import { IoPlanetSharp } from "react-icons/io5";
import Footer from '../../components/Footer/Footer';

function Home() {
  const [apodData, setApodData] = useState(null);
  const [neoData, setNeoData] = useState(null);
  const [roverPhotos, setRoverPhotos] = useState([]);
  const [loadingApod, setLoadingApod] = useState(true);
  const [loadingNeo, setLoadingNeo] = useState(true);
  const [loadingRover, setLoadingRover] = useState(true);

  useEffect(() => {
    fetchApod();
    fetchNeo();
    fetchRoverPhotos();
  }, []);

  const fetchApod = async () => {
    setLoadingApod(true);
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=HNTBQ0TKuM40tQx0w8bxbNQSKUsyJu7RO02Oi01Y`);
    const data = await response.json();
    setApodData(data);
    setLoadingApod(false);
  };

  const fetchNeo = async () => {
    setLoadingNeo(true);
    const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=HNTBQ0TKuM40tQx0w8bxbNQSKUsyJu7RO02Oi01Y`);
    const data = await response.json();
    setNeoData(data);
    setLoadingNeo(false);
  };

  const fetchRoverPhotos = async () => {
    setLoadingRover(true);
    const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=HNTBQ0TKuM40tQx0w8bxbNQSKUsyJu7RO02Oi01Y`);
    const data = await response.json();
    setRoverPhotos(data.photos);
    setLoadingRover(false);
  };

  const loadMoreRoverPhotos = async () => {
    setLoadingRover(true);
    const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=HNTBQ0TKuM40tQx0w8bxbNQSKUsyJu7RO02Oi01Y`);
    const data = await response.json();
    setRoverPhotos(prevPhotos => [...prevPhotos, ...data.photos]);
    setLoadingRover(false);
  };

  return (
    <main className="main-content">
      <section className="apod-section">
        <h2>Astronomy Picture of the Day</h2>
        {loadingApod ? (
          <div className="loading-banner">Loading APOD...</div>
        ) : (
          apodData && (
            <div className="apod">
              {apodData.media_type === 'image' ? (
                <img src={apodData.url} alt={apodData.title} className="apod-media" />
              ) : apodData.media_type === 'video' ? (
                <iframe
                  src={apodData.url}
                  title={apodData.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="apod-media"
                ></iframe>
              ) : null}
              <p className='des'>{apodData.explanation}</p>
            </div>
          )
        )}
      </section>
      <section className="neo-section">
        <h2> <img src={asteroids} alt="ast" /> Near Earth Objects </h2>
        {loadingNeo ? (
          <div className="loading-banner">Loading NEO data...</div>
        ) : (
          neoData && (
            <div className="neo">
              <p><IoPlanetSharp color='red' /> Total NEOs: {neoData.element_count} </p>
            </div>
          )
        )}
      </section>
      <section className="rover-section">
        <h2>Mars Rover Photos</h2>
        {loadingRover ? (
          <div className="loading-banner">Loading Mars Rover Photos...</div>
        ) : (
          <div className="rover-photos">
            {roverPhotos && roverPhotos.map(photo => (
              <img key={photo.id} src={photo.img_src} alt={photo.id} />
            ))}
            <button onClick={loadMoreRoverPhotos}>Load More Photos</button>
          </div>
        )}
      </section>
      <section className="footer-section">
        <h2>Creator</h2>
        <Footer />
      </section>
    </main>
  );
}

export default Home;
