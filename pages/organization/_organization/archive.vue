<template>
  <div>
    <p>Po potvrzení už není cesty zpět, odeberou se všichni správci, včetně tebe, fotka i popis organizace. Archivuje se název organice a události, které (spolu)pořádala.</p>
    <v-button>Potvrzuji, archivovat {{  }}.</v-button>
  </div>
</template>

<script>
import VButton from "@/components/atoms/Button";

export default {
  asyncData({ router }){

  },

  components: { VButton }
};
</script>
