<template>
  <div
    v-if="event"
    class="px-2"
  >
    <div class="flex -mx-2">
      <div class="w-2/3 px-2">
        <div class="rounded shadow-sm bg-white">
          <img
            src=""
            alt=""
          />
          <div class="p-12">
            <h1 class="text-2xl font-bold mb-8">{{event.title}}</h1>
            <p>{{ event.description }}</p>
          </div>
        </div>
      </div>
      <div class="w-1/3 px-2">
        <v-button class="mb-4 w-full">
          Upravit
        </v-button>
        <div class="rounded p-8 shadow-sm bg-white sticky top-4">
          <div class="flex flex-col fill-current text-gray-700 mb-8">
            <div
              class="flex mb-6"
              v-if="event.speaking.items.length"
            >
              <unicon
                name="podium"
                class="mr-8 text-gray-500"
              />
              <v-link
                v-for="(speaker, key) in event.speaking.items"
                :key="key"
                :to="`/organization/${host.organization.id}`"
              >{{ (!!event.speaker.items[key+1]) ? `${host.speaker.name}, ` : `${host.speaker.name}` }}
              </v-link>
            </div>
            <div class="flex mb-6">
              <unicon
                name="building"
                class="mr-8 text-gray-500"
              />
              <v-link
                v-for="(host, key) in event.host.items"
                :key="key"
                :to="`/organization/${host.organization.id}`"
              >{{ (!!event.host.items[key+1]) ? `${host.organization.name}, ` : `${host.organization.name}` }}
              </v-link>
            </div>
            <div class="flex mb-6">
              <unicon
                name="map-marker"
                class="mr-8 text-gray-500"
              /><span>Speaker!</span>
            </div>
            <div class="flex">
              <unicon
                name="calender"
                class="mr-8 text-gray-500"
              /><span>Speaker!</span>
            </div>
          </div>
          <v-button
            v-if="attendenceID"
            class="w-full text-lg bg-purple-800 text-purple-100"
            @click.native="attend(attendenceID)"
          >
            <unicon
              name="check-circle"
              icon-style="monochrome"
              class="mr-2"
            />Účastním se</v-button>
          <v-button
            v-else
            class="w-full text-lg bg-purple-200 text-purple-800"
            @click.native="attend()"
          >
            <unicon
              name="check-circle"
              icon-style="monochrome"
              class="mr-2"
            />Zúčastnit se</v-button>
        </div>
      </div>
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

<script>
import { Auth, API, graphqlOperation } from "aws-amplify";

import { mapState } from "vuex";

import VButton from "@/components/atoms/Button";
import VCard from "@/components/molecules/Card";
import VLink from "@/components/atoms/Link";

import { components } from "aws-amplify-vue";
import { mutations } from "../../store";
const getEvent = `query getEvent($id: ID!, $userID: ID) {
  getEvent(id: $id){
      id
      title
      description
      host {
        items{
          organization{
            id
            name
          }
        }
      }
      attendence(userID: {eq: $userID}){
			  items{ id }
      }
      speaking{
        items{
          speaker{
            name
          }
        }
      }
    }
  }
`;

const createAttendence = `mutation mutateAttendence($eventID: ID!, $userID: ID!){
  createAttendence(input: { eventID: $eventID, userID: $userID }){
    id
  }
}
`;

const deleteAttendence = `mutation deleteAttendence($id: ID!){
  deleteAttendence(input: {id: $id}){
    id
  }
}`;

export default {
  components: { VButton, VCard, VLink, ...components },

  async asyncData({ params }) {
    const eventId = params.event;

    const user = await Auth.currentAuthenticatedUser();

    const { data } = await API.graphql(
      graphqlOperation(getEvent, {
        id: eventId,
        userID: user.attributes.sub
      })
    );

    return {
      eventId,
      event: data.getEvent,
      attendenceID:
        data.getEvent.attendence.items.length === 1
          ? data.getEvent.attendence.items[0].id
          : null
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    async attend(id = null) {
      if (!!id) {
        const { data } = await API.graphql(
          graphqlOperation(deleteAttendence, {
            id: id
          })
        );
        this.attendenceID = null;
      } else {
        const { data } = await API.graphql(
          graphqlOperation(createAttendence, {
            eventID: this.eventId,
            userID: this.user.sub
          })
        );
        this.attendenceID = data.createAttendence.id;
      }

      this.$toast.success(`Beru v potaz`);
    }
  }
};
</script>
