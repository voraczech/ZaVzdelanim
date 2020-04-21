<template>
  <input
    ref="input"
    :type="type"
    :value="value"
    @input="$emit('input', $event.target.value)"
  >
</template>

<script>
export default {
  props: {
    value: String,
    type: String
  }
};
</script>
