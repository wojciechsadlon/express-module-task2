const express = require('express');
const router = express.Router();
const db = require('./../db');


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
    res.json({message: 'OK'});
    addTestimonial(req.body);
  }else res.json({message: 'ERROR'});
});

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;

  if(author && text){
    res.json({message: 'OK'});
    modifyResource(req.body, req.params.id, 'testimonials');
  }else res.json({message: 'ERROR'});
});

router.route('/testimonials/:id').delete((req, res) => {

  if(req.params.id){
    res.json({message: 'OK'});
    deleteElem(req.params.id, 'testimonials');
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

const addTestimonial = (resource) => {
  const newElem = { author: resource.author, text: resource.text, id: Math.floor(Math.random() * 99)};
  db.testimonials.push(newElem);
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