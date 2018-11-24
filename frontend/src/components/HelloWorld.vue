<template>
  <full-calendar  :config="config" :events="events" />
</template>
<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      calendrier: [],
      events: [
        {
          title: '',
          start: '',
          end: ''
        }],
      config: {
        defaultView: 'month',
        eventRender: function (event, element) {
          console.log(event)
        }
      }
    }
  },
  mounted () {
    axios.get('http://localhost:3000/calendrier/2018-11-05/2018-11-10')
      .then((response) => {
        console.log(response.data)
        this.calendrier = response.data
        for (var i = 0; i < response.data.length; i++) {
          var Seance = response.data[i].codeSeance
          var Salle = response.data[i].nom_salle
          var Prof = response.data[i].nom + ' ' + response.data[i].prenom
          this.events[i].title = '\n' + Seance + '\n' + Prof + '\n' + Salle

          var dateSeance = new Date(response.data[i].dateSeance).toISOString().slice(0, 10)
          var h = parseInt(response.data[i].heureSeance / 100)
          var min = response.data[i].heureSeance - (h * 100)
          if (h < 10) {
            this.events[i].start = dateSeance + ' ' + '0' + h + ':' + min
          } else {
            this.events[i].start = dateSeance + ' ' + h + ':' + min
          }
          var heureSeance = response.data[i].heureSeance
          var dureeSeance = response.data[i].dureeSeance
          var dureeInt = heureSeance + dureeSeance
          if (dureeInt % 100 < 60) {
            var h5 = parseInt(dureeInt / 100)
            var min5 = dureeInt % 100
            if (h5 < 10) {
              this.events[i].end = dateSeance + ' ' + '0' + h5 + ':' + min5
            } else {
              this.events[i].end = dateSeance + ' ' + h5 + ':' + min5
            }
          }
          if (dureeInt % 100 === 0) {
            var h4 = parseInt(dureeInt / 100)
            if (h4 < 10) {
              this.events[i].end = dateSeance + ' ' + '0' + h4 + ':' + '00'
            } else {
              this.events[i].end = dateSeance + ' ' + h4 + ':' + '00'
            }
          }
          if (dureeInt % 100 > 60) {
            var h1 = parseInt(dureeInt / 100) + parseInt((dureeInt % 100) / 60)
            var min1 = dureeInt % 60
            if (h1 < 10) {
              this.events[i].end = dateSeance + ' ' + '0' + h1 + ':' + min1
            } else {
              this.events[i].end = dateSeance + ' ' + h1 + ':' + min1
            }
          }
          if (dureeInt % 100 === 60) {
            var h3 = parseInt(dureeInt / 100) + parseInt((dureeInt % 100) / 60)
            var min3 = '00'
            if (h3 < 10) {
              this.events[i].end = dateSeance + ' ' + '0' + h3 + ':' + min3
            } else {
              this.events[i].end = dateSeance + ' ' + h3 + ':' + min3
            }
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
