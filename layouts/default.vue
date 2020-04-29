<template>
  <div class="bg-gray-200 min-h-screen">
    <VHeader />
    <div class="px-4 md:px-16 py-12">
      <nuxt />
    </div>
  </div>
</template>

<script>
import VHeader from "@/components/organisms/Header";

export default {
  components: { VHeader },
  middleware: "authenticated"
};
</script>
