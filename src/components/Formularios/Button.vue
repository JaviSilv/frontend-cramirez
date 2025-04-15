<template>
  <button :type="type">{{ label }}</button>
</template>

<script>
export default {
  props: ['type', 'label']
};
</script>
