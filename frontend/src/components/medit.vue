<template>
  <div id="medit" class="container">
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <p>Blablabla</p>
        </div>
      </div>
      <button @click="$emit('close')" class="modal-close"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'medit',
  data () {
    return {
      showModal: false
    }
  }
}
</script>

<style>

</style>
