import React, { useState, useEffect } from 'react';
import '../../App.css'; // Import your CSS file for styling
import asteroids from '../../assets/asteroids.png';
import { IoPlanetSharp } from "react-icons/io5";
import Footer from '../../components/Footer/Footer';

function Home() {
  const [apodData, setApodData] = useState(null);
  const [neoData, setNeoData] = useState(null);
  const [roverPhotos, setRoverPhotos] = useState([]);

  useEffect(() => {
    fetchApod();
    fetchNeo();
    fetchRoverPhotos();
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
    const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=HNTBQ0TKuM40tQx0w8bxbNQSKUsyJu7RO02Oi01Y`);
    const data = await response.json();
    setRoverPhotos(prevPhotos => [...prevPhotos, ...data.photos]);
  };

  return (
    <main className="main-content">
      <section className="apod-section">
        <h2>Astronomy Picture of the Day</h2>
        {apodData && (
          <div className="apod">
            <img src={apodData.url} alt={apodData.title} />
            <p className='des'>{apodData.explanation}</p>
          </div>
        )}
      </section>
      <section className="neo-section">
        <h2> <img src={asteroids} alt="ast" /> Near Earth Objects </h2>
        {neoData && (
          <div className="neo">
            <p><IoPlanetSharp color='red' /> Total NEOs: {neoData.element_count} </p>
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
      <section className="footer-section">
        <h2>Made By</h2>
        <Footer />
      </section>
    </main>
  );
}

export default Home;
