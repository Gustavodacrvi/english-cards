<template>
    <base-form-vue >
      <transition
        name="input-t"
      >
        <input-vue v-if='firstTime' type="text" v-model="user.username" placeholder="Nome de usuário:"/>
      </transition>
      <input-vue type="email" v-model="user.email" placeholder="E-mail:"/>
      <input-vue type="password" v-model="user.password" placeholder="Senha:"/>
      <button-vue text="Entrar" v-if="!firstTime" @click.native="login" :color="{'back': '#FFF', 'text': '#525A79'}" :border="true" />
      <button-vue text="Criar conta" @click.native="signUp" v-if="firstTime" :color="{'back': '#FFF', 'text': '#525A79'}" :border="true" />
      <span v-if="!firstTime" @click="openForgotPasswordPopup">Esqueceu a senha?</span>
       <div v-if="firstTime" class="termos">	
          <div class="wrapper">	
            <span>	
                Ao criar a conta você concorda com os <span style="display: inline-block"></span><span class="yellow" @click="goToThermsPage">termos de uso</span> e a <span class="yellow" @click="goToPrivacyPolicyPage">política de privacidade</span>	
            </span>	
          </div>	
      </div>
      <transition name="popup" >
        <message-popup-vue v-if="!firstTime && popup" :color="color" :message="message" />          
      </transition>
    </base-form-vue>
</template>

<script>
import {mapState} from 'vuex'
import BaseFormVue from './BaseForm.vue'
import InputVue from './Input.vue'
import ButtonVue from '../Button.vue'
import MessagePopupVue from '../MessagePopup.vue'
export default {
    props: ['firstTime'],
    data(){
        return {
            counter: 0,
            popup: false,
            color: '#F00',
            message: 'Você não pode enviar uma confirmação de email, tente novamente daqui a um segundo',
            user: {
              username: '',
              email: '',
              password: ''
            }
        }
    },
    components: {
        BaseFormVue,
        InputVue,
        ButtonVue,
        MessagePopupVue
    },
    watch: {
      error() {
        if(this.error) {
          this.popup = true
          this.color = '#F00',
          this.message = this.error
          setTimeout(()=> {
            this.popup = false
            this.message = ''
          }, 5000)
        }
      }
    },
    methods: {
        openForgotPasswordPopup() {
          this.popup = true
            if (this.counter < 1) {
                this.color = '#88E976'
                this.message = 'Um e-mail de confirmação foi mandado para e-mail dado.'
                this.counter++
            } else {
              this.color = '#F00'
              this.message = 'Você não pode enviar uma confirmação de email, tente novamente daqui a um segundo'
            }
            setTimeout(()=>{
            this.counter = 0
            setTimeout(()=>{
              this.counter = 0
              this.popup = false
            }, 5000)
            }, 1000)
        },
        goToThermsPage() {	
            this.$router.push("/therms")	
        },	
        goToPrivacyPolicyPage() {	
            this.$router.push('/privacy')	
        },
      async login() {
         await this.$store.dispatch('login', this.user)
					this.$router.push({'name': 'Dashboard'})
        },
     async signUp() {
         await this.$store.dispatch('signUp', this.user)
        }
    },
    computed: {
      ...mapState(['error'])
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
.termos {	
    color: var(--white);	
    font-size: 13px;	
    font-weight: bold;	
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
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.wrapper span {
  margin: 0;
  text-align: left;
}
.wrapper span:hover {
  color: var(--white);
}
.wrapper span.yellow:hover {
  color: var(--yellow);
}
.yellow {
  color: var(--yellow);
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
