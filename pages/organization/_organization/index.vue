<template>
  <v-detail
    v-if="organization"
    class="px-2"
    :events="organization.host.items"
  >
    <template slot="title">
      <div class="flex items-center">
        <v-image
          class="w-24 mr-8"
          v-if="organization.logo"
          :path="organization.logo"
        />
        <span>
          {{ organization.name }}
        </span>
      </div>
    </template>
    <template>
      <p>{{ organization.description }}</p>
      <p
        v-if="!!organization.tags"
        class="mt-6 font-light"
      >#
        <span
          v-for="(tag, key) in JSON.parse(organization.tags)"
          :key="key"
        >{{tag}}{{JSON.parse(organization.tags).length === key+1 ? `` : `, `}}</span>
      </p>
    </template>
    <template slot="aboveBox">
      <nuxt-link
        :to="`/organization/${organization.id}/new-event`"
        v-if="canEdit"
      >
        <v-button
          class="mb-4 w-full"
          design="cta"
        >Přidat událost
          <unicon
            name="plus"
            class="ml-3"
          />
        </v-button>
      </nuxt-link>
      <nuxt-link
        :to="`/organization/${organization.id}/edit`"
        v-if="canEdit"
      >
        <v-button class="mb-4 w-full">Upravit</v-button>
      </nuxt-link>
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
    <template
      slot="box"
      v-if="organization.links"
    >
      <p
        v-for="(link, key) in JSON.parse(organization.links)"
        :key="key"
        class="mt-2"
      >
        <a
          :href="link.url"
          class="font-medium"
        >{{link.url}}</a>
      </p>
    </template>
  </v-detail>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";
import { mapState } from "vuex";

import VButton from "@/components/atoms/Button";
import VImage from "@/components/atoms/Image";
import VDetail from "@/components/templates/Detail";
import {
  deleteOrgFollower,
  createOrgFollower
} from "../../../src/graphql/mutations";

const getOrg = /* GraphQL */ `
  query getOrganization($id: ID!, $userID: ID!) {
    getOrganization(id: $id) {
      id
      name
      logo
      links
      tags
      creatorID
      description
      admins {
        items {
          userID
        }
      }
      followers(userID: { eq: $userID }) {
        items {
          id
        }
      }
      host {
        items {
          event {
            id
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
    const orgId = params.organization;

    const userID = store.state.user.sub;

    const { data } = await API.graphql(
      graphqlOperation(getOrg, {
        id: orgId,
        userID: userID
      })
    );

    let canEdit = false;

    if (userID === data.getOrganization.creatorID) {
      canEdit = true;
    } else {
      data.getOrganization.admins.items.forEach(admin => {
        if (userID === admin.userID) {
          canEdit = true;
        }
      });
    }

    return {
      canEdit,
      orgId,
      organization: data.getOrganization,
      followingID:
        data.getOrganization.followers.items.length === 1
          ? data.getOrganization.followers.items[0].id
          : null
    };
  },
  head() {
    return {
      title: this.organization.name
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    async follow(id = null) {
      if (!!id) {
        const { data } = await API.graphql(
          graphqlOperation(deleteOrgFollower, {
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
          graphqlOperation(createOrgFollower, {
            input: {
              organizationID: this.orgId,
              userID: this.user.sub
            }
          })
        );
        this.followingID = data.createOrgFollower.id;
      }

      this.$toast.success(`Zaznamenáno!`);
    }
  }
};
</script>
