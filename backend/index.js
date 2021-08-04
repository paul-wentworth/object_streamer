require('dotenv').config();
const express = require('express');
const WebSocketServer = require('ws').Server;
const ws = require('ws');
const api = require('./api');
const db = require('./db');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoints
app.post('/objects', api.createObject);
app.get('/objects', api.readObjects);
app.put('/objects/:id', api.updateObject);
app.delete('/objects/:id', api.deleteObject);

// Listen
const server = app.listen(port, () => {
  console.info(`Server is listening at http://localhost:${port}`);
});

// Websockets
const wss = new WebSocketServer({ server });
const stream = async () => {
  try {
    const results = await db.simulate();
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify(results.rows));
      }
    });
  } catch (err) {
    console.error(err);
  }
};
setInterval(stream, 500);
