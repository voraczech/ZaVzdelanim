<template>
  <div>
    <div class="flex flex-col md:flex-row md:items-end">
      <div class="searchItem mb-4 md:mb-0 md:mr-4">
        <label
          for="title"
          class="label"
        >Název</label>
        <v-input
          v-model="searchTitle"
          id="title"
        />
      </div>
      <div class="searchItem mb-4 md:mb-0 md:mr-4">
        <label
          for="place"
          class="label"
        >Místo</label>
        <v-geosearch
          @select="e => this.searchLocation = e"
          id="place"
        />
      </div>
      <div class="searchItem mb-4 md:mb-0 md:mr-4">
        <label
          for="date"
          class="label"
        >Od data</label>
        <datetime
          id="date"
          type="datetime"
          input-class="w-full"
          v-model="searchDate"
        />
      </div>
      <div class="searchItem mb-4 md:mb-0 md:mr-4">
        <label
          for="tags"
          class="label"
        >Tagy</label>
        <multiselect
          id="tags"
          v-model="searchTags"
          :options="tagsOptions"
          :multiple="true"
          :taggable="true"
          @tag="e => this.searchTags.push(e)"
          tag-placeholder="Přidej nový tag"
          placeholder="Vyber si tagy"
          select-label="Stiskni k vybrání"
          selected-label="Vybráno"
          deselect-label="Stiskni k odebrání"
        />
      </div>
      <v-button @click.native="search">Hledej</v-button>
    </div>
    <div class="mt-8">
      <div v-if="data">
        <div class="flex flex-wrap -mx-4 ">
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
import VEventCard from "@/components/molecules/EventCard";
import VInput from "@/components/atoms/Input";
import VGeosearch from "@/components/molecules/Geosearch";

import Multiselect from "vue-multiselect";

import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";

const lates = /* GraphQL */ `
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
      let date = new Date().toISOString();
      const filter = { date: { gt: date } };
      const sort = { field: "date", direction: "asc" };
      try {
        const { data } = await API.graphql(
          graphqlOperation(searchEvents, {
            filter: filter,
            sort: sort,
            limit: 12
          })
        );

        store.commit("setEvents", data.searchEvents);
      } catch (error) {
        console.error(error);
      }
    }

    return {
      data: store.state.events
    };
  },
  components: {
    VButton,
    VGeosearch,
    VEventCard,
    VInput,
    Datetime,
    Multiselect
  },
  data() {
    return {
      data: null,
      searchTitle: "",
      searchDate: "",
      searchTags: [],
      searchLocation: "",
      tagsOptions: [
        "Marketing",
        "IT Development",
        "Business",
        "Osobní rozvoj",
        "Inspirace",
        "Design"
      ]
    };
  },
  computed: {
    ...mapState(["user", "userActivities"])
  },
  methods: {
    async search() {
      let filter = {};
      const sort = { field: "date", direction: "asc" };

      if (this.searchTitle.length > 0) {
        filter = { ...filter, title: { wildcard: `${this.searchTitle}*` } };
      }

      if (this.searchLocation.length > 0) {
        filter = { ...filter, place: { wildcard: `${this.searchLocation}*` } };
      }

      if (this.searchDate.length > 0) {
        filter = { ...filter, date: { gt: this.searchDate || null } };
      }

      if (this.searchTags.length > 0) {
        filter = { ...filter, tags: { match: this.searchTags } };
      }

      const response = await API.graphql(
        graphqlOperation(searchEvents, {
          filter: filter,
          sort: sort,
          limit: 12
        })
      );
      this.data = response.data.searchEvents;
    }
  }
};
</script>

<style scoped>
.label {
  @apply text-sm tracking-wide font-medium mb-2;
}

.searchItem {
  @apply flex flex-col flex-1;
}
</style>
