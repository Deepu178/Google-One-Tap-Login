//importing required modules
const express = require('express');
const server = require('./server');
const port = process.env.PORT || 5000;

//creating express app
const app = express();
app.use(express.json());


//setting up the server


//listening to the server

module.exports = app; //exporting the app module  for testing purposes
