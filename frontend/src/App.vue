<template>
  <div id="app">
    <router-view/>
    <medit v-if="showModal" @close="showModal=false"></medit>
    <button @click="showModal=true">Show Modal</button>
  </div>
</template>

<script>
import medit from './components/medit.vue'

export default {
  name: 'App',
  components: {
    'medit': medit
  },
  data () {
    return {showModal: false}
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
