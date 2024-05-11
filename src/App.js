// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Iss from './pages/Iss/Iss';
import Catalogs from './pages/Catalogs/Catalogs';
import SpaceAPI from './pages/Spacethings/Spacethings';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/iss" element={<Iss />} />
        <Route path='/catalogs' element={<Catalogs />} />
        <Route path='/spacethings' element={<SpaceAPI />} /> 
      </Routes>
    </Router>
  );
}

export default App;
