<template>
  <v-card
    :to="`/event/${event.id}`"
    v-if="event"
  >
    <img
      :src="url"
      class="w-full"
    />
    <h3 class="font-bold text-sm">{{event.title}}</h3>
    <div class="text-gray-600 text-xs fill-current leading-6">
      <div class="mt-3 inline-flex">
        <unicon
          name="calender"
          class="mr-3"
        />
        <span>{{ $moment(event.date).format("llll") }}</span>
      </div>
      <div
        class="mt-3 flex"
        v-if="event.speaking.items.length > 0"
      >
        <unicon
          name="podium"
          class="mr-3"
        />
        <div>
          <span
            v-for="({speaker}, key) in event.speaking.items"
            :key="key"
          >{{ speaker.name + (event.speaking.items.length === key+1 ? `` : `, `)}}</span>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import VCard from "@/components/atoms/Card";

export default {
  components: { VCard },
  props: {
    to: {
      type: String,
      default: ""
    },
    event: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      url: null
    };
  },
  mounted() {
    this.getImage();
  },
  methods: {
    getImage() {
      if (this.event.image) {
        this.$Amplify.Storage.get(this.event.image, this.options)
          .then(url => {
            this.url = url;
          })
          .catch(e => this.setError(e));
      }
    }
  }
};
</script>
