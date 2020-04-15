<template>
  <div>
    <nuxt-link
      to="organization/create"
    >
    <v-button>
    Vytvořit
      <unicon name="plus" />
    </v-button>
    </nuxt-link>
    <amplify-connect :query="ListTodosQuery">
      <template slot-scope="{loading, data, errors}">
        <div v-if="loading">Načítám...</div>
        <div v-if="errors.length > 0">
          Chyba, to mě mrzí.
        </div>
        <div v-else-if="data.listOrganizations">
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
import VButton from "@/components/atoms/Button";
import VCard from "@/components/molecules/Card";

const ListOrg = `query ListOrganization {
  listOrganizations {
    items {
      id
      name
    }
  }
}
`;

export default {
  components: {
    VButton,
    VCard
  },
  computed: {
    ListTodosQuery() {
      return this.$Amplify.graphqlOperation(ListOrg);
    }
  }
};
</script>

