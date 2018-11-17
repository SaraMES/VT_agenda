var db = require('../db');

var Calendrier = {
    getcalendrier: function (debut,fin,callback) {

        return db.query('select j_1.*,j_2.nom,j_2.prenom,j_3.nom_salle,j_4.alias from\n' +
            '(SELECT se.*, se_gr.codeRessource FROM seances se JOIN seances_groupes se_gr ON se.codeSeance=se_gr.codeSeance \n' +
            ' WHERE se_gr.codeRessource=68226118 \n' +
            ' AND se.dateSeance BETWEEN ? AND ? \n' +
            ' AND se.deleted=0) j_1 \n' +
            'JOIN \n' +
            ' (select se_pr.codeSeance,re_pr.nom,re_pr.prenom FROM ressources_profs re_pr JOIN seances_profs se_pr ON re_pr.codeProf=se_pr.codeRessource ) j_2 \n' +
            ' on j_1.codeSeance = j_2.codeSeance \n' +
            '  JOIN\n' +
            ' (select se_sa.codeSeance, re_sa.nom as nom_salle FROM seances_salles se_sa JOIN ressources_salles re_sa ON se_sa.codeRessource=re_sa.codeSalle ) j_3 \n' +
            ' ON j_1.codeSeance = j_3.codeSeance \n' +
            ' JOIN (select see.codeSeance, en.alias from seances see join enseignements en on see.codeEnseignement=en.codeEnseignement)j_4 \n' +
            ' ON j_1.codeSeance = j_4.codeSeance\n',[debut,fin],callback);
    },

}

module.exports = Calendrier;
