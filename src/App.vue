<template>
  <div id="app">
    <router-view />
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
  background: var(--primary);
}
#app {
  font-family: "Open Sans";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--white);
}
</style>
