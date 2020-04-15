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
        <nuxt-link
          :to="`${$route.fullPath}/edit`"
          v-if="canEdit"
        >
          <v-button class="mb-4 w-full">Upravit</v-button>
        </nuxt-link>
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
                :to="`/speaker/${speaker.id}`"
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
              /><span>{{event.place}}</span>
            </div>
            <div class="flex">
              <unicon
                name="calender"
                class="mr-8 text-gray-500"
              /><span>{{event.date}}</span>
            </div>
          </div>
          <v-button
            v-if="attendenceID"
            class="w-full text-lg"
            type="ctaActivated"
            @click.native="attend(attendenceID)"
          >
            <unicon
              name="check-circle"
              icon-style="monochrome"
              class="mr-2"
            />Účastním se</v-button>
          <v-button
            v-else
            type="cta"
            class="w-full text-lg"
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

    <h2 class="text-xl font-semibold mt-8">Podobné události</h2>
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
import { API, graphqlOperation } from "aws-amplify";

import { mapState } from "vuex";

import VButton from "@/components/atoms/Button";
import VCard from "@/components/molecules/Card";
import VLink from "@/components/atoms/Link";

const getEvent = `query getEvent($id: ID!, $userID: ID) {
  getEvent(id: $id){
      id
      title
      description
      place
      date
      host {
        items{
          organization{
            id
            name
            creatorID
            admins(userID: {eq: $userID}){
              items{
                id
              }
            }
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
  components: { VButton, VCard, VLink },

  async asyncData({ params, store }) {
    const eventId = params.event;

    const userID = store.state.user.sub;

    const { data } = await API.graphql(
      graphqlOperation(getEvent, {
        id: eventId,
        userID: userID
      })
    );

    let canEdit = false;

    data.getEvent.host.items.filter(function({ organization }) {
      if (organization.creatorID === userID) {
        canEdit = true;
        return;
      }

      organization.admins.items.filter(function({ admin }) {
        if (admin.id === userID) {
          canEdit = true;
          return;
        }
      });
    });

    return {
      eventId,
      canEdit,
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

        if (data) {
          this.attendenceID = null;
        }
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
