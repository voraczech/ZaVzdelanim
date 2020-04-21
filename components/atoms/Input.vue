<template>
  <input
    ref="input"
    :type="type"
    :value="value"
    class="px-4 py-3 bg-white border-b-2 border-gray-400 rounded transition duration-75 focus:border-blue-500 hover:shadow"
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
