import React, { useEffect, useState } from 'react';
import {
  AppBar, ThemeProvider, createTheme, CssBaseline, Typography,
} from '@material-ui/core';
import ReconnectingWebSocket from './socket';
import Map from './Map/Map';
import Form from './Form/Form';
import styles from './App.module.css';

const dummy = {
  id: 1, title: 'test', x: 10, y: 50, velocityX: 0, velocityY: 0, properties: { prop1: 1, prop2: 2 },
};

const dark = createTheme({
  palette: {
    type: 'dark',
  },
});

const App = () => {
  const [objects, setObjects] = useState([]);
  const [currentObject, setCurrentObject] = useState(dummy);

  const objectClicked = (id) => {
    // TODO #0: do we need to do a deep copy here?
    setCurrentObject(objects.find((o) => o.id === id));
  };

  useEffect(() => {
    const ws = new ReconnectingWebSocket('ws://localhost:3000/', setObjects);
    return () => {
      ws.close();
    };
  }, []);

  return (
    <ThemeProvider theme={dark}>
      <CssBaseline />
      <AppBar position="static" className={styles.appBar}>
        <Typography className={styles.title} variant="h5">
          Object Streamer
        </Typography>
      </AppBar>
      <div className={styles.app}>
        <Map objects={objects} onClicked={objectClicked} style={styles.map} />
        <Form object={currentObject} style={styles.form} />
      </div>
    </ThemeProvider>
  );
};

export default App;
