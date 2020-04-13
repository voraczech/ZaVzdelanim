<template>
  <amplify-connect :query="ListTodosQuery">
    <template slot-scope="{loading, data, errors}">
      <div v-if="loading">Načítám...</div>
      <div v-if="errors > 0">
        <div class="flex mt-8">
          Chyba, to mě mrzí.
        </div>
      </div>
      <div v-else-if="data.getEvent">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold bg-white shadow rounded-lg px-5 py-4">{{ data.getEvent.title }}</h1>
          <button
            class="rounded px-4 py-2 shadow-sm hover:shadow-lg transition-shadow duration-200"
            :class="!!data.getEvent.attendence.items ? `bg-purple-100 text-purple-800` : `bg-purple-800 text-purple-100`"
          >{{ !!data.getEvent.attendence.items ? `Zúčastnit se` : `Účastním se` }}</button>
        </div>
        <img
          src=""
          alt=""
        />
        <div class="bg-white shadow rounded-lg px-5 py-4 w-1/2 my-5">{{ data.getEvent.description }}</div>
        <div class="bg-white shadow rounded-lg px-5 py-4">
          Pořádá <span
            v-for="(host, key) in data.getEvent.host.items"
            :key="key"
          >{{host.organization.name}}
          </span>
        </div>

        <h2 class="text-2xl font-bold bg-white shadow rounded-lg px-5 py-4 mt-8">Podobné události</h2>
        <div class="flex flex-wrap -mx-4">
          <div
            v-for="n in 8"
            :key="n"
            class="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
          >
            <nuxt-link to="event/1">
              <VCard />
            </nuxt-link>
          </div>
        </div>
      </div>
    </template>
  </amplify-connect>
</template>

<script>
import { mapState } from "vuex";

import VCard from "@/components/molecules/Card";

import { components } from "aws-amplify-vue";
const ListEvents = `query getEvent($id: ID!, $userID: ID) {
  getEvent(id: $id){
      id
      title
      description
      host {
        items{
          organization{
            name
          }
        }
      }
      attendence(userID: {eq: $userID}){
			  items{ id }
      }
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
      return this.$Amplify.graphqlOperation(ListEvents, {
        id: this.eventId,
        userID: this.userID
      });
    },
    ...mapState(["user"])
  }
};
</script>
