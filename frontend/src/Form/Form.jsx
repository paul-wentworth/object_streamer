import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, TextField, Typography, Divider, Paper, Title,
} from '@material-ui/core';
import { objectType } from '../proptypes';
import styles from './Form.module.css';

const Form = ({ object, style }) => {
  // TODO: make sure we're setting state the best way here.
  // TODO: do we need all this individual state?
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
    <div key={k} className={styles.propertyDiv}>
      <TextField
        className={styles.propertyTextField}
        variant="outlined"
        margin="normal"
        autoComplete="off"
        label={k}
        name={k}
        id={k}
        type="string"
        value={properties[k]}
        onChange={(e) => changeProperty(k, e.target.value)}
      />
      <div className={styles.propertyButtonDiv}>
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          type="button"
          onClick={() => removeProperty(k)}
        >
          Delete
        </Button>
      </div>
    </div>
  ));

  return (
    <div className={style}>
      <Paper variant="outlined" className={styles.paper}>
        <div className={styles.form}>
          <Typography className={styles.title} variant="h6">
            Create/Update Object
          </Typography>

          <form onSubmit={(e) => onSubmit(e)}>

            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              required
              autoComplete="off"
              label="Title"
              name="title"
              id="title"
              type="string"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={title.length <= 0}
            />

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              required
              autoComplete="off"
              label="X"
              name="x"
              id="x"
              type="number"
              value={x}
              onChange={(e) => setX(e.target.value)}
              error={x.length <= 0}
            />

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              required
              autoComplete="off"
              label="Y"
              name="y"
              id="y"
              type="number"
              value={y}
              onChange={(e) => setY(e.target.value)}
              error={y.length <= 0}
            />

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              required
              autoComplete="off"
              label="Velocity X"
              name="velocityX"
              id="velocityX"
              type="number"
              value={velocityX}
              onChange={(e) => setVelocityX(e.target.value)}
              error={velocityX.length <= 0}
            />

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              required
              autoComplete="off"
              label="Velocity Y"
              name="velocityY"
              id="velocityY"
              type="number"
              value={velocityY}
              onChange={(e) => setVelocityY(e.target.value)}
              error={velocityY.length <= 0}
            />

            {formProperties}

            <div className={styles.createUpdateButtonDiv}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Create/Update
              </Button>
            </div>
          </form>

          <Divider />

          <Typography className={styles.title} variant="h6">
            Add Property
          </Typography>

          <form className={styles.addPropertyForm} onSubmit={(e) => addProperty(e)}>
            <TextField
              className={styles.propertyTextField}
              variant="outlined"
              margin="normal"
              required
              autoComplete="off"
              label="New Property Name"
              name="newPropertyName"
              id="newPropertyName"
              type="string"
              value={newProperty}
              onChange={(e) => setNewProperty(e.target.value)}
            />
            <div className={styles.propertyButtonDiv}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Add
              </Button>
            </div>
          </form>
        </div>
      </Paper>
    </div>
  );
};

Form.propTypes = {
  object: objectType,
  style: PropTypes.string,
};
// TODO #0: we need a better way to do this (signify a "new" object)
// a real object from the DB could have a value of 0 == false
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
  style: '',
};

export default Form;
