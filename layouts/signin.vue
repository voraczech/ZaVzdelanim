<template>
  <div class="bg-purple-400 h-screen w-screen">
    <div class="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
      <div
        class="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-white sm:mx-0"
        style="height: 500px"
      >
        <div class="flex flex-col w-full md:w-1/2 p-4">
          <div class="flex flex-col flex-1 justify-center mb-8">
            <h1 class="text-4xl text-center font-thin">Vítej! 👋</h1>
            <div class="w-full mt-4">
              <div class="text-center mt-4 flex flex-col justify-center items-center">
                <v-button
                  @click.native="signIn({provider: 'Facebook'})"
                  type="submit"
                  class="mb-6"
                >
                  Facebook login
                </v-button>
                <v-button
                  @click.native="signIn({provider: 'Google'})"
                  type="submit"
                >
                  Google login
                </v-button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="hidden md:block md:w-1/2 rounded-r-lg"
          style="background: url('https://images.unsplash.com/photo-1515965885361-f1e0095517ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80'); background-size: cover; background-position: center center;"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "@aws-amplify/auth";

import VButton from "@/components/atoms/Button";

export default {
  components: { VButton },
  methods: {
    signIn(option) {
      return Auth.federatedSignIn(option);
    }
  },
  middleware: "signin"
};
</script>
