<template>
  <div class="shadow-md bg-white">
    <header class="flex justify-between items-center bg-blue-800 px-4 md:px-16 py-5 text-blue-100 h-16">
      <nuxt-link
        to="/"
        class="text-white text-2xl font-bold"
      >Za vzděláním!</nuxt-link>
      <nuxt-link
        v-if="user"
        to="/settings"
        class="flex items-center"
      >
        <span class="uppercase text-sm font-medium tracking-wide hidden md:inline-block">{{ firstName }}</span>
        <img
          :src="user.picture"
          :alt="user.name"
          class="w-10 rounded-full ml-5 shadow-inner"
        >
      </nuxt-link>
    </header>
    <nav class="px-4 md:px-16 py-5 flex overflow-x-auto">
      <nuxt-link
        to="/event"
        class="header__navLink"
      >
        <unicon
          name="presentation"
          class="mr-2"
        /> Přednášky</nuxt-link>
      <nuxt-link
        to="/speaker"
        class="header__navLink"
      >
        <unicon
          name="podium"
          class="mr-2"
        /> Přednášející</nuxt-link>
      <nuxt-link
        to="/organization"
        class="header__navLink"
      >
        <unicon
          name="building"
          class="mr-2"
        /> Organizace</nuxt-link>
      <nuxt-link
        to="/settings"
        class="header__navLink"
      >
        <unicon
          name="cog"
          class="mr-2"
        /> Nastavení</nuxt-link>
    </nav>
  </div>
</template>

<script>
import { mapState } from "vuex";

import VButton from "@/components/atoms/Button";

export default {
  components: { VButton },
  computed: {
    firstName() {
      if (Object.keys(this.user).length !== 0) {
        return this.user.name.split(" ")[0];
      }
    },
    ...mapState(["user"])
  }
};
</script>

<style scoped>
.header__navLink {
  @apply flex items-center text-gray-600 fill-current mr-10 transition-colors duration-200;
}

.header__navLink:hover {
  @apply text-gray-900;
}

.header__navLink.link--active {
  @apply text-gray-900;
}
</style>
