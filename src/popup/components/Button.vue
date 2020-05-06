<template>
    <div class="form-control">
      <button :style="{'background': color.back, 'color': color.text, 'border': border ? '3px solid ' + color : 'none'}" class="btn">{{text}}</button>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            required: true
        },
        color: {
            type: Object,
            required: true
        },
        border: {
          type: Boolean,
          default: false
        }
    }
}
</script>

<style scoped>
.btn {
    height: 45px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin-top: 11px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 8px;
    outline: none;
    border: 3px solid var(--white);
    cursor: pointer;
}
</style>