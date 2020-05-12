<template>
  <div class="form-control">
      <input :type="type" class="inp" v-model="str" :placeholder="placeholder" />
  </div>
</template>

<script>
export default {
    data() {
        return {
          str: this.value || "",
        }
    },
    props: {
        placeholder: {
            type: String,
            required: false
        },
        type: {
            type: String,
            default: 'text'
        },
        value: {
            type: String,
            required: false
        }
    },
    watch: {
        value() {
          this.str = this.value
        },
        str() {
          this.$emit('input', this.str)
    },
  },
}
</script>

<style scoped>

.form-control {
  border: 3px solid var(--white);
    height: 45px;
    border-radius: 6px;
    margin-top: 11px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.inp {
    background: var(--primary);
    border: none;
    width: 100%;
    box-sizing: border-box;
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
    font-size: 16px;
    opacity: 0.56;
}

</style>
