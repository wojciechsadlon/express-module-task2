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
    addSeat(req.body, res);
  }else res.json({message: 'ERROR'});
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;

  if(day && seat && client && email){
    modifyResource(req.body, req.params.id, 'seats');
    res.json({message: 'OK'});
  }else res.json({message: 'ERROR'});
});

router.route('/seats/:id').delete((req, res) => {

  if(req.params.id){
    deleteElem(req.params.id, 'seats');
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

const addSeat = (resource, res) => {
  if(!db.seats.some(elem => elem.seat === resource.seat && elem.day === resource.day)){

    const newElem = { 
      day: resource.day, 
      seat: resource.seat, 
      client: resource.client, 
      email: resource.email, 
      id: Math.floor(Math.random() * 99)
    };

    db.seats.push(newElem);
    res.json({message: 'OK'});
  } else res.status(405).json({message: "The slot is already taken..."});
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