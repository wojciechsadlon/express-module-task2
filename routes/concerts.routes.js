const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/concerts').get((req, res) => {
  res.json( db.concerts );
});

router.route('/concerts/random').get((req, res) => {
  showRandom(res, 'concerts');
});

router.route('/concerts/:id').get((req, res) => {
  showByID(req.params.id, res, 'concerts');
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;

  if(performer && genre && price && day && image){
    addConcert(req.body);
    res.json({message: 'OK'});
  }else res.json({message: 'ERROR'});
});

router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;

  if(performer && genre && price && day && image){
    modifyResource(req.body, req.params.id, 'concerts');
    res.json({message: 'OK'});
  }else res.json({message: 'ERROR'});
});

router.route('/concerts/:id').delete((req, res) => {

  if(req.params.id){
    deleteElem(req.params.id, 'concerts');
    res.json({message: 'OK'});
  }else res.json({message: 'ERROR'});
});


// functionstions

const showByID = (id, res, category) => {
  let element = '';

  db[category].find(elem => {if(elem.id === parseInt(id)) element = elem});

  res.json(element);
};

const showRandom = (res, category) => {
  const randomElem = db[category][Math.floor(Math.random() * db.testimonials.length)];
  res.json(randomElem);
};

const addConcert = (resource) => {
  const newElem = { 
    performer: resource.performer, 
    genre: resource.genre, 
    price: resource.price, 
    day: resource.day, 
    image: resource.image, 
    id: Math.floor(Math.random() * 99)
  };
  db.concerts.push(newElem);
};

const modifyResource = (newElem, id, category) => {
  let element = db[category].find(elem => elem.id === parseInt(id));
  const resourceIndex = db[category].indexOf(element);
  db[category].splice(resourceIndex, 1, newElem)
};

const deleteElem = (id, category) => {
  let element = db[category].find(elem => elem.id === parseInt(id));
  const resourceIndex = db[category].indexOf(element);
  db[category].splice(resourceIndex, 1)
};

module.exports = router;