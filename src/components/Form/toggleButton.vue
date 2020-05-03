<template>
  <div class="toggle-button">
    <div class="form-wrapper">
      <div class="button-wrapper">
        <span class="btn" :class="{active: !login}" @click="login = false">
          Entrar
        </span>
        <span class="btn" :class="{active: login}" @click="login = true">
          Criar conta
        </span>

        <div class="background" :class="{moveBtn: login}">

        </div>
      </div>
      <login-vue
        :login='login'
      />
    </div>
  </div>
</template>

<script>

import LoginVue from './Login.vue'

export default {
  data() {
    return {
      login: false,
    }
  },
  methods: {
  },
  components: {
    LoginVue,
  },
}
</script>

<style scoped>

.toggle-button, .button-wrapper {
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-wrapper {
  width: 268px;
}

.button-wrapper {
  margin: 5px auto;
  height: 48px;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  background: var(--white);
  border: 3px solid var(--white);
  position: relative;
}

.background {
  position: absolute;
  
  left: 0;
  
  width: 50%;
  height: 100%;
  background-color: var(--primary);
  border-radius: 8px;
  z-index: 1;
  transition-duration: .2s;
}

.background.moveBtn {
  left: 50%;
}

.btn {
  z-index: 2;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--primary);
  transform: translate(0%);
  width: 135px;
  margin: 0px;
  border-radius: 8px;
  font-weight: bold;
  height: 45px;
  outline: none;
  cursor: pointer;
  transition-duration: .2s;
}

.active {
  color: var(--white);
  border: none;
  width: 135px;
  height: 45px;
  border-radius: 8px;
  cursor: auto;
}

</style>