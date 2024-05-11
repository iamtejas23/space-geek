import React, { useState, useEffect } from 'react';
import './ISSTracker.css';

const IssTracker = () => {
  const [issPosition, setIssPosition] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
        if (!response.ok) {
          throw new Error('Failed to fetch ISS position');
        }
        const data = await response.json();
        setIssPosition(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 5000); // Fetch ISS position every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="iss-con">
        <div className="iss-tracker">
      {issPosition && (
        <div>
          <img
            src={`https://static.wheretheiss.at/v4/satellites/${issPosition.id}/map.png`}
            alt="ISS Location"
            className="iss-image"
          />
          <div className="iss-data">
            <h2>International Space Station (ISS)</h2>
            <p>Latitude: {issPosition.latitude}</p>
            <p>Longitude: {issPosition.longitude}</p>
            <p>Altitude: {issPosition.altitude.toFixed(2)} km</p>
            <p>Velocity: {issPosition.velocity.toFixed(2)} km/h</p>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default IssTracker;
