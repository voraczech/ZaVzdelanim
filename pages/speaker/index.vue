<template>
  <div class="flex flex-col">
    <div class="flex justify-between items-baseline">
      <h1>Přednášející</h1>
      <nuxt-link
        to="settings#speaker"
        class="ml-auto"
      >
        <v-text-button v-if="!userActivities.speaker.id">
          Chci být taky speaker
          <unicon
            name="user-plus"
            class="ml-3"
          />
        </v-text-button>
        <v-text-button v-else>
          Správa mého účtu přednášejícího
          <unicon
            name="sliders-v-alt"
            class="ml-3"
          />
        </v-text-button>
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
                <VCard>
                  <div class="flex">
                    <amplify-s3-image
                      v-if="item.avatar !== null"
                      :imagePath="item.avatar"
                      class="flex"
                    />
                    <span>
                      {{ item.name }}
                    </span>
                  </div>
                </VCard>
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

import VTextButton from "@/components/atoms/TextButton";
import VCard from "@/components/molecules/Card";

const ListEvents = `query ListSpeakers {
  listSpeakers(limit:25){
    items {
      id
      name
      avatar
    }
  }
}
`;

export default {
  components: {
    VTextButton,
    VCard
  },
  computed: {
    ListTodosQuery() {
      return this.$Amplify.graphqlOperation(ListEvents);
    },

    ...mapState(["user", "userActivities"])
  }
};
</script>
