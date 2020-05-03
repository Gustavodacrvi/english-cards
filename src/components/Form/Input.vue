<template>
    <div class="form-control">
        <input :type="type" class="inp" :placeholder="placeholder" />
    </div>
</template>

<script>
export default {
    props: {
        placeholder: {
            type: String,
            required: false
        },
        type: {
            type: String,
            default: 'text'
        }
    }
}
</script>

<style scoped>
.form-control {
    margin: 5px;
}
.inp {
    background: var(--primary);
    border: 3px solid var(--white);
    border-radius: 6px;
    width: 264px;
    height: 45px;
    padding-left: 19px;
    color: var(--white);
    text-align: left;
    font: 18px bold 'Open Sans';
}
::placeholder {
    color: var(--white);
    text-align: left;
    font-family: 'Open Sans';
    font-weight: bold;
    font-size: 18px;
    opacity: 0.56;
}
</style>
