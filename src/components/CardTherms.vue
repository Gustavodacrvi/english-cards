<template>
  <div class="card">
    <div class="wrapper">
      <div v-if="content" class="content">
          <h1>{{title}}</h1>
          <div class="span">
              <span>{{content}}</span>
          </div>
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

.wrapper {
  width: 276px;
}

span, h1 {
    color: var(--white);
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
    flex-direction: column;
}
.content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: left;
    flex-direction: column;
    margin-bottom: 150px;
}
.content h1 {
    margin: 0;
    padding: 0;
    margin-bottom: 27px;
}
h1{
    font-size: 20px;
    font-weight: bold;
}
.span {
    margin-left: 70px;
}
</style>