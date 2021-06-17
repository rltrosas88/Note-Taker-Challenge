const fs = require('fs');
const express = require('express');
//module built in the Node.js API that provides utilities for working with file and directory paths
  //it makes working with our file system more predictable
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

//will read the index.js files in each of the dircetories indicated
const apiRoutes = require('./routes/apiRoutes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes/htmlRoutes');

//middleware functions that allow us to keep our route endpoint callback function
  //express.static method provided a file path to a location in our application
app.use(express.static('public'));
//method that is built in to Express.js that takes incoming POST data and converts it to key/value pairings that can be accessed in the req.body object
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
