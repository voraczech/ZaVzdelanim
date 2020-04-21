<template>
  <button
    class="tracking-wide font-semibold fill-current inline-flex items-center justify-center transition-all duration-75"
    :class="[
    (design === `default`) && `text-blue-600 hover:text-blue-800`,
    (design === `alert`) && `text-red-600 hover:text-red-800`
    ]"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    design: {
      type: String,
      default: "default"
    }
  }
};
</script>
