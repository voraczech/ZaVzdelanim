<template>
  <div class="px-2">
    <div class="flex -mx-2">
      <div class="w-2/3 px-2">
        <div class="rounded shadow-sm bg-white">
          <div class="p-12">
            <h1 class="text-2xl font-bold mb-8">
              <slot name="title" />
            </h1>
            <slot />
          </div>
        </div>
      </div>
      <div
        class="w-1/3 px-2"
        v-if="!!$slots.box || !!$slots.aboveBox"
      >
        <slot
          name="aboveBox"
          v-if="!!$slots.aboveBox"
        />
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
          v-for="({event}, key) in events"
          :key="key"
          class="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
        >
          <v-event-card :event="event" />
        </div>
        <nuxt-link
          to="/event"
          class="ml-auto"
        >
          <v-text-button>Všechny události</v-text-button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import VTextButton from "@/components/atoms/TextButton";
import VEventCard from "@/components/molecules/EventCard";

export default {
  components: { VTextButton, VEventCard },
  props: {
    events: {
      type: [Array, Object],
      default: () => []
    }
  }
};
</script>
