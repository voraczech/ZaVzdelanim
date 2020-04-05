<template>
  <amplify-connect :query="ListTodosQuery">
    <template slot-scope="{loading, data, errors}">
      <div v-if="loading">Načítám...</div>
      <div v-if="errors > 0">
        <div class="flex mt-8">
          Chyba, to mě mrzí.
        </div>
      </div>
      <div v-else-if="data.getOrganization">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold bg-white shadow rounded-lg px-5 py-4">{{ data.getOrganization.name }}</h1>
          <nuxt-link
            :to="`/organization/${data.getOrganization.id}/edit`"
            class="bg-white shadow rounded-lg px-5 py-4 w-1/2 my-15 w-6"
            v-if="isOwner(data.getOrganization.owner)"
          >
            Upravit
          </nuxt-link>
        </div>
        <img
          src=""
          alt=""
        />
        <div class="bg-white shadow rounded-lg px-5 py-4 w-1/2 my-5">{{ data.getOrganization.description }}</div>

        <h2 class="text-2xl font-bold bg-white shadow rounded-lg px-5 py-4 mt-8">Události</h2>
        <div class="flex flex-wrap -mx-4">
          <!-- <div
            v-for="n in 8"
            :key="n"
            class="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
          >
            <nuxt-link to="event/1">
              <VCard />
            </nuxt-link>
          </div> -->
        </div>
      </div>
    </template>
  </amplify-connect>
</template>

<script>
import VCard from "@/components/molecules/Card";

import { mapState } from "vuex";

import { components } from "aws-amplify-vue";
const getOrg = `query getOrganization($id: ID!) {
  getOrganization(id: $id){
      id
      name
      owner
  }
}
`;

const editOrg = `mutation updateOrg{
  updateOrganization
}
`;

export default {
  components: { VCard, ...components },

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
