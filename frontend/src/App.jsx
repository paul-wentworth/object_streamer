import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@material-ui/core';
import ReconnectingWebSocket from './socket';
import Bar from './Bar/Bar';
import Map from './Map/Map';
import Form from './Form/Form';
import styles from './App.module.css';

const dark = createTheme({
  palette: {
    type: 'dark',
  },
});

const App = () => {
  const [objects, setObjects] = useState([]);
  const [currentObject, setCurrentObject] = useState();

  const objectClicked = (id) => {
    setCurrentObject(objects.find((o) => o.id === id));
  };

  useEffect(() => {
    const ws = new ReconnectingWebSocket(process.env.REACT_APP_WEBSOCKET_URL, setObjects);
    return () => {
      ws.close();
    };
  }, []);

  return (
    <ThemeProvider theme={dark}>
      <CssBaseline />
      <Bar />
      <div className={styles.app}>
        <Map objects={objects} onClicked={objectClicked} style={styles.map} />
        <Form object={currentObject} style={styles.form} />
      </div>
    </ThemeProvider>
  );
};

export default App;
