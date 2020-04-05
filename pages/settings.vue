<template>
  <div>
    Chci být zařazen mezi speakery
  </div>
</template>


<script>
import VCard from "@/components/molecules/Card";

import { components } from "aws-amplify-vue";
const ListEvents = `query getEvent($id: ID!) {
  getEvent(id: $id){
      id
      title
  }
}
`;

export default {
  components: { VCard, ...components },

  async asyncData({ params }) {
    const eventId = params.event;

    return { eventId };
  },

  computed: {
    ListTodosQuery() {
      return this.$Amplify.graphqlOperation(ListEvents, { id: this.eventId });
    }
  }
};
</script>
