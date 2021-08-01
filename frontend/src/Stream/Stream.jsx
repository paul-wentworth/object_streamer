import React, { useEffect, useCallback, useRef } from 'react';

import PropTypes from 'prop-types';

const Stream = ({ onUpdate }) => {
  const ws = useRef(null); // TODO: test if this is necessary, or local var in connect()
  const connect = useCallback(() => {
    // TODO: open, error event handlers?
    ws.current = new WebSocket('ws://localhost:3000/');

    ws.current.onopen = () => {
      console.log('WebSocket opened.');
    };

    ws.current.onmessage = (event) => {
      const results = JSON.parse(event.data);
      onUpdate(results);
    };

    ws.current.onclose = () => {
      console.log('WebSocket closed.');
      ws.current = null;
      setTimeout(connect, 5000);
    };

    return () => {
      // TODO: better way to disable event handler and detect "intentional" close?
      console.log('WebSocket clean up.');
      ws.current.onclose = null;
      ws.current.close();
    };
  }, [onUpdate]);
  useEffect(() => connect(), [connect]);

  return (
    <div>
      Stream?
    </div>
  );
};

Stream.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

export default Stream;
