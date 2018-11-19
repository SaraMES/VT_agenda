var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
var Professeur = require('./Professeur');

router.get('/:id_enseignement?', function (req, res) {
    Professeur.getprofesseur(req.params.id_enseignement,function (err, rows) {
        if (err) {
            res.status(400).json(err);
        }
        else {
            res.json(rows);
        }
    });
});



module.exports = router;
