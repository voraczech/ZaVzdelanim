<template>
  <amplify-connect :query="ListTodosQuery">
    <template slot-scope="{loading, mutate, data, errors}">
      <div v-if="loading">Načítám...</div>
      <div v-if="errors > 0">
        <div class="flex mt-8">
          Chyba, to mě mrzí.
        </div>
      </div>
      <v-detail v-else-if="data.getSpeaker">
        <template slot="title">{{ data.getSpeaker.name }}</template>
        <template>{{ data.getSpeaker.bio }}</template>
      </v-detail>
    </template>
  </amplify-connect>
</template>

<script>
import VCard from "@/components/molecules/Card";
import VDetail from "@/components/templates/Detail";

import { mapState } from "vuex";
import { getSpeaker } from "../../src/graphql/queries";

export default {
  components: { VDetail, VCard },

  async asyncData({ params }) {
    const speakerId = params.speaker;

    return { speakerId };
  },

  computed: {
    ListTodosQuery() {
      return this.$Amplify.graphqlOperation(getSpeaker, { id: this.speakerId });
    },

    ...mapState(["user"])
  }
};
</script>
