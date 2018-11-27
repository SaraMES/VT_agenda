<template>
  <div id="madd" class="container" @keydown.esc="$emit('mclose')">
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box control">
          <div class="field">
            <label class="label">Matière</label>
            <div class="select" >
              <select class="control" v-model="course.code">
                <option class="input" v-on:click="getProfesseurs" v-for="enseignement in enseignements" :key="enseignement.codeEnseignement" v-bind:value="enseignement.codeEnseignement">{{ enseignement.alias }}</option>
              </select>
            </div>
          </div>
          <div class="field">
            <label class="label">Enseignant</label>
            <div class="select" >
              <select class="control" v-model="course.name">
                <option class="input" v-for="professeur in professeurs" :key="professeur.nom" v-bind:value="professeur.nom">{{ professeur.nom }} {{ professeur.prenom }}</option>
              </select>
            </div>
          </div>
          <div class="field">
            <label class="label">Salle</label>
            <div class="select" >
              <select class="control" v-model="course.room">
                <option class="input" v-for="salle in salles" :key="salle.nom" v-bind:value="salle.nom">{{ salle.nom }}</option>
              </select>
            </div>
          </div>
          <div class="field">
            <label class="label">Date de la séance</label>
            <div class="control">
              <input class="input" type="text" placeholder="Date au format 'ANNEE-MOIS-JOUR'" v-model.lazy="course.date">
            </div>
          </div>
          <div class="field">
            <label class="label">Heure de début</label>
            <div class="control">
              <input class="input" type="text" placeholder="Text input" v-model="course.hour">
            </div>
          </div>
          <div class="field">
            <label class="label">Durée de la séance</label>
            <div class="control">
              <input class="input" type="text" placeholder="Text input" v-model="course.time">
            </div>
          </div>
          <div class="field">
            <label class="label">Commentaire</label>
            <div class="control">
              <textarea class="textarea" placeholder="Textarea" v-model="course.comment"></textarea>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button v-on:click="post" @click="$emit('mclose')" class="button is-link">Submit</button>
            </div>
            <div class="control">
              <button @click="$emit('mclose')" class="button is-text">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'madd',
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
      showAddModal: true,
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
    post: function () {
      console.log('post')
      var lastSeance
      var codeRessource = '68226118'

      axios.post('http://localhost:3000/Seance', {
        dateSeance: this.formatDate(),
        heureSeance: this.selection.hour,
        dureeSeance: this.selection.time,
        codeEnseignement: this.selection.code,
        commentaire: this.selection.comment
      }).then(function (data) {
        alert('tuturuuu!')
        this.showAddModal = false
      })
      axios.get('http://localhost:3000/lastseance')
        .then((response) => {
          console.log('get lastseance')
          for (var i = 0; i < response.data.length; i++) {
            var lastSeance = response.data[i].last_seance
            console.log('n° séance : ' + lastSeance)
          }
        }).catch((error) => {
          console.log(error)
        })
      axios.post('http://localhost:3000/Seance/prof', {
        codeSeance: lastSeance,
        codeRessource: codeRessource
      }).then(function (data) {
        console.log('post seance_prof')
        console.log(data)
      })
      axios.post('http://localhost:3000/Seance/salle', {
        codeSeance: lastSeance,
        codeRessource: codeRessource
      }).then(function (data) {
        console.log('post seance_salle')
        console.log(data)
      })
    },
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
    }
  },
  beforeMount () {
    this.getEnseignements()
    this.getSalles()
  }
}
</script>

<style>

</style>
