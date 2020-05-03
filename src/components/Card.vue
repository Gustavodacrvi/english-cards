<template>
  <div class="card">
      <div v-if="content" class="content">
          <h1>{{title}}</h1>
          <span>{{content}}</span>
      </div>
      <button-vue :width="268" text="Voltar" :method="method" :color="{'back': '#FFD166', 'text': '#FFFFFF'}" />
  </div>
</template>

<script>
import ButtonVue from './Button.vue'
export default {
    components: {
        ButtonVue
    },
    props: {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String
        },
        method: {
            type: Function
        }
    }
}
</script>

<style scoped>
span, h1 {
    color: var(--white);
}
h1{
    font-size: 20px;
    font-weight: bold;
}
span {
    font-size: 14px;
    font-weight: 600;
}
.card {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    background: var(--primary);
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
}
.content {
    display: flex;
    align-items: center;
    max-width: 235px;
    text-align: left;
    margin: 5px;
    flex-direction: column;
}

</style>