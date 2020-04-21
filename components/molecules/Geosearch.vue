<template>
  <v-multiselect
    v-model="value"
    :options="results"
    @search-change="search"
    placeholder="Vyber si místo"
    select-label="Stiskni k vybrání"
    selected-label="Vybráno"
    deselect-label="Stiskni k odebrání"
    tag-placeholder="Přidej nové místo"
    :taggable="true"
    @tag="e => this.value = e"
    @select="$emit('select', $event.value)"
  >
    <template slot="noResult">Bohužel nic 😭 🚫🗺</template>
    <template slot="noOptions">Zadej nějaké místo a hledej 🔍</template>
  </v-multiselect>
</template>
<script>
import VMultiselect from "vue-multiselect";

import { OpenStreetMapProvider } from "leaflet-geosearch";
const provider = new OpenStreetMapProvider();

export default {
  data() {
    return {
      value: "",
      results: []
    };
  },
  components: { VMultiselect },
  methods: {
    async search(query) {
      const results = await provider.search({ query: query });
      this.results = results.map(item => item.label);
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
