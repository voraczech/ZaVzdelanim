<template>
  <button
    class="bg-white tracking-wide text-gray-800 font-bold fill-current rounded border-b-2 shadow-md py-2 px-6 inline-flex items-center justify-center transition-all duration-75"
    :class="[
    (type === `default`) && `border-blue-500 hover:bg-blue-500 hover:text-blue-100 hover:border-blue-600`,
    (type === `cta`) && `border-purple-500 bg-purple-200 text-purple-800 hover:bg-purple-800 hover:text-purple-200 hover:border-purple-500`,
    (type === `ctaActivated`) && `border-purple-500 bg-purple-800 text-purple-200 hover:bg-purple-200 hover:text-purple-800 hover:border-purple-500`,
    (type === `alert`) && `border-red-500 bg-red-200 text-red-800 hover:bg-red-800 hover:text-red-200 hover:border-red-500`,
    ]"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "default"
    }
  }
};
</script>
