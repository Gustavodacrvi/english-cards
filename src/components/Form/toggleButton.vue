<template>
  <div class="toggle-button">
      <div class="button">
          <button @click="login = true" :class="{active: login}">Entrar</button>
          <button @click="login = false" :class="{active: !login}">Criar conta</button>
      </div>
      <signup-vue v-if="!login" />
      <login-vue v-if="login" />
  </div>
</template>

<script>
import SignupVue from './Signup.vue'
import LoginVue from './Login.vue'
export default {
    data() {
        return {
            login: false
        }
    },
    methods: {
    },
    components: {
        SignupVue,
        LoginVue
    }
}
</script>

<style scoped>
.button {
    margin: 5px auto;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid var(--white);
    border-radius: 8px;
    width: 268px;
    background: var(--white);
    overflow: hidden;
}
.active {
    background: var(--primary);
    color: var(--white);
    border: none;
    width: 135px;
    height: 45px;
    border-radius: 8px;
    cursor: auto;
}
button {
    background: var(--white);
    color: var(--primary);
    transform: translate(0%);
    border: 3px solid var(--white);
    width: 135px;
    margin: 0px;
    font-weight: bold;
    height: 45px;
    outline: none;
    cursor: pointer;
    transition: 1s;
}
</style>