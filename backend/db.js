const { Pool } = require('pg');

const pool = new Pool(({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
}));

const insertObject = async (title, x, y, velocityX, velocityY, properties) => {
  const results = await pool.query(`
  INSERT INTO 
    objects (title, x, y, velocity_x, velocity_y, last_updated, properties) 
  VALUES ($1, $2, $3, $4, $5, NOW(), $6)
  `,
  [title, x, y, velocityX, velocityY, properties]);
  return results;
};

const selectObjects = async () => {
  const results = await pool.query(`
    SELECT 
      id, title, x, y, velocity_x as "velocityX", velocity_y as "velocityY", properties 
    FROM 
      objects
    `);
  return results;
};

const updateObject = async (id, title, x, y, velocityX, velocityY, properties) => {
  /*
  NOTE: if this changes velocity, we need to simulate this row first,
  otherwise we'll "overwrite" the object's progress since the last update.
  On the other hand, if we change position we don't need to do this simulation.

  TODO: handle these cases? Is it necessary - for the simulation accuracy sure, but from the
  client's perspective?
  */
  const results = await pool.query(`
  UPDATE 
    objects 
  SET 
    title = $1, 
    x = $2, 
    y = $3, 
    velocity_x = $4, 
    velocity_y = $5, 
    last_updated = NOW(), 
    properties = $6 
  WHERE id = $7
  `,
  [title, x, y, velocityX, velocityY, properties, id]);
  return results;
};

const deleteObject = async (id) => {
  const results = await pool.query(
    'DELETE FROM objects WHERE id = $1',
    [id],
  );
  return results;
};

const simulate = async () => {
  /* NOTE: with the current architecture of a single simulator "thread" doing multi row updates,
  and multiple incoming atomic (single row) updates from clients,
  there should be no possibility of deadlocks because there will be no cirular wait condition.
  */
  const results = await pool.query(`
  UPDATE
    objects
  SET
    x = CASE
        WHEN (x + (EXTRACT (EPOCH FROM NOW() - last_updated) * velocity_x)) >= 0 
        THEN (x + (EXTRACT (EPOCH FROM NOW() - last_updated) * velocity_x)) :: numeric % 100

        WHEN (x + (EXTRACT (EPOCH FROM NOW() - last_updated) * velocity_x)) < 0 
        THEN 100 + ((x + (EXTRACT (EPOCH FROM NOW() - last_updated) * velocity_x)) :: numeric % 100)
    END,
    y = CASE
        WHEN (y + (EXTRACT (EPOCH FROM NOW() - last_updated) * velocity_y)) >= 0 
        THEN (y + (EXTRACT (EPOCH FROM NOW() - last_updated) * velocity_y)) :: numeric % 100

        WHEN (y + (EXTRACT (EPOCH FROM NOW() - last_updated) * velocity_y)) < 0 
        THEN 100 + ((y + (EXTRACT (EPOCH FROM NOW() - last_updated) * velocity_y)) :: numeric % 100)
    END,
    last_updated = NOW()
  RETURNING id, title, x, y, velocity_x as "velocityX", velocity_y as "velocityY", properties
  `);
  return results;
};

module.exports = {
  insertObject, selectObjects, updateObject, deleteObject, simulate,
};
