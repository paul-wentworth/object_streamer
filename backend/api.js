/*
TODO: error handling on all endpoints
TODO: unit testing all endpoints
TODO: dont send results?
*/
const db = require('./db');

const createObject = async (req, res) => {
  const {
    title, x, y, velocityX, velocityY, properties,
  } = req.body;

  try {
    const results = await db.insertObject(title, x, y, velocityX, velocityY, properties);
    res.status(200).send({ created: results.rowCount });
  } catch (err) {
    res.status(500).json({ err }); // TODO: don't expose error to client.
  }
};

const readObjects = async (req, res) => {
  try {
    const results = await db.selectObjects();
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(500).json({ err }); // TODO: don't expose error to client.
  }
};

const updateObject = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const {
    title, x, y, velocityX, velocityY, properties,
  } = req.body;

  try {
    const results = await db.updateObject(id, title, x, y, velocityX, velocityY, properties);
    res.status(200).send({ updated: results.rowCount });
  } catch (err) {
    res.status(500).json({ err }); // TODO: don't expose error to client.
  }
};

const deleteObject = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const results = await db.deleteObject(id);
    res.status(200).send({ deleted: results.rowCount });
  } catch (err) {
    res.status(500).json({ err }); // TODO: don't expose error to client.
  }
};

module.exports = {
  createObject, readObjects, updateObject, deleteObject,
};
