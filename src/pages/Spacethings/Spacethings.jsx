import React, { useState, useEffect } from 'react';
import './SpaceAPI.css'; // CSS file for styling

const SpaceAPI = () => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = 'https://directory.spaceapi.io/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        setSpaces(jsonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-api-container">
      {/* <h1>SpaceAPI Directory</h1> */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-list">
          {Array.isArray(spaces) && spaces.length > 0 ? (
            spaces.map(space => (
              <div key={space.space} className="space-card">
                <h2>{space.space}</h2>
                <img src={space.logo} alt={`${space.space} logo`} className="space-logo" />
                <p>Location: {space.location.address}</p>
                <p>Contact Email: {space.contact.email}</p>
                <p>Twitter: {space.contact.twitter}</p>
                <p>Open: {space.state.open ? 'Yes' : 'No'}</p>
                <p>Projects:</p>
                <ul>
                  {space.projects.map(project => (
                    <li key={project}>
                      <a href={project} target="_blank" rel="noopener noreferrer">{project}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No data available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SpaceAPI;
