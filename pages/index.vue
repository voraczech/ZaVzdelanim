<template>
  <div class="container">
    <div v-if="!signedIn">kkk
      <button
        @click="click"
        class="bg-purple-400 text-purple-800 py-2 px-3 rounded-lg shadow-md text-xl"
      >hola</button>
    </div>
    <div v-else>
      <amplify-sign-out />
    </div>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
import { AmplifyEventBus } from "aws-amplify-vue";
export default {
  data() {
    return {
      signedIn: false
    };
  },
  methods: {
    click() {
      return Auth.federatedSignIn({ provider: "Facebook" });
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

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.logo {
  margin-bottom: 30px;
  max-width: 400px;
}
</style>
