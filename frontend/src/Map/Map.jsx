import React from 'react';
import PropTypes from 'prop-types';
import StreamedObject from '../StreamedObject/StreamedObject';
import { objectType } from '../proptypes';

const Map = ({ objects }) => {
  const svgObjects = objects.map((o) => (
    <StreamedObject key={o.id} object={o} />
  ));

  return (
    <svg className="map">
      {svgObjects}
    </svg>
  );
};

Map.propTypes = {
  objects: PropTypes.arrayOf(objectType).isRequired,
};

export default Map;
