import React from 'react';
import './ISSWidget.css';

const ISSWidget = () => {
  return (
    <div className="widget-container">
      <iframe
        src="https://spotthestation.nasa.gov/widget/widget2.cfm?theme=2"
        frameBorder="0"
        className="widget-iframe"
        title="ISS Tracker"
      ></iframe>
    </div>

  );
};

export default ISSWidget;
