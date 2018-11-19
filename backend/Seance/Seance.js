var db = require('../db');

var Seance = {

    getseance: function(code_seance,callback)
    {
        return db.query('select * from seances where codeSeance=?',[code_seance], callback);
    },
    createseance: function (Seance, callback) {
        created = new Date();
        return db.query('Insert into seances(dateSeance,heureSeance, dureeSeance, codeEnseignement,commentaire, dateCreation ) values(?, ?, ?, ?, ? , ? )',[Seance.dateSeance, Seance.heureSeance, Seance.dureeSeance, Seance.codeEnseignement, Seance.commentaire, created], callback);
    },
    createsalleseance: function (Seance, callback) {
        return db.query('Insert into seances_salles (codeSeance,codeRessource)values(?, ?)',[Seance.codeSeance,Seance.codeRessource], callback);
    },
    createprofseance: function (Seance, callback) {
        return db.query('Insert into seances_profs(codeSeance,codeRessource)values(?, ?)',[Seance.codeSeance,Seance.codeRessource], callback);
    },
    deleteseance: function (code_seance, callback) {
        return db.query('UPDATE seanceS SET deleted=1 WHERE codeSeance = ?', [code_seance], callback);
    }
}

module.exports = Seance;
