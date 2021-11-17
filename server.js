const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');


// app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', testimonialsRoutes);
app.use('/', concertsRoutes);
app.use('/', seatsRoutes);

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

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});