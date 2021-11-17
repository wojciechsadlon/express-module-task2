const express = require('express');
const router = express.Router();
const db = require('./../db');


router.route('/seats').get((req, res) => {
  res.json( db.seats );
});

router.route('/seats/random').get((req, res) => {
  showRandom(res, 'seats');
});

router.route('/seats/:id').get((req, res) => {
  showByID(req.params.id, res, 'seats');
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;

  if(day && seat && client && email){
    res.json({message: 'OK'});
    addSeat(req.body);
  }else res.json({message: 'ERROR'});
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;

  if(day && seat && client && email){
    res.json({message: 'OK'});
    modifyResource(req.body, req.params.id, 'seats');
  }else res.json({message: 'ERROR'});
});

router.route('/seats/:id').delete((req, res) => {

  if(req.params.id){
    res.json({message: 'OK'});
    deleteElem(req.params.id, 'seats');
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

const addSeat = (resource) => {
  const newElem = { 
    day: resource.day, 
    seat: resource.seat, 
    client: resource.client, 
    email: resource.email, 
    id: Math.floor(Math.random() * 99)
  };

  db.seats.push(newElem);
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