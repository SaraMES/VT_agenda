var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
var Seance = require('./Seance');

router.get('/:code_seance?', function (req, res) {
    Seance.getseance(req.params.code_seance,function (err, rows) {
        if (err) {
            res.status(400).json(err);
        }
        else {
            res.json(rows);
        }
    });
});

router.post('/', function (req, res) {
    Seance.createseance(req.body, function (err, count) {
        if (err) {
            res.status(400).json(err);
        }
        else {
           res.json(req.body);
        }
    });
});

router.post('/salle', function (req, res) {
    Seance.createsalleseance(req.body, function (err, count) {
        if (err) {
            res.status(400).json(err);
        }
        else {
            res.json(req.body);
        }
    });
});

router.post('/prof', function (req, res) {
    Seance.createprofseance(req.body, function (err, count) {
        if (err) {
            res.status(400).json(err);
        }
        else {
            res.json(req.body);
        }
    });
});

router.post('/groupe', function (req, res) {
    Seance.creategroupeseance(req.body, function (err, count) {
        if (err) {
            res.status(400).json(err);
        }
        else {
            res.json(req.body);
        }
    });
});

router.post('/delete/:code_seance?', function (req, res) {
    Seance.deleteseance(req.params.code_seance, function (err) {
        if (err) {
            res.status(400).json(err);
        }
        else {
            res.json("Seance supprimée");
        }
    });
});



module.exports = router;
