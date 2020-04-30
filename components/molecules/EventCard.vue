<template>
  <v-card
    :to="`/event/${event.id}`"
    v-if="event"
    class="h-full"
  >
    <div class="-mx-4 -mt-4 mb-4 relative pb-2/3">
      <v-image
        v-if="!!event.image"
        :path="event.image"
        class="absolute rounded-b-none h-full w-full object-cover"
      />
      <div
        v-else
        class="absolute h-full w-full bg-blue-200 text-blue-800 h-48 p-6 flex items-center justify-center text-lg"
      ><span class="truncate">{{ event.title }}</span>
      </div>
    </div>
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
