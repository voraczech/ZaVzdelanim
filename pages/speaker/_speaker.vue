<template>
  <v-detail
    v-if="speaker"
    :events="speaker.speaking.items"
  >
    <template slot="title">
      <div class="flex items-center">
        <v-image
          class="w-24 mr-8"
          v-if="speaker.avatar"
          :path="speaker.avatar"
        />
        <span>
          {{ speaker.name }}
        </span>
      </div>
    </template>
    <template>
      <p>{{ speaker.bio }}</p>
      <div
        v-if="!!speaker.links"
        class="mt-8"
      >
        <h2>Odkazy</h2>
        <p
          v-for="(link, key) in JSON.parse(speaker.links)"
          :key="key"
          class="mt-2"
        >
          <a
            :href="link.url"
            class="font-medium"
          >{{link.url}}</a>
        </p>
      </div>
    </template>
    <template slot="aboveBox">

      <v-button
        v-if="followingID"
        class="w-full text-lg"
        design="ctaActivated"
        @click.native="follow(followingID)"
      >
        <unicon
          name="check-circle"
          icon-style="monochrome"
          class="mr-2"
        />Sleduji</v-button>
      <v-button
        v-else
        design="cta"
        class="w-full text-lg"
        @click.native="follow()"
      >
        <unicon
          name="check-circle"
          icon-style="monochrome"
          class="mr-2"
        />Sledovat</v-button>
    </template>
  </v-detail>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";

import VButton from "@/components/atoms/Button";
import VImage from "@/components/atoms/Image";
import VDetail from "@/components/templates/Detail";

import { mapState } from "vuex";
import {
  deleteSpeakerFollower,
  createSpeakerFollower
} from "../../src/graphql/mutations";

const getSpeaker = /* GraphQL */ `
  query getSpeaker($id: ID!, $userID: ID!) {
    getSpeaker(id: $id) {
      name
      bio
      avatar
      links
      followers(userID: { eq: $userID }) {
        items {
          id
        }
      }
      speaking {
        items {
          event {
            title
            date
            image
            speaking {
              items {
                speaker {
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
  components: { VButton, VImage, VDetail },

  async asyncData({ params, store }) {
    const speakerId = params.speaker;

    const userID = store.state.user.sub;

    const { data } = await API.graphql(
      graphqlOperation(getSpeaker, {
        id: speakerId,
        userID: userID
      })
    );

    return {
      speakerId,
      speaker: data.getSpeaker,
      followingID:
        data.getSpeaker.followers.items.length === 1
          ? data.getSpeaker.followers.items[0].id
          : null
    };

    return { speakerId };
  },

  computed: {
    ...mapState(["user"])
  },

  methods: {
    async follow(id = null) {
      if (!!id) {
        const { data } = await API.graphql(
          graphqlOperation(deleteSpeakerFollower, {
            input: {
              id: id
            }
          })
        );

        if (data) {
          this.followingID = null;
        }
      } else {
        const { data } = await API.graphql(
          graphqlOperation(createSpeakerFollower, {
            input: {
              speakerID: this.speakerId,
              userID: this.user.sub
            }
          })
        );
        this.followingID = data.createSpeakerFollower.id;
      }

      this.$toast.success(`Zaznamenáno!`);
    }
  }
};
</script>
