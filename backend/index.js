const express = require('express');
const WebSocketServer = require('ws').Server;
const ws = require('ws');
const api = require('./api');
const db = require('./db');

const app = express();
const port = 3000;
const wss = new WebSocketServer({ port: 8080 });

// Websockets
const stream = async () => {
  try {
    const results = await db.simulate();
    console.log(`There are ${wss.clients.size} clients connected.`);
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify(results.rows));
      }
    });
    setTimeout(() => { stream(); }, 500);
  } catch (err) {
    console.log(err);
  }
};
stream();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoints
app.post('/objects', api.createObject);
app.get('/objects', api.readObjects);
app.put('/objects/:id', api.updateObject);
app.delete('/objects/:id', api.deleteObject);

// Go!
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
