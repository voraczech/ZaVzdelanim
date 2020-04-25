<template>
  <v-card :to="`${to}`">
    <div class="flex items-center h-12">
      <v-image
        v-if="!!photo"
        :path="photo"
        class="w-16 mr-3 rounded max-h-full w-auto"
      />
      <h3 class="font-medium">{{name}}</h3>
    </div>
  </v-card>
</template>

<script>
import VCard from "@/components/atoms/Card";
import VImage from "@/components/atoms/Image";

export default {
  components: { VCard, VImage },
  props: {
    to: {
      type: String,
      default: ""
    },
    photo: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    }
  }
};
</script>
