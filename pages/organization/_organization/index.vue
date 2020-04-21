<template>
  <amplify-connect :query="ListTodosQuery">
    <template slot-scope="{loading, data, errors}">
      <div v-if="loading">Načítám...</div>
      <div v-if="errors > 0">
        <div class="flex mt-8">
          Chyba, to mě mrzí.
        </div>
      </div>
      <div
        v-else-if="data.getOrganization"
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
                <h1 class="text-2xl font-bold">{{data.getOrganization.name}}</h1>
                <p
                  class="mt-8"
                  v-if="data.getOrganization.description"
                >{{ data.getOrganization.description }}</p>
              </div>
            </div>
          </div>
          <div class="w-1/3 px-2">
            <nuxt-link
              :to="`/organization/${data.getOrganization.id}/new-event`"
              v-if="isOwner(data.getOrganization.owner)"
            >
              <v-button class="mb-4 w-full">Přidat událost
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
          </div>
        </div>
        <h2 class="text-xl font-semibold mt-8">Události</h2>
        <div
          class="flex flex-wrap -mx-4"
          v-if="data.getOrganization.host.items.length > 0"
        >
          <div
            v-for="({event}, key) in data.getOrganization.host.items"
            :key="key"
            class="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
          >
            <nuxt-link
              :to="`event/${event.id}`"
              v-if="event !== null"
            >
              <VCard>
                {{ event.title }}
                {{ event.date }}
                {{ event.speaking.items.length !== 0 ? event.speaking.items : `` }}
              </VCard>
            </nuxt-link>
          </div>
        </div>
      </div>
    </template>
  </amplify-connect>
</template>

<script>
import { mapState } from "vuex";

import VButton from "@/components/atoms/Button";
import VCard from "@/components/molecules/Card";

const getOrg = `
query getOrganization($id: ID!) {
  getOrganization(id: $id){
    id
    name
    owner
    admins{items{userID}}
    host{
      items{
        event{
          id
          title
          date
          speaking {
            items {
              speaker{
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
  components: { VButton, VCard },

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
