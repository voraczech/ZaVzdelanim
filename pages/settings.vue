<template>
  <div>
    <h2 class=" mb-6">Odhlášení</h2>
    <v-button @click.native="signout">
      Odhlásit se
      <unicon
        name="sad"
        class="ml-2"
      />
    </v-button>
    <h2
      id="speaker"
      class="mt-12 mb-6"
    >Speaker</h2>
    <v-button> Chci být zařazen mezi speakery</v-button>
  </div>
</template>

<script>
import Auth from "@aws-amplify/auth";

import VButton from "@/components/atoms/Button";

import { components } from "aws-amplify-vue";
const ListEvents = `query getEvent($id: ID!) {
  getEvent(id: $id){
      id
      title
  }
}
`;

export default {
  components: { VButton, ...components },

  async asyncData({ params }) {
    const eventId = params.event;

    return { eventId };
  },

  computed: {
    ListTodosQuery() {
      return this.$Amplify.graphqlOperation(ListEvents, { id: this.eventId });
    }
  },
  methods: {
    signout() {
      Auth.signOut();
      this.$store.commit("setUser", null);
    }
  }
};
</script>
