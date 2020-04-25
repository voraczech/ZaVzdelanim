<template>
  <nuxt-link
    :to="to"
    class="text-blue-700"
  >
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String
    }
  }
};
</script>
