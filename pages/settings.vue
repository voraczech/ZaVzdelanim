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
    <h2>Změna jména uživatele</h2>
    <p class="text-sm font-semibold text-gray-600 mb-6">Jméno je důležité pro snadnější správu administrátorů organizací
    </p>
    <form
      @submit.prevent="changeName"
      class="max-w-lg"
    >
      <div class="flex flex-col mb-6">
        <label
          for="username"
          class="font-bold mb-3"
        >Jméno*</label>
        <v-input
          type="text"
          id="username"
          v-model="username"
          placeholder="Jméno"
          required
        />
      </div>
      <v-button
        class="mb-6"
        type="submit"
      >Změnit</v-button>
    </form>
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
      <v-image
        v-if="userActivities.speaker.avatar"
        :path="userActivities.speaker.avatar"
        class="mb-6"
      />
      <form
        class="max-w-lg"
        @submit.prevent="handleSubmit"
      >
        <div class="flex flex-col mb-6">
          <label
            for="name"
            class="font-bold mb-3"
          >Jméno*</label>
          <v-input
            type="text"
            id="name"
            v-model="name"
            placeholder="Jméno"
            required
          />
          <div v-if="!$v.name.required && $v.name.$error">Název je nutný</div>
        </div>
        <div class="flex flex-col mb-6">
          <label
            for="bio"
            class="font-bold mb-3"
          >Bio</label>
          <textarea
            id="bio"
            cols="30"
            rows="10"
            placeholder="Informace o mně, co dělám, čím se živím…"
            v-model="bio"
          ></textarea>
        </div>
        <div class="flex flex-col mt-8">
          <div
            v-for="(v, key) in $v.links.$each.$iter"
            :key="key"
          >
            <v-input
              type="text"
              placeholder="URL adresa"
              class="mt-2"
              v-model.trim="v.url.$model"
            />
            <div
              class="error"
              v-if="!v.url.required && v.$error"
            >Zadej URL.</div>
            <div
              class="error"
              v-if="!v.url.url && v.$error"
            >Zadej platnou URL.</div>
          </div>
          <v-text-button
            @click.native.prevent="links.pop()"
            class="ml-auto mt-2"
            design="alert"
            v-if="links.length > 0"
          >Odebrat link
            <unicon
              name="minus-circle"
              class="ml-2"
            />
          </v-text-button>
          <v-text-button
            @click.native.prevent="links.push({ url: ``})"
            class="ml-auto mt-3"
          >Přidat link
            <unicon
              name="plus-circle"
              class="ml-2"
            />
          </v-text-button>
        </div>
        <div class="flex">
          <v-button type="submit">Odeslat</v-button>
        </div>
      </form>
      <h2 class="mt-24">Nebezpečná zóna</h2>
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
import { required, url } from "vuelidate/lib/validators";

import Auth from "@aws-amplify/auth";
import { API, graphqlOperation } from "aws-amplify";
import { AmplifyEventBus } from "aws-amplify-vue";

import VButton from "@/components/atoms/Button";
import VTextButton from "@/components/atoms/TextButton";
import VInput from "@/components/atoms/Input";
import VImage from "@/components/atoms/Image";
import { updateSpeaker, updateUser } from "../src/graphql/mutations";

const createUserSpeaker = /* GraphQL */ `
  mutation createUserSpeaker($id: ID!, $userID: ID!, $name: String!) {
    createSpeaker(input: { id: $id, name: $name }) {
      id
      name
    }
    updateUser(input: { id: $userID, userSpeakerId: $id }) {
      id
      speaker {
        id
        name
        bio
        links
      }
    }
  }
`;

const deleteUserSpeaker = /* GraphQL */ `
  mutation deleteUserSpeaker($id: ID!, $userID: ID!) {
    deleteSpeaker(input: { id: $id }) {
      id
    }
    updateUser(input: { id: $userID, userSpeakerId: null }) {
      id
      speaker {
        id
      }
    }
  }
`;

export default {
  components: { VButton, VInput, VImage, VTextButton },
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
      username: this.$store.state.userActivities.name || null,
      photoPickerConfig: {
        header: "Nová profilová fotka přednášejícího",
        title: "Nahrát",
        path: `upload/speaker/`
      },
      name:
        (this.$store.state.userActivities.speaker &&
          this.$store.state.userActivities.speaker.name) ||
        null,
      bio:
        (this.$store.state.userActivities.speaker &&
          this.$store.state.userActivities.speaker.bio) ||
        null,
      links:
        (this.$store.state.userActivities.speaker &&
          JSON.parse(this.$store.state.userActivities.speaker.links)) ||
        []
    };
  },
  validations: {
    name: {
      required
    },
    links: {
      $each: {
        url: {
          required,
          url
        }
      }
    }
  },
  methods: {
    async changeName() {
      const { data } = await API.graphql(
        graphqlOperation(updateUser, {
          input: {
            id: this.userActivities.id,
            name: this.username
          }
        })
      );

      if (
        data.updateUser.speaker.id !== null &&
        this.$store.state.userActivities.speaker !== data.updateUser.speaker
      ) {
        this.$store.commit("setUserActivity", {
          speaker: data.updateUser.speaker
        });
        this.$toast.success("Změna provedena!");
      }
    },
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
      // validate form
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      const response = await API.graphql(
        graphqlOperation(updateSpeaker, {
          input: {
            id: this.userActivities.speaker.id,
            name: this.name,
            bio: this.bio,
            links: this.links.length === 0 ? null : JSON.stringify(this.links)
          }
        })
      );

      if (response) {
        this.$toast.success("Upraveno! 📑");
      }
    },
    async uploadImage(image) {
      this.$toast.info("Děláme na tom.");
      const editImage = await API.graphql(
        graphqlOperation(updateSpeaker, {
          input: {
            id: this.userActivities.speaker.id,
            avatar: image
          }
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
