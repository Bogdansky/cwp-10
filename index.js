const express = require('express');
const app = express();

const readall = require('./handlers/readall.js');
const read = require('./handlers/read.js')

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/films/readall', (request,responce) => {
    responce.send(readall.readall())
});

app.get('/api/films/read', (request,responce) => {
    responce.send(read.read(request.query.id));
});

app.post('/api/films/create');

app.post('/api/films/update');

app.post('/api/films/delete');

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});