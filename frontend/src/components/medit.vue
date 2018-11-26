<template>
  <div id="medit" class="container">
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <div class="field">
            <label class="label">Date de la séance</label>
            <div class="control">
              <input class="input" type="text" placeholder="Text input" v-bind:value="this.seance.date">
            </div>
          </div>
          <div class="field">
            <label class="label">Heure de début</label>
            <div class="control">
              <input class="input" type="text" placeholder="Text input" v-bind:value="this.seance.heure">
            </div>
          </div>
          <div class="field">
            <label class="label">Durée de la séance</label>
            <div class="control">
              <input class="input" type="text" placeholder="Text input" v-bind:value="this.seance.duree">
            </div>
          </div>
          <div class="field">
            <label class="label">Enseignement</label>
            <div class="control">
              <input class="input" type="text" placeholder="Text input" v-bind:value="this.seance.titre">
            </div>
          </div>
          <div class="field">
            <label class="label">Commentaire</label>
            <div class="control">
              <textarea class="textarea" placeholder="Textarea" v-bind:value="selection.salle"></textarea>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button v-on:click.prevent="post" class="button is-link">Submit</button>
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
  name: 'medit',
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
      showModal: true,
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
      professeur: {
        nom: ''
      },
      enseignements: [
        {
          alias: '',
          codeEnseignement: ''
        }
      ]
    }
  },
  methods: {
    post: function () {
      console.log('post')
      console.log('date' + this.seance.date)
      console.log('heure' + this.seance.heure)
      console.log('duree' + this.seance.duree)
      console.log('codeEnseignement' + this.seance.codeEnseignement)
      console.log('commentaire' + this.seance.commentaire)
      axios.post('http://localhost:3000/seance', {
        dateSeance: this.seance.date,
        heureSeance: this.seance.heure,
        dureeSeance: this.seance.duree,
        codeEnseignement: '68438839',
        commentaire: this.seance.commentaire
      }).then(function (data) {
        console.log(data)
      })
    },
    formatDate: function () {
      var date = this.selection.start

      date.stripTime()
      this.seance.date = date.format()
    },
    formatCodeEnseignement: function () {
      this.seance.codeEnseignement = this.selection.codeEnseignement
      console.log(this.seance.codeEnseignement)
      console.log('enseignements format' + this.enseignements.length)
    },
    findEnseignement: function () {
      console.log('findEnseignement' + this.enseignements.length)
    },
    formatProfesseur: function () {
      this.seance.codeEnseignement = this.selection.prof
      console.log(this.selection.prof)
    },
    formatSalle: function () {
      console.log(this.selection.title.slice(19, 42))
    },
    getProfesseur: function () {
      console.log('mmh' + this.seance.codeEnseignement)
      axios.get('http://localhost:3000/professeur/' + this.seance.codeEnseignement)
        .then((response) => {
          for (var i = 0; i < response.data.length; i++) {
            console.log('enseignements prof :' + response.data[i])
            var al = response.data[i].alias
            var code = response.data[i].codeEnseignement

            this.enseignements.push({alias: al, codeEnseignement: code})
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  beforeMount () {
    axios.get('http://localhost:3000/enseignement')
      .then((response) => {
        console.log('nombre enseignements' + response.data.length)
        for (var i = 0; i < response.data.length; i++) {
          var al = response.data[i].alias
          var code = response.data[i].codeEnseignement
          console.log('boucle?')
          console.log(this.enseignements.length)
          this.enseignements.push({alias: al, codeEnseignement: code})
        }
      })
      .catch((error) => {
        console.log(error)
      })

    this.seance.titre = this.selection.title
    this.formatCodeEnseignement()
    this.formatDate()
    this.seance.heure = this.selection.hour
    this.seance.duree = this.selection.time
    console.log('test')
    this.findEnseignement()
  },
  mounted () {

  }
}
</script>

<style>

</style>
