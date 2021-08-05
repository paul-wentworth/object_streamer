import React from 'react';
import PropTypes from 'prop-types';
import styles from './StreamedObject.module.css';
import { objectType } from '../proptypes';

const StreamedObject = ({ object, onClicked }) => {
  // TODO: can we animate this? managing the animation when it "loops" is difficult.
  const {
    x, y,
  } = object;

  return (
    <g onClick={() => onClicked(object.id)}>
      <circle
        className={styles.object}
        cx={`${x}%`}
        cy={`${y}%`}
        r="3%"
      />
      <text
        className={styles.text}
        x={`${x}%`}
        y={`${y}%`}
        textAnchor="middle"
      >
        {`${Math.round(x)}, ${Math.round(y)}`}
      </text>
    </g>
  );
};

StreamedObject.propTypes = {
  object: objectType.isRequired,
  onClicked: PropTypes.func.isRequired,
};

export default StreamedObject;
