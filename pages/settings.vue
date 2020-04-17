<template>
  <div>
    <h2 class=" mb-6">Odhlášení</h2>
    <v-button @click.native="signout">
      Odhlásit se
      <unicon
        name="sad"
        class="ml-2"
      />
    </v-button>
    <h2
      id="speaker"
      class="mt-12 mb-6"
    >Speaker</h2>
    <v-button
      v-if="user.data.speaker === null"
      @click.native="createUserSpeaker()"
    >Chci být zařazen mezi speakery </v-button>
    <div v-else>
      <span>Jméno: {{ user.data.speaker.name }}</span>
      <span>Bio: {{ user.data.speaker.bio }}</span>
      <span>Foto: {{ user.data.speaker.avatar }}</span>
      <h3>Odstranění spojení speakera</h3>
      <v-button
        type="alert"
        @click.native="deleteUserSpeaker()"
      >Už nechci být speaker</v-button>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { mapState } from "vuex";

const uuid = uuidv4();

import Auth from "@aws-amplify/auth";
import { API, graphqlOperation } from "aws-amplify";

import VButton from "@/components/atoms/Button";

import { components } from "aws-amplify-vue";

const createUserSpeaker = `mutation createUserSpeaker($id: ID!, $userID: ID!, $name: String!){
  createSpeaker(input: { id: $id, name: $name}){
    id
    name
  }
  updateUser(input: {id: $userID, userSpeakerId: $id}){
    id
    speaker{
      id
    }
  }
}
`;

const deleteUserSpeaker = `mutation deleteUserSpeaker($id: ID!, $userID: ID!){
  deleteSpeaker(input: {id: $id}){
    id
  }
  updateUser(input: {id: $userID, userSpeakerId: null}){
    id
    speaker{
      id
    }
  }
}`;

export default {
  components: { VButton, ...components },

  data() {
    return {
      aaa: ""
    };
  },

  computed: {
    uuidv4() {
      return uuid;
    },
    ...mapState(["user"])
  },
  methods: {
    async createUserSpeaker() {
      const { data } = await API.graphql(
        graphqlOperation(createUserSpeaker, {
          id: this.uuidv4,
          userID: this.user.sub,
          name: this.user.name
        })
      );

      console.log(data);

      if (
        data.updateUser.speaker.id !== null &&
        this.$store.state.user.data.speaker !== data.updateUser.speaker
      ) {
        this.$store.dispatch("editUserSpeaker", "aaa");
      }
    },
    async deleteUserSpeaker() {
      const { data } = await API.graphql(
        graphqlOperation(deleteUserSpeaker, {
          id: this.user.data.speaker.id,
          userID: this.user.sub
        })
      );

      if (
        data.updateUser.speaker === null &&
        this.$store.state.user.data.speaker !== data.updateUser.speaker
      ) {
        this.$store.dispatch("editUserSpeaker", null);
      }
    },
    signout() {
      Auth.signOut();
      this.$store.commit("setUser", null);
    }
  }
};
</script>
