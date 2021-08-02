import React, { useState } from 'react';
import Map from './Map/Map';
import Stream from './Stream/Stream';
import Form from './Form/Form';
import './App.css';

const dummy = {
  id: 1, title: 'test', x: 10, y: 50, velocityX: 0, velocityY: 0, properties: { prop1: 1, prop2: 2 },
};

const App = () => {
  const [objects, setObjects] = useState([]);
  const [currentObject, setCurrentObject] = useState(dummy);

  const objectClicked = (id) => {
    // TODO #0: do we need to do a deep copy here?
    setCurrentObject(objects.find((o) => o.id === id));
  };

  return (
    <div className="App">
      <Stream onUpdate={setObjects} />
      <h1>
        Object Streamer
      </h1>
      <Map objects={objects} onClicked={objectClicked} />
      <Form object={currentObject} />
    </div>
  );
};

export default App;
