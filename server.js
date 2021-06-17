const fs = require('fs');
const express = require('express');
//module built in the Node.js API that provides utilities for working with file and directory paths
  //it makes working with our file system more predictable
const path = require("path")
//require the data
const { notes } = require('./db/db.json')

const app = express();
const PORT = process.env.PORT || 3001;

//will read the index.js files in each of the dircetories indicated
const apiRoutes = require('./routes/apiRoutes');

//middleware functions that allow us to keep our route endpoint callback function
  //express.static method provided a file path to a location in our application
//app.use(express.static('public'));
//method that is built in to Express.js that takes incoming POST data and converts it to key/value pairings that can be accessed in the req.body object
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());


  function writeToDb(notes) {
    notes = JSON.stringify(notes);
    console.log(notes);
    fs.writeFileSync("./db/db.json", notes, function(err) {
      if (err) {
        return console.log(err);
      }
    });
  }

  app.get('/api/notes', (req, res) => {
    console.log(req.query);
    res.json(notes);
  });

  app.post('/api/notes', (req, res) => {
    //req.body.id = notes.length.toString();

    if (notes.length == 0){
      req.body.id = "0";
    } else {
      req.body.id = JSON.stringify(JSONparse(notes[notes.length - 1].id) = 1);
    }
    console.log("req.body.id: " + req.body.id);

    notes.push(req.body);

    writeToDb(notes);
    console.log(notes);

    res.json(req.body);
  });




app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
