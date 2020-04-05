<template>
  <amplify-connect :query="ListTodosQuery">
    <template slot-scope="{loading, mutate, data, errors}">
      <div v-if="loading">Načítám...</div>
      <div v-if="errors > 0">
        <div class="flex mt-8">
          Chyba, to mě mrzí.
        </div>
      </div>
      <div v-else-if="data.getSpeaker">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold bg-white shadow rounded-lg px-5 py-4">{{ data.getSpeaker.name }}</h1>
        </div>
        <img
          src=""
          alt=""
        />
       <h2 class="text-2xl font-bold bg-white shadow rounded-lg px-5 py-4 mt-8">Události</h2>
        <div class="flex flex-wrap -mx-4">
          <!-- <div
            v-for="n in 8"
            :key="n"
            class="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
          >
            <nuxt-link to="event/1">
              <VCard />
            </nuxt-link>
          </div> -->
        </div>
      </div>
    </template>
  </amplify-connect>
</template>

<script>
import VCard from "@/components/molecules/Card";

import { mapState } from "vuex";

import { components } from "aws-amplify-vue";
const getOrg = `query getOrganization($id: ID!) {
  getSpeaker(id: $id){
      id
      name
  }
}
`;

export default {
  components: { VCard, ...components },

  async asyncData({ params }) {
    const speakerId = params.speaker;

    return { speakerId };
  },

  data() {
    return {
      name: ""
    };
  },

  computed: {
    ListTodosQuery() {
      return this.$Amplify.graphqlOperation(getOrg, { id: this.speakerId });
    },

    ...mapState(["user"])
  },
};
</script>
