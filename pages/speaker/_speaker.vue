<template>
  <amplify-connect :query="ListTodosQuery">
    <template slot-scope="{loading, mutate, data, errors}">
      <div v-if="loading">Načítám...</div>
      <div v-if="errors > 0">
        <div class="flex mt-8">
          Chyba, to mě mrzí.
        </div>
      </div>
      <v-detail
        v-else-if="data.getSpeaker"
        :events="data.getSpeaker.speaking.items"
      >
        <template slot="title">
          <div class="flex items-center">
            <v-image
              class="w-24 mr-8"
              v-if="data.getSpeaker.avatar"
              :path="data.getSpeaker.avatar"
            />
            <span>
              {{ data.getSpeaker.name }}
            </span>
          </div>
        </template>
        <template>{{ data.getSpeaker.bio }}</template>
      </v-detail>
    </template>
  </amplify-connect>
</template>

<script>
import VImage from "@/components/atoms/Image";
import VDetail from "@/components/templates/Detail";

import { mapState } from "vuex";

const getSpeaker = `
query getSpeaker($id: ID!){
  getSpeaker(id: $id){
    name
    bio
    avatar
    speaking{
      items{
        event{
          title
          date
          image
          speaking{
            items{
              speaker{
                name
              }
            }
          }
        }
      }
    }
  }
}
`;

export default {
  components: { VImage, VDetail },

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
