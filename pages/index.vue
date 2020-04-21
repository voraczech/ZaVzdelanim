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
          <nuxt-link :to="`organization/${item.id}`">
            <VCard>{{ item.name }}</VCard>
          </nuxt-link>
        </div>
      </div>
    </section>
    <section v-if="userActivities.attendence.items.length > 0">
      <h2>Moje účasti jako přednášející</h2>
      <div class="flex flex-wrap -mx-4">
        <div
          v-for="{event} in userActivities.attendence.items"
          :key="event.id"
          class="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
        >
          <nuxt-link :to="`event/${event.id}`">
            <VCard>{{ event.title }}</VCard>
          </nuxt-link>
        </div>
      </div>
    </section>
    <section v-if="userActivities.attendence.items.length > 0">
      <h2>Moje účasti jako návštěvník</h2>
      <div class="flex flex-wrap -mx-4">
        <div
          v-for="{event} in userActivities.attendence.items"
          :key="event.id"
          class="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
        >
          <nuxt-link :to="`event/${event.id}`">
            <VCard>{{ event.title }}</VCard>
          </nuxt-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import VCard from "@/components/molecules/Card";
import { mapState } from "vuex";

import { Auth, Hub } from "aws-amplify";

export default {
  components: { VCard },
  computed: {
    ...mapState(["user", "userActivities"])
  }
};
</script>
