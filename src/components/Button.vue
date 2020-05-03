<template>
    <div class="form-control">
      <button @click.prevent="method" :style="{'width': width+'px', 'background': color.back, 'color':color.text}" class="btn">{{text}}</button>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            required: true
        },
        width: {
            type: Number,
            default: 286
        },
        color: {
            type: Object,
            required: true
        },
        method: {
            type: Function
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
    border-radius: 8px;
    margin: 5px;
    outline: none;
    border: 3px solid var(--white);
    cursor: pointer;
}
</style>