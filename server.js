const express = require('express');
const path = require('path');

const app = express();

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  showRandom(res);
});

app.get('/testimonials/:id', (req, res) => {
  showByID(req.params.id, res);
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;

  if(author && text){
    res.json({message: 'OK'});
    addElem(req.body);
  }else res.json({message: 'ERROR'});
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;

  if(author && text){
    res.json({message: 'OK'});
    modifyElem(req.body, req.params.id);
  }else res.json({message: 'ERROR'});
});

app.delete('/testimonials/:id', (req, res) => {

  if(req.params.id){
    res.json({message: 'OK'});
    deleteElem(req.params.id);
  }else res.json({message: 'ERROR'});
});

const showByID = (id, res) => {
  let element = '';

  db.map(elem => {if(elem.id === parseInt(id)) element = elem});

  res.json(element);
};

const showRandom = (res) => {
  const randomElem = db[Math.floor(Math.random() * db.length)];
  res.json(randomElem);
};

const addElem = (elem) => {
  const newElem = { author: elem.author, text: elem.text, id: Math.floor(Math.random() * 99)};
  db.push(newElem);
};

const modifyElem = (newElem, id) => {
  db = db.map(oldElem => {if(oldElem.id === parseInt(id)){
    oldElem.author = newElem.author;
    oldElem.text = newElem.text
  }})
};

const deleteElem = (id) => {
  db.map(item => item.id === parseInt(id) && db.splice(item.index, 1))
};

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});