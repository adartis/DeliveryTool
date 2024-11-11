// src/App.jsx
import React, { useState } from 'react';
import './style.css';
import Banner from './components/Banner';
import LeftPanel from './components/LeftPanel';
import MiddlePanel from './components/MiddlePanel';

function App() {
  const [activeElement, setActiveElement] = useState(null);

  const handleElementClick = (element) => setActiveElement(element);

  return (
    <>
      <Banner />
      <div className="container">
        <LeftPanel onElementClick={handleElementClick} />
        <MiddlePanel activeElement={activeElement} />
      </div>
    </>
  );
}

export default App;