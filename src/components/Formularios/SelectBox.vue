<template>
  <div>
    <label>{{ label }}</label>
    <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
      <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: ['modelValue', 'options', 'label']
};
</script>
