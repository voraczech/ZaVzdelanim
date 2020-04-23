<template>
  <v-card
    :to="`/event/${event.id}`"
    v-if="event"
  >
    <v-image
      v-if="!!event.image"
      path="test/avatar.png"
    />
    <h3 class="font-bold text-sm">{{event.title}}</h3>
    <div class="text-gray-600 text-xs fill-current leading-6">
      <div
        class="mt-3 inline-flex"
        v-if="event.date"
      >
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
import VImage from "@/components/atoms/Image";

export default {
  components: { VCard, VImage },
  props: {
    to: {
      type: String,
      default: ""
    },
    event: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
