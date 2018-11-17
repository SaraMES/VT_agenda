var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
var Calendrier = require('./Calendrier');

router.get('/:debut?/:fin?', function (req, res) {
    Calendrier.getcalendrier(req.params.debut,req.params.fin,function (err, rows) {
        if (err) {
            res.status(400).json(err);
        }
        else {
            res.json(rows);
        }
    });
});



module.exports = router;
