import React, { useState } from 'react';
import { objectType } from '../proptypes';

const Form = ({ object }) => {
  const [title, setTitle] = useState('');
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [velocityX, setVelocityX] = useState('');
  const [velocityY, setVelocityY] = useState('');
  const [properties, setProperties] = useState({});
  return (
    <div>
      <form>
        <input />
      </form>
    </div>
  );
};
