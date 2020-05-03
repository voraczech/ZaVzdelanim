<template>
  <div class="md:px-2">
    <div class="flex flex-col-reverse md:flex-row md:-mx-2">
      <div class="mt-5 md:mt-0 md:w-2/3 md:px-2">
        <div class="rounded shadow-sm bg-white">
          <div
            v-if="image"
            class="relative pb-2/3"
          >
            <v-image
              :path="image"
              class="absolute rounded-b-none h-full w-full object-cover"
            />
          </div>
          <div class="p-12">
            <h1 class="text-2xl font-bold mb-8">
              <slot name="title" />
            </h1>
            <slot />
          </div>
        </div>
      </div>
      <div
        class="md:w-1/3 md:px-2"
        v-if="!!$slots.box || !!$slots.aboveBox"
      >
        <div
          class="mb-4"
          v-if="!!$slots.aboveBox"
        >
          <slot name="aboveBox" />
        </div>
        <div
          class="rounded p-8 shadow-sm bg-white sticky top-4"
          v-if="!!$slots.box"
        >
          <slot name="box" />
        </div>
      </div>
    </div>
    <div v-if="events.length > 0">
      <h2 class="text-xl font-semibold mt-8">
        <slot name="eventsTitle">Události</slot>
      </h2>
      <div class="flex flex-wrap -mx-4">
        <div
          v-for="({event}, key) in orderedEvents"
          :key="key"
          class="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
        >
          <v-event-card :event="event" />
        </div>
        <nuxt-link
          to="/event"
          class="ml-auto"
        >
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import VTextButton from "@/components/atoms/TextButton";
import VEventCard from "@/components/molecules/EventCard";
import VImage from "@/components/atoms/Image";

export default {
  components: { VTextButton, VEventCard, VImage },
  props: {
    events: {
      type: [Array, Object],
      default: () => []
    },
    image: {
      type: String,
      default: ""
    }
  },
  computed: {
    orderedEvents: function() {
      return _.orderBy(this.events, "event.date");
    }
  }
};
</script>
