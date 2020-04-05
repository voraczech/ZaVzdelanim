<template>
  <div class="shadow-md bg-white">
    <header class="flex justify-between items-center bg-purple-800 px-16 py-5 text-purple-100">
      <nuxt-link to="/">ZaVzděláním</nuxt-link>
      <div
        v-if="user"
        class="flex flex-col items-center"
      >
        <img
          :src="user.picture"
          :alt="user.name"
          class="w-10 rounded-full"
        >
        <div>{{ user.name }}</div>
        <button @click="signout()">Odhlásit se</button>
      </div>
      <nuxt-link
        v-else
        to="/signin"
      >
        <button class="bg-orange-600 rounded-full py-3 px-5 uppercase tracking-wide text-sm font-semibold">Přihlásit
          se</button>
      </nuxt-link>
    </header>
    <nav class="px-16 py-5">
      <nuxt-link to="/event">Přednášky</nuxt-link>
      <nuxt-link to="/speaker">Přednášející</nuxt-link>
      <nuxt-link to="/organization">Organizace</nuxt-link>
      <nuxt-link to="/settings">Nastavení</nuxt-link>
    </nav>
  </div>
</template>

<script>
import Auth from "@aws-amplify/auth";

import { mapState } from "vuex";

export default {
  computed: mapState(["user"]),
  methods: {
    signout() {
      Auth.signOut();
      this.$store.commit("setUser", null);
    }
  }
};
</script>
