<template>
  <div id="mshow" class="container">
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ course.title }}</p>
          <button @click="$emit('mclose')" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Enseignant : {{ course.teacher }}</label>
            <label class="label">Salle : {{ course.room }}</label>
            <label class="label">Date : {{ course.start.format().slice(0, 10) }}</label>
            <label class="label">Heure : {{ course.start.format().split('T')[1] }}</label>
            <label class="label">Durée : {{ this.seance.duree }}</label>
          </div>
        </section>
        <footer class="modal-card-foot">
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'mshow',
  props: {
    course: {
      title: '',
      start: '',
      end: '',
      teacher: '',
      room: '',
      code: '',
      hour: '',
      time: ''
    }
  },
  data () {
    return {
      showShowModal: true,
      selection: this.course,
      seance: {
        date: '',
        heure: '',
        duree: '',
        codeEnseignement: '',
        commentaire: ''
      },
      seance_prof: {
        codeSeance: '',
        codeRessource: ''
      },
      professeurs: [
        {
          code: '',
          nom: '',
          prenom: ''
        }
      ],
      enseignements: [
        {
          alias: '',
          codeEnseignement: ''
        }
      ],
      salles: [
        {
          nom: ''
        }
      ]
    }
  },
  methods: {
    formatDate: function () {
      var date = this.selection.year + '-' + this.selection.month + '-' + this.selection.day
      console.log(date)
      this.Seance.date = date

      return date
    },
    formatCodeEnseignement: function () {
      this.seance.codeEnseignement = this.selection.codeEnseignement
    },
    formatProfesseur: function () {
      this.seance.codeEnseignement = this.selection.prof
    },
    formatSalle: function () {
      console.log(this.selection.title.slice(19, 42))
    },
    getProfesseurs: function () {
      this.professeurs.splice(0, this.professeurs.length)
      console.log('mmh' + this.selection.code)
      axios.get('http://localhost:3000/professeur/' + this.selection.code)
        .then((response) => {
          console.log('enseignements prof :' + response.data.codeEnseignement)
          for (var i = 0; i < response.data.length; i++) {
            var c = response.data[i].codeEnseignement
            var n = response.data[i].nom
            var p = response.data[i].prenom
            this.professeurs.push({code: c, nom: n, prenom: p})
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getEnseignements: function () {
      axios.get('http://localhost:3000/enseignement')
        .then((response) => {
          console.log('nombre enseignements' + response.data.length)
          for (var i = 0; i < response.data.length; i++) {
            var al = response.data[i].alias
            var code = response.data[i].codeEnseignement
            this.enseignements.push({alias: al, codeEnseignement: code})
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getSalles: function () {
      axios.get('http://localhost:3000/salle')
        .then((response) => {
          console.log('nombre salles' + response.data.length)
          for (var i = 0; i < response.data.length; i++) {
            var al = response.data[i].nom
            this.salles.push({nom: al})
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    formatHeure: function () {
      var complete = this.selection.hour

      if (complete.toString().slice(0, 1) < 8) {
        var h = complete.toString().slice(0, 1)
        console.log(h)
        var min = complete.toString().split(0, 1)

        this.seance.heure = h + ':' + min
      }
      this.seance.heure = complete.toString().slice(0, 0) + ':' + complete.toString().slice(1, 2)

      console.log(this.seance.heure)
    },
    formatDuree: function () {
      this.seance.duree = '0' + this.course.time.toString().slice(0, 1) + ':' + this.course.time.toString().slice(1, 3)
    }
  },
  beforeMount () {
    this.getEnseignements()
    this.getSalles()
    this.getProfesseurs()
    this.formatHeure()
    this.formatDuree()
  }
}
</script>

<style>
.test{
  float: left;
  padding: 1rem;
}
</style>
