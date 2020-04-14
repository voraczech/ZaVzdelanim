<template>
  <nuxt-link
    :is="is"
    :to="to"
    :a="a"
    :_target="is === `a` ? `blank` : ``"
    class="text-blue-700"
  >
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    a: {
      type: String
    },
    to: {
      type: String
    }
  },
  computed: {
    is() {
      return !!this.a ? `a` : `nuxt-link`;
    }
  }
};
</script>
