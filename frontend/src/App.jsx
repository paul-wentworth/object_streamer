import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import PropTypes from 'prop-types';
import './App.css';

const ObjectSvg = ({ object }) => {
  // TODO: if object is one move away from looping, disable animation.
  // TODO: re-enable animation once it loops!
  const {
    x, y,
  } = object;

  return (
    // TODO: can we animate this? managing the animation when it "loops" is difficult.
    <g>
      <circle
        className="object"
        cx={`${x}%`}
        cy={`${y}%`}
        r="3%"
      />
      <text
        className="text"
        x={`${x}%`}
        y={`${y}%`}
        textAnchor="middle"
      >
        {`${Math.round(x)}, ${Math.round(y)}`}
      </text>
    </g>
  );
};
ObjectSvg.propTypes = {
  object: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

function App() {
  const [objects, setObjects] = useState([]);
  const ws = useRef(null); // TODO: test if this is necessary, or local var in connect()
  const connect = useCallback(() => {
    // TODO: open, error event handlers?
    ws.current = new WebSocket('ws://localhost:8080/');

    ws.current.onopen = () => {
      console.log('WebSocket opened.');
    };

    ws.current.onmessage = (event) => {
      const results = JSON.parse(event.data);
      setObjects(results);
    };

    ws.current.onclose = () => {
      console.log('WebSocket closed.');
      ws.current = null;
      setTimeout(connect, 5000);
    };

    return () => {
      console.log('my own close 3 ');
      // TODO: better way to disable event handler and detect "intentional" close?
      ws.current.onclose = null;
      ws.current.close();
    };
  }, []);
  useEffect(() => connect(), [connect]);

  const svgObjects = objects.map((o) => (
    <ObjectSvg key={o.id} object={o} />
  ));

  return (
    <div className="App">
      <header>
        Object Streamer
      </header>
      <svg className="map">
        {svgObjects}
      </svg>
    </div>
  );
}

export default App;
