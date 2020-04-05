<template>
  <div v-if="signedIn">
    <div>
      <nuxt-link to="/organization/create">Vytvořit Organizaci</nuxt-link>
    </div>
  </div>
</template>

<script>
import VCard from "@/components/molecules/Card";

import { Auth, Hub } from "aws-amplify";

export default {
  data() {
    return {
      signedIn: true,
      user: null,
      customState: null
    };
  },
  components: { VCard }
};
</script>
