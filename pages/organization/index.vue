<template>
  <div class="flex flex-col">
    <div class="flex justify-between items-baseline">
      <h1>Organizace</h1>
      <nuxt-link to="organization/create">
        <v-button>
          Vytvořit organizaci
          <unicon
            name="plus"
            class="ml-3"
          />
        </v-button>
      </nuxt-link>
    </div>

    <div class="flex flex-col md:flex-row md:items-end max-w-2xl">
      <div class="searchItem mb-4 md:mb-0 md:mr-4">
        <label
          for="title"
          class="searchItem__label"
        >Název</label>
        <v-input
          v-model="searchTitle"
          id="title"
        />
      </div>
      <div class="searchItem mb-4 md:mb-0 md:mr-4">
        <label
          for="tags"
          class="searchItem__label"
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
            <v-photo-text-card
              :to="`/organization/${item.id}`"
              :name="item.name"
              :photo="item.logo"
            />
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
import VInput from "@/components/atoms/Input";
import VPhotoTextCard from "@/components/molecules/PhotoTextCard";
import Multiselect from "vue-multiselect";

import { searchOrganizations } from "../../src/graphql/queries";

export default {
  async asyncData({ store }) {
    if (!store.state.organizations.isSet) {
      const filter = {};
      const sort = { field: "name", direction: "asc" };
      try {
        const { data } = await API.graphql(
          graphqlOperation(searchOrganizations, {
            sort: sort,
            limit: 100
          })
        );

        store.commit("setOrganizations", data.searchOrganizations);
      } catch (error) {
        console.error(error);
      }
    }

    return {
      data: store.state.organizations
    };
  },
  components: {
    VButton,
    VInput,
    VPhotoTextCard,
    Multiselect
  },
  data() {
    return {
      data: null,
      searchTitle: "",
      searchTags: [],
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
  methods: {
    async search() {
      let filter = {};
      const sort = { field: "name", direction: "asc" };

      if (this.searchTitle.length > 0) {
        filter = { ...filter, name: { wildcard: `${this.searchTitle}*` } };
      }

      if (this.searchTags.length > 0) {
        filter = { ...filter, tags: { match: this.searchTags } };
      }

      const response = await API.graphql(
        graphqlOperation(searchOrganizations, {
          filter: filter,
          sort: sort,
          limit: 24
        })
      );
      this.data = response.data.searchOrganizations;
    }
  }
};
</script>

