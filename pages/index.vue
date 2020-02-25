<template>
  <div>
    <div class="flex flex-wrap -mx-4">
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
import { Auth } from "aws-amplify";
import { AmplifyEventBus } from "aws-amplify-vue";
export default {
  data() {
    return {
      signedIn: false
    };
  },
  components: { VCard },
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
