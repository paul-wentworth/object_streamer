import React, { useState } from 'react';
import Map from './Map/Map';
import Stream from './Stream/Stream';
import './App.css';

const App = () => {
  const [objects, setObjects] = useState([]);

  return (
    <div className="App">
      <Stream onUpdate={setObjects} />
      <h1>
        Object Streamer
      </h1>
      <Map objects={objects} />
    </div>
  );
};

export default App;
