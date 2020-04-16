<template>
  <div>
    <nuxt-link to="/organization/create">Vytvořit Organizaci</nuxt-link>
    <amplify-connect :query="GetMyOrgs">
      <template slot-scope="{loading, data, errors}">
        <div v-if="loading">Načítám...</div>
        <div v-if="errors.length > 0">Nenačetly se tvoje organizace</div>
        <div v-else-if="data.listOrganizations && data.listOrganizations.items.length > 0">
          <h2>Moje organizace</h2>
          <div class="flex flex-wrap -mx-4">
            <div
              v-for="item in data.listOrganizations.items"
              :key="item.id"
              class="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
            >
              <nuxt-link :to="`organization/${item.id}`">
                <VCard>{{ item.name }}</VCard>
              </nuxt-link>
            </div>
          </div>
        </div>
      </template>
    </amplify-connect>
    <amplify-connect :query="GetMyOrgs">
      <template slot-scope="{loading, data, errors}">
        <div v-if="loading">Načítám...</div>
        <div v-if="errors.length > 0">Nenačetly se tvoje organizace</div>
        <div v-else-if="data.listOrganizations && data.listOrganizations.items.length > 0">
          <h2>Moje účasti</h2>
          <div class="flex flex-wrap -mx-4">
            <div
              v-for="item in data.listOrganizations.items"
              :key="item.id"
              class="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
            >
              <nuxt-link :to="`organization/${item.id}`">
                <VCard>
                  <template slot="title">{{ item.name }}</template>
                </VCard>
              </nuxt-link>
            </div>
          </div>
        </div>
      </template>
    </amplify-connect>
  </div>
</template>

<script>
import VCard from "@/components/molecules/Card";
import { mapState } from "vuex";

import { Auth, Hub } from "aws-amplify";

const GetMyOrgs = `query ListOrganization($creatorID: ID!) {
  listOrganizations(filter: {creatorID: {eq: $creatorID}}){
    items {
      id
      name
      owner
    }
  }
}
`;

export default {
  components: { VCard },
  computed: {
    ...mapState(["user"]),
    GetMyOrgs() {
      return this.$Amplify.graphqlOperation(GetMyOrgs, {
        creatorID: this.user.sub
      });
    }
  }
};
</script>
