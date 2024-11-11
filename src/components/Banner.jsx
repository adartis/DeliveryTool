// src/components/Banner.jsx
import React from 'react';

const Banner = ({ onNavigate }) => {
  return (
    <div className="banner">
      <h1>Delivery Tool</h1>
      <button onClick={() => onNavigate('home')}>Home -TBC-</button>
      <button onClick={() => onNavigate('project')}>Project Page <br/>-Current-</button>
      <button onClick={() => onNavigate('instructions')}>Instructions -TBC-</button>
    </div>
  );
};

export default Banner;
