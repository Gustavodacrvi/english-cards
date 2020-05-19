<template>
  <div class="email">
    <h1>Erro! Email precisa ser confirmado</h1>
		<div class="span">
			<span>Se você recebeu essa mensagem significa que você não confirmou seu email. Por favor confirme seu email ou aperte nesse botão para enviarmos um link de confirmação</span>
		</div>
    <button-vue text="Confirmar Email" @click.native="confirmEmail" :color="{'back': '#FFF', 'text': '#525A79'}" :border="true" class="button" />
      <message-popup-vue :message="message" :color="color"/>
  </div>
</template>

<script>
import ButtonVue from '../components/Button.vue'
import MessagePopupVue from '../components/MessagePopup.vue'
export default {
  data() {
    return {
      message: "",
      popup: false,
      color: "#88E976"
    }
  },
  components: {
    ButtonVue,
    MessagePopupVue
  },
  methods: {
    confirmEmail() {
      this.$store.dispatch('confirmEmail').then((answer)=> {
      this.message = answer
        setTimeout(()=>{
          this.popup = false
        }, 1000)
      })
    }
  }
}
</script>

<style scoped>
.mail {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
}
.span {
	background: #00F;
	width: 300px;
}
.button {
  width: 216px;
}
</style>
