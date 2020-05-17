<template>
  <div class="dashboard">
    <div class="wrapper">
      <input-vue placeholder="Palavra em inglês" v-model="word" />
      <button-vue :border="true" text="Salvar palavra" :color="{'back':'#FFF', 'text': '#525A79'}" @click.native="saveWord"/>
      <span @click="logout">Sair</span>
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
  },
  methods: {
  	async logout() {
    	await this.$store.dispatch('logout')
			try {
				await this.$router.push({'name': 'Home'})
			}
			catch(err) {
				console.log(err)
			}
 	 }
	},
}
</script>

<style scoped>
.dashboard {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
span {
  color: var(--white);
  cursor: pointer;
}
</style>
