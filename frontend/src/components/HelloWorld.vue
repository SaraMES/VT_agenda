<template>
  <div id="HelloWorld">
    <full-calendar :config="config" :events="events" />
    <medit
      v-if="showModal"
      @mclose="showModal=false"
      v-bind:course="selected"
    ></medit>
    <button @click="showModal=true">Show Modal</button>
  </div>
</template>
<script>
import axios from 'axios'
import $ from 'jquery'
import 'fullcalendar'
import medit from './medit.vue'

const url = 'http://localhost:3000/calendrier/'

export default {
  name: 'HelloWorld',
  components: {
    'medit': medit
  },
  data () {
    return {
      showModal: false,
      events: [
        {
          title: '',
          start: '',
          end: ''
        }
      ],
      config: {
        monthStart: '',
        monthEnd: '',
        defaultView: 'month',

        eventClick: (event) => {
          console.log('eventClick')
          this.selected = event
          console.log(event)
          this.showModal = true
        },

        eventRender: function (event, element) {
          console.log('eventRender')
        },

        dayClick: function (date, event, view) {
          console.log('dayClick')
          console.log('clicked on ' + date.format())
          this.selected = event
          console.log(event)
        },

        eventDrop: function () {
          console.log('eventDrop')
        },
        mclose: function () {
          console.log('close modal')
        }
      }
    }
  },

  selected: {
    title: '',
    start: '',
    end: ''
  },

  methods: {
    formatTitle: function (Seance, Prof, Salle) {
      var title

      title = '\n' + Seance + '/' + '\n' + Prof + '/' + '\n' + Salle

      return title
    },

    formatStart: function (dateSeance, h, min) {
      var start

      if (h < 10) {
        start = dateSeance + ' ' + '0' + h + ':' + min
      } else {
        start = dateSeance + ' ' + h + ':' + min
      }

      return start
    },

    formatEnd: function (dateSeance, heureSeance, dureeSeance) {
      var end
      var dureeInt = heureSeance + dureeSeance

      if (dureeInt % 100 < 60) {
        var h5 = parseInt(dureeInt / 100)
        var min5 = dureeInt % 100
        if (h5 < 10) {
          end = dateSeance + ' ' + '0' + h5 + ':' + min5
        } else {
          end = dateSeance + ' ' + h5 + ':' + min5
        }
      }
      if (dureeInt % 100 === 0) {
        var h4 = parseInt(dureeInt / 100)

        if (h4 < 10) {
          end = dateSeance + ' ' + '0' + h4 + ':' + '00'
        } else {
          end = dateSeance + ' ' + h4 + ':' + '00'
        }
      }
      if (dureeInt % 100 > 60) {
        var h1 = parseInt(dureeInt / 100) + parseInt((dureeInt % 100) / 60)
        var min1 = dureeInt % 60
        if (h1 < 10) {
          end = dateSeance + ' ' + '0' + h1 + ':' + min1
        } else {
          end = dateSeance + ' ' + h1 + ':' + min1
        }
      }
      if (dureeInt % 100 === 60) {
        var h3 = parseInt(dureeInt / 100) + parseInt((dureeInt % 100) / 60)
        var min3 = '00'
        if (h3 < 10) {
          end = dateSeance + ' ' + '0' + h3 + ':' + min3
        } else {
          end = dateSeance + ' ' + h3 + ':' + min3
        }
      }

      return end
    },

    formatMonthFromTo: function () {
      var moment = $('#calendar').fullCalendar('getDate')
      moment.stripTime()

      this.config.monthStart = moment.format().slice(0, 8) + '01'
      this.config.monthEnd = moment.format().slice(0, 8) + '31'
    },

    formatUrl: function () {
      var usedUrl = url
      usedUrl += this.config.monthStart + '/'
      usedUrl += this.config.monthEnd + '/'

      console.log(usedUrl)

      return usedUrl
    },
    refreshEvents () {
      console.log('refresh')
      this.$refs.calendar.$emit('refetch-events')
    },
    removeEvent () {
      console.log('remove')
      this.$refs.calendar.$emit('remove-event', this.selected)
      this.selected = {}
    },
    eventSelected (event) {
      console.log('selected')
      this.selected = event
    },
    eventCreated (...test) {
      console.log('eventCreated')
    }
  },

  mounted () {
    console.log(url)
    this.formatMonthFromTo()

    axios.get('http://localhost:3000/calendrier/2018-01-01/2018-12-31')
      .then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          var Seance = response.data[i].codeEnseignement
          var Salle = response.data[i].nom_salle
          var Prof = response.data[i].nom

          var titre = this.formatTitle(Seance, Prof, Salle)

          var dateSeance = new Date(response.data[i].dateSeance).toISOString().slice(0, 10)
          var h = parseInt(response.data[i].heureSeance / 100)
          var min = response.data[i].heureSeance - (h * 100)

          var debut = this.formatStart(dateSeance, h, min)

          var heureSeance = response.data[i].heureSeance
          var dureeSeance = response.data[i].dureeSeance

          var fin = this.formatEnd(dateSeance, heureSeance, dureeSeance)

          this.events.push({title: titre, start: debut, end: fin})
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
