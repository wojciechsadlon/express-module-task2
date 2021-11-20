const express = require('express');
const router = express.Router();
const db = require('./../db');

// const func = require('./../server');
// const showByID = require('./../server');
// const addTestimonial = require('./../server');
// const modifyResource = require('./../server');
// const deleteElem = require('./../server');

router.route('/testimonials').get((req, res) => {
  res.json( db.testimonials );
});

router.route('/testimonials/random').get((req, res) => {
  showRandom(res, 'testimonials');
});

router.route('/testimonials/:id').get((req, res) => {
  showByID(req.params.id, res, 'testimonials');
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;

  if(author && text){
    addTestimonial(req.body);
    res.json({message: 'OK'});
  }else res.json({message: 'ERROR'});
});

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;

  if(author && text){
    modifyResource(req.body, req.params.id, 'testimonials');
    res.json({message: 'OK'});
  }else res.json({message: 'ERROR'});
});

router.route('/testimonials/:id').delete((req, res) => {

  if(req.params.id){
    deleteElem(req.params.id, 'testimonials');
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

const addTestimonial = (resource) => {
  const newElem = { author: resource.author, text: resource.text, id: Math.floor(Math.random() * 99)};
  db.testimonials.push(newElem);
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