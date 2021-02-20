//initialize dependecies
const express = require('express');
const { notes } = require('./db/db.json');
const fs = require('fs');
const path = require ('path');

//initialize PORT
const PORT = process.env.PORT || 3001

//initialize express server
const app = express();

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());

app.use(express.static('public'));

//routes for the HTML Pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
});
