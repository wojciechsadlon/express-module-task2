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
    res.json({message: 'OK'});
    addConcert(req.body);
  }else res.json({message: 'ERROR'});
});

router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;

  if(performer && genre && price && day && image){
    res.json({message: 'OK'});
    modifyResource(req.body, req.params.id, 'concerts');
  }else res.json({message: 'ERROR'});
});

router.route('/concerts/:id').delete((req, res) => {

  if(req.params.id){
    res.json({message: 'OK'});
    deleteElem(req.params.id, 'concerts');
  }else res.json({message: 'ERROR'});
});


// functions

const showByID = (id, res, category) => {
  let element = '';

  db[category].map(elem => {if(elem.id === parseInt(id)) element = elem});

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
  db = db[category].map(oldElem => {if(oldElem.id === parseInt(id)){
    oldElem = newElem
  }})
};

const deleteElem = (id, category) => {
  db[category].map(item => item.id === parseInt(id) && db[category].splice(item.index, 1))
};

module.exports = router;