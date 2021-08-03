import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography } from '@material-ui/core';
import StreamedObject from '../StreamedObject/StreamedObject';
import { objectType } from '../proptypes';
import styles from './Map.module.css';

const Map = ({ objects, onClicked, style }) => {
  const svgObjects = objects.map((o) => (
    <StreamedObject key={o.id} object={o} onClicked={onClicked} />
  ));

  return (
    <div className={style}>
      <Paper variant="outlined" className={styles.paper}>
        <Typography className={styles.title} variant="h6">
          Map
        </Typography>
        <svg className={styles.map}>
          {svgObjects}
        </svg>
      </Paper>
    </div>
  );
};

Map.propTypes = {
  objects: PropTypes.arrayOf(objectType).isRequired,
  onClicked: PropTypes.func.isRequired,
  style: PropTypes.string,
};
Map.defaultProps = {
  style: '',
};

export default Map;
