<template>
  <div>
    <div class="flex flex-wrap -mx-4">
      <div>kkkk
        <button @click="click({provider: 'Facebook'})">Open Facebook</button>
        <button @click="click({provider: 'Google'})">Open Google</button>
        <button @click="click()">Open Hosted UI</button>
        <button @click="signout()">Sign Out</button>
        <div v-if="signedIn">{{ user.attributes.sub }} <img
            :src="user.attributes.picture"
            alt=""
          > {{ user.attributes.name }}</div>
      </div>
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
</template>

<script>
import VCard from "@/components/molecules/Card";
import { AmplifyEventBus } from "aws-amplify-vue";

import { Auth, Hub } from "aws-amplify";

export default {
  data() {
    return {
      signedIn: false,
      user: null,
      customState: null
    };
  },
  mixins: ["auth"],
  components: { VCard },
  methods: {
    click(option) {
      return Auth.federatedSignIn(option);
    },
    async findUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        this.signedIn = true;
        this.user = user;
      } catch (err) {
        this.signedIn = false;
      }
    },
    signout() {
      Auth.signOut();
    }
  },
  mounted() {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      if (event === `signIn`) {
        this.findUser();
      }
    });
  },
  created() {
    this.findUser();
  }
};
</script>
