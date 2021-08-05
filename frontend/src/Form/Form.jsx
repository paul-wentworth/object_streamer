import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, TextField, Typography, Divider, Paper,
} from '@material-ui/core';
import { optionalIdObjectType } from '../proptypes';
import styles from './Form.module.css';

const newObject = {
  // An undefined `id` signifies a "new" object.
  title: '',
  x: 0,
  y: 0,
  velocityX: 0,
  velocityY: 0,
  properties: {},
};

const Form = ({ object, style }) => {
  const [title, setTitle] = useState('');
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [velocityX, setVelocityX] = useState('');
  const [velocityY, setVelocityY] = useState('');
  // NOTE: Properties will convert values to JSON for display in the input field
  const [properties, setProperties] = useState({});
  const [newProperty, setNewProperty] = useState('');
  const [creatingNew, setCreatingNew] = useState(true);

  const resetState = (o) => {
    setTitle(o.title);
    setX(o.x);
    setY(o.y);
    setVelocityX(o.velocityX);
    setVelocityY(o.velocityY);
    setProperties(o.properties);
    setNewProperty('');
    setCreatingNew(o.id === undefined);
  };

  useEffect(() => {
    resetState(object);
  }, [object]);

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
    if (!creatingNew) {
      data.id = object.id;
      url += `/${object.id}`;
    }

    const req = {
      method: !creatingNew ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    console.log(url, data);
    const res = await fetch(url, req);
    // const json = await res.json();
    // TODO: do we do anything here?
  };

  const deleteObject = async () => {
    const url = `/objects/${object.id}`;
    const req = {
      method: 'DELETE',
    };

    const res = await fetch(url, req);
    if (res.status === 200) {
      resetState(newObject);
    }
  };

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
          Remove
        </Button>
      </div>
    </div>
  ));

  return (
    <div className={style}>
      <Paper variant="outlined" className={styles.paper}>
        <div className={styles.form}>
          <div className={styles.titleDiv}>
            <Typography variant="h6">
              {creatingNew ? 'Create Object' : 'Edit Object'}
            </Typography>
            <div className={styles.resetButtonDiv}>
              <Button
                fullWidth
                variant="text"
                color="secondary"
                type="button"
                onClick={() => resetState(newObject)}
              >
                Reset
              </Button>
            </div>
          </div>

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

            <div className={styles.createDeleteButtonDiv}>
              <div className={styles.createButtonDiv}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  {creatingNew ? 'Create' : 'Edit'}
                </Button>
              </div>
              {!creatingNew && (
              <div className={styles.deleteButtonDiv}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="button"
                  fullWidth
                  onClick={() => deleteObject()}
                >
                  Delete
                </Button>
              </div>
              )}
            </div>
          </form>

          <Divider />

          <Typography className={styles.addPropertyTypography} variant="h6">
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
  object: optionalIdObjectType,
  style: PropTypes.string,
};
Form.defaultProps = {
  object: newObject,
  style: '',
};

export default Form;
