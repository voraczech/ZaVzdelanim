<template>
  <v-detail v-if="event">
    <template slot="title">{{event.title}}</template>
    <template>
      <img
        src=""
        alt=""
      />
      <p>{{ event.description }}</p>
      <p v-if="!!event.tags">#
        <span
          v-for="(tag, key) in JSON.parse(event.tags)"
          :key="key"
        >{{tag}}{{JSON.parse(event.tags).length === key+1 ? `` : `, `}}</span>
      </p>
    </template>
    <template slot="aboveBox">
      <nuxt-link
        :to="`${$route.fullPath}/edit`"
        v-if="canEdit"
      >
        <v-button class="mb-4 w-full">Upravit</v-button>
      </nuxt-link>
    </template>
    <template slot="box">
      <div class="flex flex-col fill-current text-gray-700 mb-8">
        <div
          class="flex mb-6"
          v-if="event.speaking.items.length"
        >
          <unicon
            name="podium"
            class="mr-8 text-gray-500"
          />
          <div>
            <v-link
              v-for="(speaking, key) in event.speaking.items"
              :key="key"
              :to="`/speaker/${speaking.speaker.id}`"
            >{{ (!!event.speaking.items[key+1]) ? `${speaking.speaker.name}, ` : `${speaking.speaker.name}` }}
            </v-link>
          </div>
        </div>
        <div class="flex mb-6">
          <unicon
            name="building"
            class="mr-8 text-gray-500"
          />
          <div>
            <v-link
              v-for="(host, key) in event.host.items"
              :key="key"
              :to="`/organization/${host.organization.id}`"
            >{{ (!!event.host.items[key+1]) ? `${host.organization.name},` : `${host.organization.name}` }}
            </v-link>
          </div>
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
          />
          <span>{{ $moment(event.date).format("llll") + (event.dateEnd !== null ? `—  ${$moment(event.dateEnd).format("llll")}` : `` )}}</span>
        </div>
      </div>
      <v-button
        v-if="attendenceID"
        class="w-full text-lg"
        design="ctaActivated"
        @click.native="attend(attendenceID)"
      >
        <unicon
          name="check-circle"
          icon-style="monochrome"
          class="mr-2"
        />Účastním se</v-button>
      <v-button
        v-else
        design="cta"
        class="w-full text-lg"
        @click.native="attend()"
      >
        <unicon
          name="check-circle"
          icon-style="monochrome"
          class="mr-2"
        />Zúčastnit se</v-button>
    </template>

    <template slot="event"></template>

    <template slot="eventsTitle">Podobné události</template>
  </v-detail>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";

import { mapState } from "vuex";

import VButton from "@/components/atoms/Button";
import VLink from "@/components/atoms/Link";
import VDetail from "@/components/templates/Detail";

const getEvent = `query getEvent($id: ID!, $userID: ID) {
  getEvent(id: $id){
      id
      title
      description
      place
      image
      date
      dateEnd
      tags
      host {
        items {
          organization{
            id
            name
            creatorID
            admins(userID: {eq: $userID}){
              items {
                id
              }
            }
          }
        }
      }
      attendence(userID: {eq: $userID}){
			  items { id }
      }
      speaking{
        items {
          speaker{
            id
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
  components: { VButton, VLink, VDetail },

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
