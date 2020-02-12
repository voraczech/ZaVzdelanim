<template>
  <div class="container">
    <div v-if="!signedIn">
      <amplify-authenticator v-bind:authConfig="authConfig"></amplify-authenticator>
      <amplify-authenticator />
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
  name: "Home",
  data() {
    return {
      signedIn: false,
      authConfig: {
        usernameAttributes: "My user nameaaa",
        signUpConfig: {
          header: "My Customized Sign Up",
          hideAllDefaults: true,
          defaultCountryCode: "1",
          signUpFields: [
            {
              label: "Uživatelské jméno",
              key: "username",
              required: true,
              displayOrder: 1,
              type: "string"
            },
            {
              label: "Password",
              key: "password",
              required: true,
              displayOrder: 2,
              type: "password"
            }
          ]
        }
      }
    };
  },
  methods: {
    async findUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        this.signedIn = true;
        console.log(user, "ahoj");
      } catch (err) {
        this.signedIn = false;
        console.log("nic");
      }
    }
  },
  created() {
    this.findUser();
    console.log(this.$Amplify);
    AmplifyEventBus.$on("authState", info => {
      console.log("info", info);
      if (info === "signedIn") {
        this.findUser();
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
