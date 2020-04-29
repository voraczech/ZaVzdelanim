<template>
  <div class="grid gap-10">
    <section v-if="(userActivities.admin.items.length > 0) || (userActivities.creator.items.length > 0)">
      <h2>Moje organizace</h2>
      <div class="flex flex-wrap -mx-4">
        <div
          v-for="item in [].concat(userActivities.creator.items, userActivities.admin.items)"
          :key="item.id"
          class="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
        >
          <VCard :to="`organization/${item.id}`">{{ item.name }}</VCard>
        </div>
      </div>
    </section>
    <section v-if="userActivities.speaker">
      <h2>Moje nejbližší účasti jako přednášející</h2>
      <div
        class="flex flex-wrap -mx-4"
        v-if="userActivities.speaker.speaking && userActivities.speaker.speaking.items.length > 0"
      >
        <div
          v-for="{event} in userActivities.speaker.speaking.items"
          :key="event.id"
          class="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
        >
          <v-event-card :event="event" />
        </div>
      </div>
      <div v-else>Vypadá to, že nikde nepřednášíš 🤷‍♂️</div>
    </section>
    <section v-if="userActivities.attendence.items.length > 0">
      <h2>Moje nejbližší účasti jako návštěvník</h2>
      <div class="flex flex-wrap -mx-4">
        <div
          v-for="{event} in userActivities.attendence.items"
          :key="event.id"
          class="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
        >
          <v-event-card :event="event" />
        </div>
      </div>
    </section>
    <section v-if="userActivities.followSpeaker.items.length > 0">
      <h2 class="mb-8">Poslední aktivita sledovaných přednášejících</h2>
      <div
        v-for="{speaker} in userActivities.followSpeaker.items"
        :key="speaker.id"
        class="mb-6"
      >
        <nuxt-link :to="`/speaker/${speaker.id}`">
          <h3 class="font-medium">{{ speaker.name }}</h3>
        </nuxt-link>
        <div
          class="flex flex-wrap -mx-4"
          v-if="speaker.speaking.items.length > 0"
        >
          <div
            v-for="{event} in speaker.speaking.items"
            :key="event.id"
            class="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
          >
            <v-event-card :event="event" />
          </div>
        </div>
      </div>
    </section>
    <section v-if="userActivities.followOrganization.items.length > 0">
      <h2 class="mb-8">Poslední aktivita sledovaných organizací</h2>
      <div
        v-for="{organization} in userActivities.followOrganization.items"
        :key="organization.id"
        class="mb-6"
      >
        <nuxt-link :to="`/organization/${organization.id}`">
          <h3 class="font-medium">{{ organization.name }}</h3>
        </nuxt-link>
        <div
          class="flex flex-wrap -mx-4"
          v-if="organization.host.items.length > 0"
        >
          <div
            v-for="{event} in organization.host.items"
            :key="event.id"
            class="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
          >
            <v-event-card :event="event" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import VCard from "@/components/atoms/Card";
import VEventCard from "@/components/molecules/EventCard";
import { mapState } from "vuex";

export default {
  components: { VCard, VEventCard },
  computed: {
    ...mapState(["user", "userActivities"])
  }
};
</script>
