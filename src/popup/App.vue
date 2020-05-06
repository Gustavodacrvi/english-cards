<template>
  <div id="app">
    <transition name="fadeInOut">
      <router-view />
    </transition>
  </div>
</template>


<style>
:root {
  --primary: #525a79;
  --white: #ffffff;
  --almost-black: #5e5e5e;
  --yellow: #FFD166;
}
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap");
html {
  width: 400px;
  height: 450px;
  background: var(--primary);
}
#app {
  font-family: "Open Sans";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--white);
}
.fadeInOut-enter, .fadeInOut-leave-to {
  opacity: 0;
  transition-duration: 1s;
}
.fadeInOut-enter-to, .fadeInOut-leave {
  opacity: 1;
  transition-duration: 1s;
}
</style>
