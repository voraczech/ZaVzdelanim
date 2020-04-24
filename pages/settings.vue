<template>
  <div>
    <h2 class=" mb-6">Odhlášení</h2>
    <v-button
      @click.native="signout"
      class="mb-6"
    >
      Odhlásit se
      <unicon
        name="sad"
        class="ml-2"
      />
    </v-button>
    <h2
      id="speaker"
      class="pt-6 mb-6"
    >Přednášející</h2>
    <v-button
      v-if="!!!userActivities.speaker"
      @click.native="createUserSpeaker()"
    >Chci být zařazen mezi přednášející </v-button>
    <div v-else>
      <amplify-photo-picker :photoPickerConfig="photoPickerConfig" />
      <amplify-s3-image :imagePath="userActivities.speaker.avatar" />
      <vue-form-generator
        :schema="schema"
        :model="model"
        :options="formOptions"
      />
      <v-button
        design="alert"
        @click.native="deleteUserSpeaker()"
      >Už nechci být přednášející</v-button>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { mapState } from "vuex";

import Vue from "vue";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";
Vue.use(VueFormGenerator);

import Auth from "@aws-amplify/auth";
import { API, graphqlOperation } from "aws-amplify";
import { AmplifyEventBus } from "aws-amplify-vue";

import VButton from "@/components/atoms/Button";

const createUserSpeaker = `mutation createUserSpeaker($id: ID!, $userID: ID!, $name: String!){
  createSpeaker(input: { id: $id, name: $name}){
    id
    name
  }
  updateUser(input: {id: $userID, userSpeakerId: $id}){
    id
    speaker{
      id
      name
      bio
    }
  }
}
`;

const updateImage = `mutation editImage($id: ID!, $avatar: String){
  updateSpeaker(input: {id: $id, avatar: $avatar}){
    id
    avatar
  }
}
`;

const editSpeakerText = `mutation editText($id: ID!, $name: String!, $bio: String){
  updateSpeaker(input: {id: $id, name: $name, bio: $bio}){
    id
    name
    bio
  }
}`;

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
  components: { VButton },
  created() {
    AmplifyEventBus.$on("fileUpload", img => {
      this.$toast.info("Úspěšně nahráno, ukládám… 💾");
      this.uploadImage(img);
    });
  },
  computed: {
    uuidv4() {
      return uuidv4();
    },
    ...mapState(["user", "userActivities"])
  },
  data() {
    return {
      photoPickerConfig: {
        header: "Nová profilová fotka přednášejícího",
        title: "Nahrát",
        path: `upload/speaker/`
      },
      model: {
        name:
          (this.$store.state.userActivities.speaker &&
            this.$store.state.userActivities.speaker.name) ||
          null,
        bio:
          (this.$store.state.userActivities.speaker &&
            this.$store.state.userActivities.speaker.bio) ||
          null
      },
      schema: {
        fields: [
          {
            type: "input",
            inputType: "text",
            label: "Jméno přednášejícího",
            model: "name",
            required: true,
            featured: true
          },
          {
            type: "textArea",
            label: "Bio",
            placeholder: "Informace o mně, co dělám, čím se živím…",
            model: "bio"
          },
          {
            type: "submit",
            inputType: "submit",
            validateBeforeSubmit: true,
            onSubmit: this.handleSubmit
          }
        ]
      },
      formOptions: {
        validateAfterLoad: false
      }
    };
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

      if (
        data.updateUser.speaker.id !== null &&
        this.$store.state.userActivities.speaker !== data.updateUser.speaker
      ) {
        this.$store.commit("setUserActivity", {
          speaker: data.updateUser.speaker
        });
        this.$toast.success("Vítej v klubu přednášejících! 👨‍🏫👩‍🏫");
      }
    },
    async deleteUserSpeaker() {
      const { data } = await API.graphql(
        graphqlOperation(deleteUserSpeaker, {
          id: this.userActivities.speaker.id,
          userID: this.user.sub
        })
      );

      if (
        data.updateUser.speaker === null &&
        this.$store.state.userActivities.speaker !== data.updateUser.speaker
      ) {
        this.$store.commit("setUserActivity", {
          speaker: data.updateUser.speaker
        });
        this.$toast.success("Tak snad zas někdy 👋");
      }
    },
    async handleSubmit() {
      const { name, bio } = this.model;

      const response = await API.graphql(
        graphqlOperation(editSpeakerText, {
          id: this.userActivities.speaker.id,
          name: name,
          bio: bio
        })
      );

      if (response) {
        this.$toast.success("Upraveno! 📑");
      }
    },
    async uploadImage(image) {
      this.$toast.info("Děláme na tom.");
      const editImage = await API.graphql(
        graphqlOperation(updateImage, {
          id: this.userActivities.speaker.id,
          avatar: image
        })
      );
      this.$toast.success("Nahráno! 👍");
    },
    signout() {
      Auth.signOut();
      this.$store.commit("deleteUser");
    }
  }
};
</script>
