<template>
    <form-vue >
      <input-vue type="email" placeholder="E-mail"/>
      <input-vue type="password" placeholder="Password"/>
      <button-vue text="Entrar" :color="{'back': '#FFF', 'text': '#525A79'}" />
      <span @click="goToForgotPage">Esqueceu a senha?</span>          
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
        ButtonVue
    },
    methods: {
        goToForgotPage() {
            this.$router.push('/forgot')
        }
    }
}
</script>

<style scoped>
span {
    color: var(--white);
    font-size: 13px;
    font-weight: bold;
    margin-left: 130px;
    transition: color .15s, cursor .15s;
}
span:hover {
    color: var(--yellow);
    cursor: pointer;
}

</style>