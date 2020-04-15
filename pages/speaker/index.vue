<template>
  <div class="flex flex-col">
    <div class="flex justify-between items-baseline">
      <h1>Přednášející</h1>
      <nuxt-link
        to="settings#speaker"
        class="ml-auto"
      >
        <v-button>
          Chci být taky speaker
          <unicon
            name="user-plus"
            class="ml-3"
          />
        </v-button>
        <v-button>
          Správa mého speakerského účtu
          <unicon
            name="sliders-v-alt"
            class="ml-3"
          />
        </v-button>
      </nuxt-link>
    </div>
    <amplify-connect
      :query="ListTodosQuery"
      class="mt-8"
    >
      <template slot-scope="{loading, data, errors}">
        <div v-if="loading">Načítám...</div>
        <div v-if="errors.length > 0">
          Chyba, to mě mrzí.
        </div>
        <div v-else-if="data.listSpeakers">
          <div class="flex flex-wrap -mx-4">
            <div
              v-for="item in data.listSpeakers.items"
              :key="item.id"
              class="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
            >
              <nuxt-link :to="`speaker/${item.id}`">
                <VCard>{{ item.name }}</VCard>
              </nuxt-link>
            </div>
          </div>
        </div>
      </template>
    </amplify-connect>
  </div>
</template>

<script>
import { mapState } from "vuex";

import VButton from "@/components/atoms/Button";
import VCard from "@/components/molecules/Card";

const ListEvents = `query ListSpeakers {
  listSpeakers{
    items {
      id
      name
    }
  }
}
`;

export default {
  components: {
    VButton,
    VCard
  },
  computed: {
    ListTodosQuery() {
      return this.$Amplify.graphqlOperation(ListEvents);
    },

    ...mapState(["user"])
  }
};
</script>
