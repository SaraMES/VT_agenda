<template>
  <div id="medit" class="container">
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <h2>{{ selection.title }}</h2>
          <div class="field">
            <label class="label">Date de la séance</label>
            <div class="control">
              <input class="input" type="text" placeholder="Text input" v-bind:value="selection.title">
            </div>
          </div>
          <div class="field">
            <label class="label">Heure de début</label>
            <div class="control">
              <input class="input" type="text" placeholder="Text input" v-bind:value="selection.start">
            </div>
          </div>
          <div class="field">
            <label class="label">Durée de la séance</label>
            <div class="control">
              <input class="input" type="text" placeholder="Text input" v-bind:value="selection.end">
            </div>
          </div>
          <div class="field">
            <label class="label">Enseignement</label>
            <div class="control">
              <input class="input" type="text" placeholder="Text input" v-bind:value="selection.end">
            </div>
          </div>
          <div class="field">
            <label class="label">Commentaire</label>
            <div class="control">
              <textarea class="textarea" placeholder="Textarea"></textarea>
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
export default {
  name: 'medit',
  props: {
    selection: {
      required: true
    }
  },
  data () {
    return {
      showModal: false
    }
  }
}
</script>

<style>

</style>
