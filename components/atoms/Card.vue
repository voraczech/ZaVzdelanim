<template>
  <nuxt-link
    :to="to"
    class="bg-white rounded shadow-lg hover:shadow-xl flex flex-col overflow-hidden duration-200"
  >
    <div class="m-4">
      <slot />
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: ""
    }
  }
};
</script>
