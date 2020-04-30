<template>
  <v-detail
    v-if="event"
    :image="event.image"
  >
    <template slot="title">{{event.title}}</template>
    <template>
      <youtube
        v-if="event.video"
        :video-id="detectYTID(event.video)"
        class="mb-8"
      ></youtube>
      <a
        :href="event.link"
        target="_blank"
        class="font-semibold"
        v-if="event.link"
      >
        <unicon
          name="link"
          class="h-4"
        /> {{ event.link }}
      </a>
      <p class="mt-8">{{ event.description }}</p>
      <p
        v-if="!!event.tags"
        class="mt-6 font-light"
      >#
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
        <v-button class="w-full">Upravit</v-button>
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
        <div
          class="flex mb-6"
          v-if="event.place"
        >
          <unicon
            name="map-marker"
            class="mr-8 text-gray-500"
          /><a
            class="text-blue-700"
            :href="getPlaceLink(event.place)"
            target="_blank"
          >{{event.place}}</a>
        </div>
        <div class="flex">
          <unicon
            name="calender"
            class="mr-8 text-gray-500"
          />
          <span>{{ $moment(event.date).format("llll") + (event.dateEnd !== null ? ` —  ${$moment(event.dateEnd).format("llll")}` : `` )}}</span>
        </div>
        <div
          class="flex mt-6"
          v-if="totalAttendence - 1 + (!!attendenceID ? 1 : 0 ) > 0"
        >
          <unicon
            name="users-alt"
            class="mr-8 text-gray-500"
          />
          <span>{{ totalAttendence - 1 + (!!attendenceID ? 1 : 0 ) }}</span>
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

const getEvent = /* GraphQL */ `
  query getEvent($id: ID!, $userID: ID) {
    getEvent(id: $id) {
      id
      title
      description
      place
      image
      date
      dateEnd
      video
      link
      tags
      host {
        items {
          organization {
            id
            name
            creatorID
            admins(userID: { eq: $userID }) {
              items {
                userID
              }
            }
          }
        }
      }
      attendence(userID: { eq: $userID }) {
        items {
          id
        }
      }
      speaking {
        items {
          speaker {
            id
            name
          }
        }
      }
    }
  }
`;

const countAttendence = /* GraphQL */ `
  query attendence($id: ID!) {
    searchAttendences(filter: { eventID: { eq: $id } }) {
      total
    }
  }
`;

const createAttendence = /* GraphQL */ `
  mutation mutateAttendence($eventID: ID!, $userID: ID!) {
    createAttendence(input: { eventID: $eventID, userID: $userID }) {
      id
    }
  }
`;

const deleteAttendence = /* GraphQL */ `
  mutation deleteAttendence($id: ID!) {
    deleteAttendence(input: { id: $id }) {
      id
    }
  }
`;

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

    const totalAttendence = await API.graphql(
      graphqlOperation(countAttendence, {
        id: eventId
      })
    );

    let canEdit = false;

    data.getEvent.host.items.filter(function({ organization }) {
      if (organization.creatorID === userID) {
        canEdit = true;
      }

      organization.admins.items.filter(admin => {
        if (admin.userID === userID) {
          canEdit = true;
        }
      });
    });

    return {
      eventId,
      canEdit,
      totalAttendence: totalAttendence.data.searchAttendences.total,
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
    validURL(str) {
      const pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return !!pattern.test(str);
    },
    detectYTID(id) {
      let video_id = id.split("v=")[1];
      let ampersandPosition = video_id.indexOf("&");
      if (ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
      }

      return video_id;
    },
    getPlaceLink(place) {
      if (this.validURL(place)) {
        return place;
      }
      return `https://www.openstreetmap.org/search?query=${place}`;
    },
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
