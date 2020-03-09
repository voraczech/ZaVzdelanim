<template>
  <div class="shadow-md bg-white">
    <header class="flex justify-between items-baseline bg-purple-800 px-16 py-5 text-purple-100">
      <nuxt-link to="/">ZaVzděláním</nuxt-link>
      <nuxt-link to="/signin">
        <button class="bg-orange-600 rounded-full py-3 px-5 uppercase tracking-wide text-sm font-semibold">Přihlásit
          se</button>
      </nuxt-link>
    </header>
    <nav class="px-16 py-5">
      <nuxt-link to="/">Přednášky</nuxt-link>
      <nuxt-link to="/">Přednášející</nuxt-link>
      <nuxt-link to="/">Organizace</nuxt-link>
    </nav>
  </div>
</template>
