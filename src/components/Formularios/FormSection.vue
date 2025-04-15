<template>
  <fieldset class="form-section">
    <legend>{{ title }}</legend>
    <slot></slot>
  </fieldset>
</template>

<script>
export default {
  props: ['title']
};
</script>

<style scoped>
.form-section {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}

.form-section legend {
  padding: 0 10px;
  font-weight: bold;
  color: #333;
}
</style>