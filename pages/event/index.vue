<template>
  <div>
    <div class="flex justify-between items-baseline">
      <h1>Přednášky</h1>
    </div>
    <amplify-connect
      :query="ListTodosQuery"
      class="mt-8"
    >
      <template slot-scope="{loading, data, errors}">
        <div v-if="loading">Načítám...</div>
        <div v-if="errors.length > 0">
          Chyba, to mě mrzí.
        </div>
        <div v-else-if="data.listEvents">
          <div class="flex flex-wrap -mx-4">
            <div
              v-for="item in data.listEvents.items"
              :key="item.id"
              class="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
            >
              <nuxt-link :to="`event/${item.id}`">
                <VCard>
                  {{ item.title }}
                  {{ item.date }}
                  {{ item.speaking.items.length !== 0 ? item.speaking.items : `` }}
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

const ListEvents = `query ListEvents {
  listEvents{
    items {
      id
      title
      date
      speaking{
        items {
          speaker{
            name
          }
        }
      }
    }
  }
}
`;

export default {
  components: {
    VCard
  },
  computed: {
    ListTodosQuery() {
      return this.$Amplify.graphqlOperation(ListEvents);
    }
  }
};
</script>
