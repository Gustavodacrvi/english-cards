<template>
  <form-vue>
      <input-vue placeholder="Nome de usuário" />
      <input-vue type="email" placeholder="E-mail"/>
      <input-vue type="password" placeholder="Password"/>
      <button-vue text="Criar conta" :color="{'back': '#FFF', 'text': '#525A79'}" />
      <div class="termos">
          <div class="wrapper">
            <span>
                Ao criar a conta você concorda com os <div><span class="yellow" @click="goToThermsPage">termos de uso</span> e a <span class="yellow" @click="openPrivacyPolicyCard">política de privacidade</span></div>
            </span>
          </div>
      </div>
      <card-vue title="Política de Privacidade" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a metus eget risus tempus gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum nisi non massa commodo viverra. Etiam egestas orci congue dui vulputate placerat. Proin semper blandit ipsum, lacinia semper est efficitur vitae." :method="closePrivacyPolicyCard"/>
      <card-vue title="Termos de uso" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a metus eget risus tempus gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum nisi non massa commodo viverra. Etiam egestas orci congue dui vulputate placerat. Proin semper blandit ipsum, lacinia semper est efficitur vitae." :method="closeThermsCard"/>
  </form-vue>
</template>

<script>
import FormVue from './Form.vue'
import InputVue from './Input.vue'
import ButtonVue from '../Button.vue'
import CardVue from '../Card/Card.vue'
export default {
    data() {
        return {
            therms: false,
            privacy: false
        }
    },
    components: {
        FormVue,
        InputVue,
        ButtonVue,
        CardVue
    },
    methods: {
        goToThermsPage() {
            this.therms = true
        },
        openPrivacyPolicyCard() {
            this.privacy = true
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