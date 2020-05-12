<template>
  <div class="dashboard">
    <div class="wrapper">
      <input-vue placeholder="Palavra em inglês" v-model="word" />
      <button-vue :border="true" text="Salvar palavra" :color="{'back':'#FFF', 'text': '#525A79'}" @click.native="saveWord"/>
    </div>
  </div>
</template>

<script>
import InputVue from '../components/Form/Input.vue'
import ButtonVue from '../components/Button.vue'
export default {
  data(){
    return {
      word: ''
    }
  },
    components: {
      ButtonVue,
      InputVue
    }
}
</script>

<style scoped>
.dashboard {
  width: 100%;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>