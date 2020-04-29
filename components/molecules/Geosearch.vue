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
    @tag="onTag"
    @select="$emit('select', $event)"
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
    },
    onTag(e) {
      this.value = e;
      this.$emit("select", e);
    }
  }
};
</script>
