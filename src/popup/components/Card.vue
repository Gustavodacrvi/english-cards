<template>
  <div class="card">
    <div class="wrapper">
      <div v-if="content" class="content">
          <h1>{{title}}</h1>
          <span>{{content}}</span>
      </div>
        <button-vue text="Voltar" :color="{'back': '#FFD166', 'text': '#FFFFFF'}" @click.native='method' />
    </div>
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
.card {
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper {
  width: 276px;
}

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
    text-align: left;
    margin: 5px;
    flex-direction: column;
}

</style>