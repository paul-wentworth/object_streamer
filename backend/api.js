/* api.js
 *
 * CRUD REST API for objects.
 *
 */
const db = require('./db');

const validateProperties = (properties) => {
  /* `properties` could be anything at this point i.e., 123, "123", [1, 2, 3], {}
   * All of which is valid JSON and accepted by Postgres
   * We want to ensure it's a JSON object (key/value map)
   */
  if (typeof properties !== 'object' || properties === null || Array.isArray(properties)) {
    throw new Error('Properties is not an object!');
  }
};

const createObject = async (req, res) => {
  const {
    title, x, y, velocityX, velocityY, properties,
  } = req.body;

  try {
    validateProperties(properties);
    const results = await db.insertObject(title, x, y, velocityX, velocityY, properties);
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(500).json();
  }
};

const readObjects = async (req, res) => {
  try {
    const results = await db.selectObjects();
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(500).json();
  }
};

const updateObject = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const {
    title, x, y, velocityX, velocityY, properties,
  } = req.body;

  try {
    validateProperties(properties);
    const results = await db.updateObject(id, title, x, y, velocityX, velocityY, properties);
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(500).json();
  }
};

const deleteObject = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await db.deleteObject(id);
    res.status(200).json();
  } catch (err) {
    res.status(500).json();
  }
};

module.exports = {
  createObject, readObjects, updateObject, deleteObject,
};
