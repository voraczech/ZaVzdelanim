<template>
  <v-card :to="`${to}`">
    <div class="flex items-center">
      <v-image
        v-if="!!photo"
        path="test/avatar.png"
        class="w-16 mr-3 rounded"
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
