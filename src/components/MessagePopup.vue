<template>
  <div class="message-popup" :style="{'border': '3px solid ' + color, 'box-shadow': '0px 3px 18px ' + color}">
      <div class="wrapper">
          <span>{{message}}</span>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true,
        }
    }
}
</script>

<style scoped>
.message-popup {
  background: var(--primary);
  transform: translateY(11px);
  position: absolute;
  width: 269px;
  height: 75px;
  border-radius: 8px;
}
span {
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  text-align: start;
}
.wrapper {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}
</style>