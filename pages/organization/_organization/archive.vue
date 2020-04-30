<template>
  <div class="max-w-xl">
    <p class="mb-2">Po potvrzení už není cesty zpět, odeberou se všichni správci, včetně tebe, fotka i popis organizace.
      Archivuje se
      název organice a události, které (spolu)pořádala.</p>
    <v-button
      design="alert"
      @click.native="del"
    >Potvrzuji, archivovat.</v-button>
  </div>
</template>

<script>
import { API, graphqlOperation, Storage } from "aws-amplify";
import VButton from "@/components/atoms/Button";

export default {
  asyncData({ router }) {},

  components: { VButton }
};
</script>
