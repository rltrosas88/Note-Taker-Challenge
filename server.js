const fs = require('fs');
const express = require('express');
//module built in the Node.js API that provides utilities for working with file and directory paths
  //it makes working with our file system more predictable
//const path = require("path")
//require the data
const { notes } = require('./db/db.json')

const app = express();
const PORT = process.env.PORT || 3001;

//will read the index.js files in each of the dircetories indicated
//const apiRoutes = require('./routes/apiRoutes');

//middleware functions that allow us to keep our route endpoint callback function
  //express.static method provided a file path to a location in our application
//app.use(express.static('public'));
//method that is built in to Express.js that takes incoming POST data and converts it to key/value pairings that can be accessed in the req.body object
//app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
//app.use(express.json());

app.get('/api/notes', (req, res) => {
  let results = notes;
  console.log(req.query)
  res.json(results);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });