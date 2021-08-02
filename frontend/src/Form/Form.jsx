/*

3) POST
4) POST new
5) click on object to populate form
6) POST existing
*/

import React, { useEffect, useState } from 'react';
import { objectType } from '../proptypes';
import './Form.css';

const Form = ({ object }) => {
  // TODO: make sure we're setting state the best way here.
  const [title, setTitle] = useState('');
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [velocityX, setVelocityX] = useState('');
  const [velocityY, setVelocityY] = useState('');
  // NOTE: Properties will convert values to JSON for display in the input field
  const [properties, setProperties] = useState('');
  const [newProperty, setNewProperty] = useState('');

  const changeProperty = (property, value) => {
    setProperties({ ...properties, [property]: value });
  };

  const removeProperty = (property) => {
    const shallowCopy = { ...properties };
    delete shallowCopy[property];
    setProperties(shallowCopy);
  };

  const addProperty = (e) => {
    e.preventDefault();
    setProperties({ ...properties, [newProperty]: '' });
  };

  const onSubmit = async (e) => {
    // TODO: convert strings back to JSON objects for DB storage?
    e.preventDefault(); // Override default behavior.

    let url = '/objects';
    const data = {
      title, x, y, velocityX, velocityY, properties,
    };
    if (object.id) {
      data.id = object.id;
      url += `/${object.id}`;
    }

    const req = {
      method: object.id ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const resp = await fetch(url, req);
    // const json = await resp.json();
    // TODO: do we do anything here?
  };

  useEffect(() => {
    setTitle(object.title);
    setX(object.x);
    setY(object.y);
    setVelocityX(object.velocityX);
    setVelocityY(object.velocityY);
    setProperties(object.properties);
  }, [object]);

  const formProperties = Object.keys(properties).map((k) => (
    <div key={k}>
      <label htmlFor={k}>
        {k}
        <input
          type="string"
          className="input"
          id={k}
          value={properties[k]}
          onChange={(e) => changeProperty(k, e.target.value)}
        />
      </label>
      <button type="button" onClick={() => removeProperty(k)}>
        Delete
      </button>
    </div>
  ));

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>

        <label htmlFor="title">
          Title
          <input
            className="input"
            id="title"
            type="string"
            title="Title"
            maxLength="255"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label htmlFor="x">
          X
          <input
            className="input"
            id="x"
            type="number"
            title="X Coordinate"
            maxLength="255"
            value={x}
            onChange={(e) => setX(e.target.value)}
            required
          />
        </label>

        <label htmlFor="y">
          Y
          <input
            className="input"
            id="y"
            name="y"
            type="number"
            title="Y Coordinate"
            maxLength="255"
            value={y}
            onChange={(e) => setY(e.target.value)}
            required
          />
        </label>

        <label htmlFor="velocityX">
          velocityX
          <input
            className="input"
            id="velocityX"
            type="number"
            title="X Velocity"
            maxLength="255"
            value={velocityX}
            onChange={(e) => setVelocityX(e.target.value)}
            required
          />
        </label>

        <label htmlFor="velocityY">
          velocityY
          <input
            className="input"
            id="velocityY"
            type="number"
            title="Y Velocity"
            maxLength="255"
            value={velocityY}
            onChange={(e) => setVelocityY(e.target.value)}
            required
          />
        </label>

        {formProperties}
        <input type="submit" value="Create/Update" className="button" />
      </form>

      <hr />

      <form onSubmit={(e) => addProperty(e)}>
        <input type="submit" value="Add Property" className="dynamic_input" />
        <input
          className="dynamic_input"
          type="string"
          title="New Property Name"
          value={newProperty}
          onChange={(e) => setNewProperty(e.target.value)}
          required
        />
      </form>

    </div>
  );
};

Form.propTypes = {
  object: objectType,
};
Form.defaultProps = {
  object: {
    id: false,
    title: '',
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    properties: {},
  },
};

export default Form;
