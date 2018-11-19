var db = require('../db');

var LastSeance = {

    getlastseance: function(callback)
    {
        return db.query('SELECT max(codeSeance) as last_seance from seances ', callback);
    },

}

module.exports = LastSeance;
