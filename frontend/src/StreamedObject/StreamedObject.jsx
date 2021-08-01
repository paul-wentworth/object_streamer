import React from 'react';
import './StreamedObject.css';
import { objectType } from '../proptypes';

const StreamedObject = ({ object }) => {
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
        r="1%"
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

StreamedObject.propTypes = {
  object: objectType.isRequired,
};

export default StreamedObject;
