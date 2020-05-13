<template>
  <div class="flex flex-col">
    <div class="flex justify-between items-baseline">
      <h1>Přednášející</h1>
      <nuxt-link
        to="settings#speaker"
        class="ml-auto"
      >
        <v-text-button v-if="!userActivities.speaker">
          Chci být taky speaker
          <unicon
            name="user-plus"
            class="ml-3"
          />
        </v-text-button>
        <v-text-button v-else>
          Správa mého účtu přednášejícího
          <unicon
            name="sliders-v-alt"
            class="ml-3"
          />
        </v-text-button>
      </nuxt-link>
    </div>

    <div class="flex flex-col md:flex-row md:items-end max-w-2xl">
      <div class="searchItem mb-4 md:mb-0 md:mr-4">
        <label
          for="title"
          class="searchItem__label"
        >Jméno</label>
        <v-input
          v-model="searchTitle"
          id="title"
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
              :to="`/speaker/${item.id}`"
              :name="item.name"
              :photo="item.avatar"
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
import VTextButton from "@/components/atoms/TextButton";
import VInput from "@/components/atoms/Input";
import VPhotoTextCard from "@/components/molecules/PhotoTextCard";
import Multiselect from "vue-multiselect";

import { searchSpeakers, listSpeakers } from "../../src/graphql/queries";

export default {
  async asyncData({ store }) {
    if (!store.state.speakers.isSet) {
      const filter = {};
      try {
        const { data } = await API.graphql(
          graphqlOperation(searchSpeakers, {
            limit: 1000,
            sort: { field: "name", direction: "asc" }
          })
        );

        store.commit("setSpeakers", data.searchSpeakers);
      } catch (error) {
        console.error(error);
      }
    }

    return {
      data: store.state.speakers
    };
  },
  components: {
    VButton,
    VTextButton,
    VInput,
    VPhotoTextCard,
    Multiselect
  },
  data() {
    return {
      data: null,
      searchTitle: ""
    };
  },
  computed: {
    ...mapState(["userActivities"])
  },
  head() {
    return {
      title: `Přednášející`
    };
  },
  methods: {
    async search() {
      let filter = {};
      const sort = { field: "name", direction: "asc" };
      let data;

      if (this.searchTitle.length > 0) {
        filter = { ...filter, name: { wildcard: `${this.searchTitle}*` } };

        data = await API.graphql(
          graphqlOperation(searchSpeakers, {
            filter: filter,
            sort: sort,
            limit: 1000
          })
        );
      } else {
        data = await API.graphql(
          graphqlOperation(searchSpeakers, {
            sort: sort,
            limit: 1000
          })
        );
      }
      this.data = data.data.searchSpeakers;
    }
  }
};
</script>

