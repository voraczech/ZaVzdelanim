<template>
  <div>
    <div class="flex flex-wrap -mx-4">
      <div>kkkk
        <button @click="click({provider: 'Facebook'})">Open Facebook</button>
        <button @click="click({provider: 'Google'})">Open Google</button>
        <button @click="click()">Open Hosted UI</button>
        <button @click="Auth.signOut()">Sign Out</button>
      </div>
      <div
        v-for="n in 8"
        :key="n"
        class="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
      >
        <a href="info">
          <VCard />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import VCard from "@/components/molecules/Card";
import { AmplifyEventBus } from "aws-amplify-vue";

import Amplify, { Auth, Hub } from "aws-amplify";

export default {
  data() {
    return {
      signedIn: false,
      user: null,
      customState: null
    };
  },
  components: { VCard },
  methods: {
    click(option) {
      return Auth.federatedSignIn(option);
    },
    async findUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        this.signedIn = true;
        console.log(user);
      } catch (err) {
        this.signedIn = false;
      }
    }
  },
  created() {
    this.findUser();
    AmplifyEventBus.$on("authState", info => {
      if (info === "signedIn") {
        //  this.findUser();
      } else {
        this.signedIn = false;
      }
    });
  }
};
</script>
