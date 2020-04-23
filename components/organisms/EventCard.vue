<template>
  <v-card>
      <img
        src="/icons/user.png"
        class="w-full"
      />
      <h3 class="font-bold text-sm">
        <slot name="title" />
      </h3>
      <div class="text-gray-600 text-xs">
        <div class="mt-3 flex">
          <div class="px-1 mr-3 flex items-center justify-center">
            <img
              src="/icons/date.png"
              alt=""
              width="16"
              height="16"
            />
          </div>
          <span>4. 5. 2019 18:30, Praha</span>
        </div>
        <div class="mt-3 flex">
          <div class="mr-3 rounded-full bg-gray-300 p-1 w-6 h-6 flex items-center justify-center">
            <img
              src="/icons/user.png"
              alt=""
              height="16"
              width="16"
            />
          </div>
          <span>Pavlína Louženská</span>
        </div>
      </div>
  </v-card>
</template>

<script>
import VCard from "@/components/molecules/Card";

export default {
  components: { VCard }
};
</script>
