const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const readall = require('./handlers/readall.js');
const read = require('./handlers/read.js');
const deleteElement = require('./handlers/delete.js');
const createElement = require('./handlers/create.js');
const updateElement = require('./handlers/update.js');

const valid = require('./handlers/valid.js');
const notValidObject = {message: 'Query is not valid'};

const read_handler = (request,responce,next) => {
  if (valid.validRead(request.query)){
    request.result = read.read(request.query.id);
  }
  else{
    request.result = notValidObject;
  }
  next();
}

const create_handler = (request, responce, next) => {
  if (valid.validCreate(request.body)){
    request.result = createElement.create(request.body);
  }
  else{
    request.result = notValidObject;
  }
  next();
}

const update_handler = (request, responce, next) => {
  if (valid.validUpdate(request.body)){
    request.result = updateElement.update(request.body);
  }
  else{
    request.result = notValidObject;
  }
  next();
}

const delete_handler = (request,responce,next) => {
  if (valid.validDelete(request.body)){
    request.result = deleteElement.delete(request.body.id);
  }
  else{
    request.result = notValidObject;
  }
  next();
}

const send = (request,responce) => {
  responce.json(request.result);
}

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/films/readall', (request,responce) => {
    responce.send(readall.readall())
});

app.get('/api/films/read', read_handler, send);

app.post('/api/films/create', create_handler, send);

app.post('/api/films/update', update_handler, send);

app.post('/api/films/delete', delete_handler, send);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
