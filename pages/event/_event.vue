<template>
  <div class="mx-10 my-8">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold bg-white shadow rounded-lg px-5 py-4">Název akce</h1>
      <div class="rounded">
        <button class="bg-purple-100 text-purple-800 rounded-l px-4 py-2">Zúčastním se</button><button
          class="bg-purple-800 text-purple-100 rounded-r px-4 py-2"
        >Nezúčastním se</button>
      </div>
    </div>
    <div class="flex mt-8">
      <img
        src=""
        alt=""
      />
      <div class="bg-white shadow rounded-lg px-5 py-4 w-1/2">Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Possimus ipsa quia expedita? Voluptatem assumenda
        iusto consectetur amet ex obcaecati laboriosam ratione debitis, nihil maiores repudiandae quos dolorem quia
        laudantium voluptatum.</div>
    </div>
    <div class="bg-white shadow rounded-lg px-5 py-4">Klub investorů
    </div>
    <div class="flex flex-wrap -mx-4">
      <div
        v-for="n in 8"
        :key="n"
        class="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
      >
        <nuxt-link to="event/1">
          <VCard />
        </nuxt-link>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import VCard from "@/components/molecules/Card";

export default {
  components: { VCard }
};
</script>
