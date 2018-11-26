<template>
  <div id="medit" class="container">
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <div class="field">
            <label class="label">Date de la séance</label>
            <div class="control">
              <input class="input" type="text" placeholder="Text input" v-bind:value="seance.date">
            </div>
          </div>
          <div class="field">
            <label class="label">Heure de début</label>
            <div class="control">
              <input class="input" type="text" placeholder="Text input" v-bind:value="seance.heure">
            </div>
          </div>
          <div class="field">
            <label class="label">Durée de la séance</label>
            <div class="control">
              <input class="input" type="text" placeholder="Text input" v-bind:value="seance.duree">
            </div>
          </div>
          <div class="field">
            <label class="label">Enseignement</label>
            <div class="control">
              <input class="input" type="text" placeholder="Text input" v-bind:value="seance.codeEnseignement">
            </div>
          </div>
          <div class="field">
            <label class="label">Commentaire</label>
            <div class="control">
              <textarea class="textarea" placeholder="Textarea" v-bind:value="seance.commentaire"></textarea>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link">Submit</button>
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
      end: ''
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
    formatDate: function () {
      this.seance.date = this.selection.start.format() + '.000Z'
      console.log(this.seance.date)
    },
    formatHeure: function () {
      var complete = this.selection.start.format().slice(11, 16)

      var heure = complete.slice(0, 2)
      if (heure < 10) {
        heure = heure.slice(1, 2)
      }

      var minute = complete.slice(3, 5)

      this.seance.heure = heure.toString() + minute.toString()
    },
    formatDuree: function () {
      var complete = this.selection.end.format().slice(11, 16)

      var heure = complete.slice(0, 2)
      if (heure < 10) {
        heure = heure.slice(1, 2)
      }

      var minute = complete.slice(3, 5)

      var heureFin = heure.toString() + minute.toString()
      this.seance.duree = (heureFin - this.seance.heure).toString()
    },
    formatCodeEnseignement: function () {
      this.seance.codeEnseignement = this.selection.title.slice(0, 9)
      console.log(this.seance.codeEnseignement)
    },
    formatProfesseur: function () {
      this.seance.codeEnseignement = this.selection.title.slice(10, 19)
      console.log(this.selection.title.slice(10, 19))
    },
    formatSalle: function () {
      console.log(this.selection.title.slice(19, 42))
    },
    getProfesseur: function () {
      axios.get('http://localhost:3000/professeur/' + this.seance.codeEnseignement)
        .then((response) => {
          for (var i = 0; i < response.data.length; i++) {
            console.log(response.data[i])
            var al = response.data[i].alias
            var code = response.data[i].codeEnseignement

            this.enseignements.push({alias: al, codeEnseignement: code})
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addSeance: function () {
      axios.post('http://localhost:3000/seance')
        .then((response) => {
          for (var i = 0; i < response.data.length; i++) {
            console.log(response.data[i])
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
    this.formatCodeEnseignement()
    this.formatProfesseur()
    this.formatSalle()
    this.formatDate()
    this.formatHeure()
    this.formatDuree()

    axios.get('http://localhost:3000/enseignement')
      .then((response) => {
        console.log(response.data.length)
        for (var i = 0; i < response.data.length; i++) {
          var al = response.data[i].alias
          var code = response.data[i].codeEnseignement

          this.enseignements.push({alias: al, codeEnseignement: code})
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<style>

</style>
