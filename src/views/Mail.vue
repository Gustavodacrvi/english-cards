<template>
  <div class="email">
    <h1>Erro! Email precisa ser confirmado</h1>
    <div class="mail">
      <div class="wrapper">
        <div class="span">
          <span>Se você recebeu essa mensagem significa que você não confirmou seu email. Por favor confirme seu email ou aperte nesse botão para enviarmos um link de confirmação</span>
        </div>
        <button-vue text="Confirmar Email" @click.native="confirmEmail" :color="{'back': '#FFF', 'text': '#525A79'}" :border="true" class="button" />
          <transition name="popup" >
          <message-popup-vue v-if="popup" :message="message" :color="color"/>
          </transition>
      </div>

    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
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
  mounted() {
    console.log(this.user)
    //if(this.user.verified) {
    //this.$router.push('/dashboard')
    //}
  },
  components: {
    ButtonVue,
    MessagePopupVue
  },
  methods: {
    confirmEmail() {
      this.$store.dispatch('confirmEmail').then((answer)=> {
        this.message = answer
        this.popup = true
        setTimeout(()=>{
          setTimeout(() => {
            this.popup = false
          }, 5000)
        }, 1000)
      })
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped>
.mail {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wrapper {
  flex-direction: column;
}
.span {
  width: 300px;
  display: flex;
}
span {
  text-align: justify;
  justify-self: flex-start;
}
.popup-enter {
  transform: translateY(100%);
  opacity: .5;
  transition-duration: .2s;
}
.popup-enter-to {
  transform: translateX(0%);
  opacity: 1;
  transition-duration: .2s;
}
.popup-leave-to {
  transform: translateY(25%);
  opacity: .5;
  transition-duration: .2s;
}
.popup-leave {
  transform: translateY(150%);
  transition-duration: .2s;
}
</style>

