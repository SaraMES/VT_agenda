var db = require('../db');

var Enseignement = {
    getenseignement: function (callback) {

        return db.query('SELECT alias, enseignements.codeEnseignement FROM enseignements \n' +
            'JOIN enseignements_groupes on enseignements.codeEnseignement=enseignements_groupes.codeEnseignement \n' +
            'WHERE codeRessource=68196799',callback);
    },

}

module.exports = Enseignement;
