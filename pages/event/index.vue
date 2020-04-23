<template>
  <div>
    <div class="flex justify-between items-baseline">
      <h1>Přednášky</h1>
      <div class="flex">
        <v-input v-model="searchTitle" />
        <v-geosearch @select="e => this.searchLocation = e" />
        <datetime
          type="datetime"
          v-model="searchDate"
        />
        <v-button @click.native="search">Hledej</v-button>
      </div>
    </div>
    <div class="mt-8">
      <div v-if="data">
        <div class="flex flex-wrap -mx-4">
          <div
            v-for="item in data.items"
            :key="item.id"
            class="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
          >
            <v-event-card :event="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";
import { mapState } from "vuex";

import VButton from "@/components/atoms/Button";
import VEventCard from "@/components/organisms/EventCard";
import VInput from "@/components/atoms/Input";
import VGeosearch from "@/components/molecules/Geosearch";

import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";

const listEvents = /* GraphQL */ `
  query ListEvents {
    listEvents {
      items {
        id
        title
        image
        date
        speaking {
          items {
            speaker {
              name
            }
          }
        }
      }
      nextToken
    }
  }
`;

const searchEvents = /* GraphQL */ `
  query SearchEvents(
    $filter: SearchableEventFilterInput
    $sort: SearchableEventSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchEvents(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        image
        date
        speaking {
          items {
            speaker {
              name
            }
          }
        }
      }
      nextToken
    }
  }
`;

export default {
  async asyncData({ store }) {
    if (!store.state.events.isSet) {
      try {
        const { data } = await API.graphql(graphqlOperation(listEvents));

        store.commit("setEvents", data.listEvents);
      } catch (error) {
        this.$toast.error("Nějaká chyba při načítání akcí…");
        console.error(error);
      }
    }

    return {
      data: store.state.events
    };
  },
  components: { VButton, VGeosearch, VEventCard, VInput, Datetime },
  data() {
    return {
      data: null,
      searchTitle: "",
      searchDate: "",
      searchTags: "",
      searchLocation: ""
    };
  },
  computed: {
    ...mapState(["user", "userActivities"])
  },
  methods: {
    async search() {
      let filter = {
        title: { wildcard: `${this.searchTitle}*` },
        date: { gt: this.searchDate || null },
        place: { wildcard: `${this.searchLocation}*` }
      };

      if (this.searchTags.length > 0) {
        filter = { ...filter, tags: { match: this.searchTags } };
      }

      const query = "Jak";
      const response = await API.graphql(
        graphqlOperation(searchEvents, {
          filter: filter
        })
      );
      this.data = response.data.searchEvents;
    }
  }
};
</script>
