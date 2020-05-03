<template>
    <form class="form">
        <slot></slot>
    </form>
</template>

<script>
export default {}
</script>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
