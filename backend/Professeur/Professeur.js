var db = require('../db');

var Professeur = {
    getprofesseur: function (id_enseignement,callback) {

        return db.query('SELECT * FROM enseignements_profs \n' +
            'JOIN ressources_profs on (enseignements_profs.codeRessource=ressources_profs.codeProf) \n' +
            'WHERE enseignements_profs.codeEnseignement=?',[id_enseignement],callback);
    },

}

module.exports = Professeur;
