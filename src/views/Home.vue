<template>
  <div class="home">
      <toggle-button />
  </div>
</template>

<script>
import toggleButton from '../components/Form/toggleButton.vue'
// @ is an alias to /src
export default {
    name: 'Home',
    components: {
        toggleButton
    }
}
</script>

<style scoped>
.home {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}
</style>
