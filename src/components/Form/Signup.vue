<template>
  <form-vue>
      <input-vue placeholder="Nome de usuário" />
      <input-vue type="email" placeholder="E-mail"/>
      <input-vue type="password" placeholder="Password"/>
      <button-vue text="Criar conta" :color="{'back': '#FFF', 'text': '#525A79'}" />
      <div class="termos">
          <div class="wrapper">
            <span>
                Ao criar a conta você concorda com os <div><span class="yellow" @click="goToThermsPage">termos de uso</span> e a <span class="yellow" @click="goToPrivacyPolicyPage">política de privacidade</span></div>
            </span>
          </div>
      </div>
  </form-vue>
</template>

<script>
import FormVue from './Form.vue'
import InputVue from './Input.vue'
import ButtonVue from '../Button.vue'
export default {
    components: {
        FormVue,
        InputVue,
        ButtonVue,
    },
    methods: {
        goToThermsPage() {
            this.$router.push('/therms')
        },
        goToPrivacyPolicyPage() {
            this.$router.push('/privacy')
        },
    }
}
</script>

<style scoped>
.termos {
    color: var(--white);
    font-size: 13px;
    font-weight: bold;
    max-width: 100%;
}
span {
    font-size: 15px;
}
span.yellow {
    color: var(--yellow);
    cursor: pointer;
}
.wrapper {
    width: 100%;
}
</style>