//initialize dependecies
const express = require('express');
const fs = require('fs');
const path = require ('path');
const { v4: uuidv4 } = require('uuid');

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
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

//routes for api functions
app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.post('/api/notes', (req, res) => {
  //get note data from body
  let newNote = req.body;
  
  // create unique id for note
  let noteId = uuidv4();
  
  //read existing notes fron db.json file
  let savedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  console.log(savedNotes);
  //assign unique id to the new note
  newNote.id = noteId;
  
  //push new note to the end of existing notes array
  savedNotes.push(newNote);
  console.log(newNote);
  
  //write the new note to the db.json file
  fs.writeFileSync('./db/db.json', JSON.stringify(savedNotes));
  res.json(savedNotes);
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
});
