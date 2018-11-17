const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const readall = require('./handlers/readall.js');
const read = require('./handlers/read.js');
const deleteElement = require('./handlers/delete.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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

app.post('/api/films/delete', (request, responce) => {
  console.log(request.body);
  /*let result = deleteElement.delete(request.params.id);  
  console.log(result);
  responce.json(result ? {status:"success"} : {id : "Not found"})*/
  responce.json({id : "Not found"});
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});