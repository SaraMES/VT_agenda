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


var ProfesseurController = require('./Professeur/ProfesseurController');
app.use('/professeur', ProfesseurController);

var EnseignementController = require('./Enseignement/EnseignementController');
app.use('/enseignement', EnseignementController );

var SalleController = require('./Salle/SalleController');
app.use('/salle', SalleController );

var SeanceController = require('./Seance/SeanceController');
app.use('/seance', SeanceController);

var LastSeanceController = require('./lastseance/LastSeanceController');
app.use('/lastseance', LastSeanceController);


module.exports = app;
