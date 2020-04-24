<template>
  <amplify-connect :query="ListTodosQuery">
    <template slot-scope="{loading, data, errors}">
      <div v-if="loading">Načítám...</div>
      <div v-if="errors > 0">
        <div class="flex mt-8">
          Chyba, to mě mrzí.
        </div>
      </div>
      <v-detail
        v-else-if="data.getOrganization"
        class="px-2"
        :events="data.getOrganization.host.items"
      >
        <template slot="title">
          <div class="flex items-center">
            <v-image
              class="w-24 mr-8"
              v-if="data.getOrganization.logo"
              :path="data.getOrganization.logo"
            />
            <span>
              {{ data.getOrganization.name }}
            </span>
          </div>
        </template>
        <template>{{ data.getOrganization.description }}</template>
        <template slot="aboveBox">
          <nuxt-link
            :to="`/organization/${data.getOrganization.id}/new-event`"
            v-if="isOwner(data.getOrganization.owner)"
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
            :to="`/organization/${data.getOrganization.id}/edit`"
            v-if="isOwner(data.getOrganization.owner)"
          >
            <v-button class="mb-4 w-full">Upravit</v-button>
          </nuxt-link>
        </template>
        <template
          slot="box"
          v-if="data.getOrganization.links"
        >{{data.getOrganization.links}}</template>
      </v-detail>
    </template>
  </amplify-connect>
</template>

<script>
import { mapState } from "vuex";

import VButton from "@/components/atoms/Button";
import VImage from "@/components/atoms/Image";
import VDetail from "@/components/templates/Detail";

const getOrg = /* GraphQL */ `
  query getOrganization($id: ID!) {
    getOrganization(id: $id) {
      id
      name
      owner
      admins {
        items {
          userID
        }
      }
      host {
        items {
          event {
            id
            title
            date
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

const editOrg = `mutation updateOrg{
  updateOrganization
}
`;

export default {
  components: { VButton, VImage, VDetail },

  async asyncData({ params }) {
    const orgId = params.organization;

    return { orgId };
  },

  data() {
    return {
      name: ""
    };
  },

  computed: {
    ListTodosQuery() {
      return this.$Amplify.graphqlOperation(getOrg, { id: this.orgId });
    },

    OrganizationMutation() {
      return this.$Amplify.graphqlOperation(editOrg, {
        id: this.orgId,
        name: this.name
      });
    },

    ...mapState(["user"])
  },
  methods: {
    isOwner(owner) {
      return (
        (`${JSON.parse(this.user.identities)[0].providerType}_` || ``) +
          JSON.parse(this.user.identities)[0].userId ===
        owner
      );
    }
  }
};
</script>
