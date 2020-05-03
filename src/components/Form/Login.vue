<template>
    <form-vue >
      <transition
        name="input-t"
      >
        <input-vue v-if='login' type="text" placeholder="Username:"/>
      </transition>
      <input-vue type="email" placeholder="E-mail"/>
      <input-vue type="password" placeholder="Password"/>
      <button-vue text="Entrar" :color="{'back': '#FFF', 'text': '#525A79'}" />
      <span @click="openForgotPasswordPopup">Esqueceu a senha?</span>
      <message-popup-vue :color="color" :message="message" />          
    </form-vue>
</template>

<script>
import FormVue from './Form.vue'
import InputVue from './Input.vue'
import ButtonVue from '../Button.vue'
import MessagePopupVue from '../MessagePopup.vue'
export default {
    props: ['login'],
    data(){
        return {
            counter: 0,
            popup: false,
            color: '#F00',
            message: 'Você não pode enviar várias confirmações'
        }
    },
    components: {
        FormVue,
        InputVue,
        ButtonVue,
        MessagePopupVue
    },
    methods: {
        openForgotPasswordPopup() {
            this.popup = true
            if (this.counter < 1){
                this.color = '#88E976'
                this.message = 'Um e-mail de confirmação foi mandado para e-mail dado.'
            }
        }
    }
}
</script>

<style scoped>
span {
    color: var(--white);
    font-size: 13px;
    font-weight: bold;
    margin: 5px;
    margin-left: 130px;
    transition: color .15s, cursor .15s;
}
span:hover {
    color: var(--yellow);
    cursor: pointer;
}

.input-t-enter, .input-t-leave-to {
  height: 0 !important;
  border: 0 solid transparent !important;
  opacity: 0 !important;
  color: transparent !important;
  transition-duration: .2s !important;
  margin-top: 0 !important;
}

.input-t-leave, .input-t-enter-to {
  height: 45px !important;
  margin-top: 11px !important;
  opacity: 1 !important;
  border: 3px solid var(--white) !important;
  transition-duration: .2s;
}

</style>