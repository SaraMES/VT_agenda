var db = require('../db');

var Salle = {
    getsalle: function (callback) {

        return db.query('SELECT DISTINCT ressources_salles.nom \n' +
            'FROM enseignements \n' +
            'JOIN ressources_salles on (ressources_salles.codeComposante=enseignements.codeComposante)',callback);
    },

}

module.exports = Salle;
