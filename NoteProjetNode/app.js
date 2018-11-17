/**
 * Created by daouda on 12/08/17.
 */
var express = require('express');
var app = express();
var cors = require('cors');

// ADD THESE TWO LINES

app.use(cors());



var CalendrierController = require('./calendrier/CalendrierController');
app.use('/calendrier', CalendrierController);

module.exports = app;
