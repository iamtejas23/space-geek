import React, { useState, useEffect } from 'react';
import './OacApiData.css'; // CSS file for styling

const SolarSystem = () => {
  const [bodies, setBodies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const apiUrl = 'https://api.le-systeme-solaire.net/rest/bodies/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        setBodies(jsonData.bodies);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredBodies = bodies.filter(body =>
    body.englishName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="solar-system-container">
      <h1 className="title">Solar System Bodies</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      {loading ? (
        <p>Loading Solar System Bodies...</p>
      ) : (
        <div className="planet-list">
          {filteredBodies.map(body => (
            <div key={body.id} className="planet-card">
              <h2 className="planet-name">{body.englishName}</h2>
              <div className="planet-details">
                <p><span className="label">Mass:</span> {body.mass ? `${body.mass.massValue} x 10^{body.mass.massExponent} kg` : 'N/A'}</p>
                <p><span className="label">Semimajor Axis:</span> {body.semimajorAxis ? `${body.semimajorAxis} km` : 'N/A'}</p>
                <p><span className="label">Gravity:</span> {body.gravity ? `${body.gravity} m/s²` : 'N/A'}</p>
                <p><span className="label">Discovered By:</span> {body.discoveredBy ? body.discoveredBy : 'N/A'}</p>
                <p><span className="label">Discovery Date:</span> {body.discoveryDate ? body.discoveryDate : 'N/A'}</p>
                <p><span className="label">Is Planet:</span> {body.isPlanet ? 'Yes' : 'No'}</p>
                <p><span className="label">Axial Tilt:</span> {body.axialTilt ? `${body.axialTilt}°` : 'N/A'}</p>
                <p><span className="label">Mean Radius:</span> {body.meanRadius ? `${body.meanRadius} km` : 'N/A'}</p>
                <p><span className="label">Volume:</span> {body.vol ? `${body.vol.volValue} x 10^{body.vol.volExponent} km³` : 'N/A'}</p>
                <p><span className="label">Escape Velocity:</span> {body.escape ? `${body.escape} km/s` : 'N/A'}</p>
                <p><span className="label">Polar Radius:</span> {body.polarRadius ? `${body.polarRadius} km` : 'N/A'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SolarSystem;
