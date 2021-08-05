import React from 'react';
import { AppBar, Typography, Button } from '@material-ui/core';
import styles from './Bar.module.css';

const Bar = () => {
  const loadSimulation = async () => {
    const url = '/objects';
    const object1 = {
      title: 'Simulation 1',
      x: 50,
      y: 10,
      velocityX: 0,
      velocityY: 2,
      properties: {},
    };
    const object2 = {
      title: 'Simulation 1',
      x: 10,
      y: 50,
      velocityX: 2,
      velocityY: 0,
      properties: {},
    };
    const req1 = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object1),
    };
    const req2 = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object2),
    };

    fetch(url, req1);
    fetch(url, req2);
  };

  return (
    <AppBar position="static">
      <div className={styles.appBarDiv}>
        <Typography className={styles.title} variant="h5">
          Object Streamer
        </Typography>
        <div className={styles.loadSimulationButtonDiv}>
          <Button
            variant="outlined"
            onClick={loadSimulation}
          >
            Load Simulation
          </Button>
        </div>
      </div>
    </AppBar>
  );
};

export default Bar;
