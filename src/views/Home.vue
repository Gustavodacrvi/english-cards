<template>
  <div class="home">
      <toggle-button-vue />
  </div>
</template>

<script>
import toggleButtonVue from '../components/Form/toggleButton.vue'
// @ is an alias to /src
export default {
    name: 'Home',
    components: {
        toggleButtonVue
    }
}
</script>

<style scoped>

</style>