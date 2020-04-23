<template>
  <div>
    <form
      @submit.prevent="onSubmit"
      class="flex flex-col gap-2"
    >
      <label
        for="title"
        class="font-bold"
      >Název*</label>
      <v-input
        type="text"
        id="title"
        v-model.trim="$v.title.$model"
        placeholder="Moje úžasná akce"
      />
      <div v-if="!$v.title.required && $v.title.$error">Název je nutný</div>
      <div v-if="!$v.title.minLength && $v.title.$error">Jméno musí mít aspoň {{$v.title.$params.minLength.min}} znaků.
      </div>
      <label for="description">Popis</label>
      <textarea
        id="description"
        cols="30"
        rows="10"
        placeholder="Informace o přednášejícím, místě, organizaci, registracích…"
        v-model="description"
      ></textarea>
      <label
        for="date"
        class="font-bold"
      >Začátek akce*</label>
      <datetime
        v-model="date"
        id="date"
        type="datetime"
      />
      <label for="dateEnd">Konec akce</label>
      <datetime
        v-model="dateEnd"
        id="dateEnd"
        type="datetime"
        :min-datetime="date"
      />
      <label for="place">Místo konání</label>
      <span class="text-sm font-semibold text-gray-600">Můžeš vložit i URL adresu</span>
      <v-geosearch
        id="place"
        @select="e => this.place = e"
      />
      <label for="photo">Fotka</label>
      <input
        ref="file_input"
        type="file"
        id="photo"
        @change="pick"
      />
      <div class="flex justify-between">
        <label for="speakers">Přednášející</label>
        <div class="w-1/2 max-w-3xl flex flex-col">
          <multiselect
            id="speakers"
            v-model="speakersSelect"
            :options="speakersOptions"
            :multiple="true"
            @search-change="asyncSpeakers"
            track-by="id"
            label="name"
            placeholder="Vyber si přednášejícího"
            select-label="Stiskni k vybrání"
            selected-label="Vybráno"
            deselect-label="Stiskni k odebrání"
          >
            <template slot="noResult">Bohužel žádný takový 🙈 Nevadí, stačí ho přidat!</template>
            <template slot="noOptions">Zadej alespoň 3 písmena a hledej přednášejícího 🔍</template>
          </multiselect>
          <div
            v-for="(v, key) in $v.newSpeakers.$each.$iter"
            :key="key"
            class="flex flex-col mt-8"
          >
            <input
              type="text"
              placeholder="Jméno"
              v-model.trim="v.name.$model"
            />
            <div
              class="error"
              v-if="!v.name.required && v.$error"
            >Každý má nějaké jméno.</div>
            <textarea
              class="mt-2"
              placeholder="Informace o přednášejícím"
              v-model.trim="v.bio.$model"
            ></textarea>
          </div>
          <v-text-button
            @click.native="newSpeakers.pop()"
            class="ml-auto mt-2"
            design="alert"
            v-if="newSpeakers.length > 0"
          >Odebrat
            <unicon
              name="minus-circle"
              class="ml-2"
            />
          </v-text-button>
          <v-text-button
            @click.native="newSpeakers.push({ name: ``, bio: ``})"
            class="ml-auto mt-3"
          >Přidat přednášejícího
            <unicon
              name="plus-circle"
              class="ml-2"
            />
          </v-text-button>
        </div>
      </div>

      <label for="hosts">Spolupořadatelé</label>
      <span class="text-sm font-semibold text-gray-600">Spolupořadatele vybírej pečlivě, nelze je pak upravit (kvůli
        zamezení vytváření událostí s dalším organizátorem a následným odebráním vlastní organizace)</span>
      <multiselect
        id="hosts"
        v-model="hosts"
        :options="hostOptions"
        track-by="id"
        label="name"
        :multiple="true"
        @search-change="asyncHosts"
        placeholder="Vyber si spolupořadatele"
        select-label="Stiskni k vybrání"
        selected-label="Vybráno"
        deselect-label="Stiskni k odebrání"
      >
        <template slot="noResult">Bohužel žádná taková organizace u nás není 🙈</template>
        <template slot="noOptions">Zadej alespoň 3 písmena a hledej spolupořadatele 🔍</template>
      </multiselect>
      <label for="tags">Tagy</label>
      <multiselect
        id="tags"
        v-model="tags"
        :options="tagsOptions"
        :multiple="true"
        :taggable="true"
        @tag="e => this.tags.push(e)"
        tag-placeholder="Přidej nový tag"
        placeholder="Vyber si tagy"
        select-label="Stiskni k vybrání"
        selected-label="Vybráno"
        deselect-label="Stiskni k odebrání"
      />
      <v-button type="submit">Odeslat</v-button>
      <div
        class="text-sm font-semibold text-red-600"
        v-if="$v.$error"
      >Formulář není správně vyplněn. Zkrontroluj to, prosím.</div>
    </form>
  </div>
</template>

<script>
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import { mapState } from "vuex";
import { required, minLength } from "vuelidate/lib/validators";
import { v4 as uuidv4 } from "uuid";

import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";

import VButton from "@/components/atoms/Button";
import VInput from "@/components/atoms/Input";
import VTextButton from "@/components/atoms/TextButton";
import VGeosearch from "@/components/molecules/Geosearch";
import Multiselect from "vue-multiselect";
import {
  searchSpeakers,
  searchOrganizations
} from "../../../src/graphql/queries";
import { createEvent } from "../../../src/graphql/mutations";

const getOrg = `query getOrganization($id: ID!) {
  getOrganization(id: $id){
      id
      name
      owner
      creatorID
  }
}
`;

// must create own mutation, bc i need specific batching Amplify can't generate (but it's valid for AppSync)
const createSpeakerWithSpeaking = `
mutation createSpeakerWithSpeaking(
  $eventID: ID!
  $speakerID: ID!
  $name: String!
  $bio: String
){
  createSpeaker(input:{
    id: $speakerID,
    name: $name,
    bio: $bio
  }){
    id
  }
  createSpeaking(input: {
    eventID: $eventID
    speakerID: $speakerID
  }){
    id
  }
}`;

const createSpeaking = `
mutation createSpeaking(
  $eventID: ID!
  $speakerID: ID!
){
  createSpeaking(input: {
    eventID: $eventID
    speakerID: $speakerID
  }){
    id
  }
}
`;

const createHost = `
mutation createHost(
  $eventID: ID!
  $organizationID: ID!
) {
  createHost(input: {
      eventID: $eventID
      organizationID: $organizationID
  }){
    id
  }
}
`;

export default {
  async asyncData({ params, redirect, store }) {
    const orgId = params.organization;

    const {
      data: { getOrganization }
    } = await API.graphql(graphqlOperation(getOrg, { id: orgId }));

    const userID = store.state.user.sub;

    if (userID !== getOrganization.creatorID) {
      return redirect("/");
    }

    return { organizationID: getOrganization.id };
  },
  data() {
    return {
      title: "",
      description: "",
      place: null,
      date: null,
      dateEnd: null,
      speakersSelect: [],
      speakersOptions: [],
      newSpeakers: [],
      // file
      file: null,
      s3ImagePath: "",
      photoUrl: "",
      storageOptions: {},
      error: "",
      // end file
      hosts: [],
      hostOptions: [],
      tags: [],
      tagsOptions: [
        "Marketing",
        "IT Development",
        "Business",
        "Osobní rozvoj",
        "Inspirace",
        "Design"
      ]
    };
  },
  validations: {
    title: {
      required,
      minLength: minLength(4)
    },
    newSpeakers: {
      $each: {
        name: {
          required
        },
        bio: {}
      }
    }
  },
  components: {
    VButton,
    VInput,
    VGeosearch,
    Datetime,
    VTextButton,
    Multiselect
  },
  methods: {
    // this method is from https://github.com/aws-amplify/amplify-js/blob/a7073b4a920a9298775c15a4fe5e77881c2d5a7e/packages/aws-amplify-vue/src/components/storage/PhotoPicker.vue
    pick: function(evt) {
      this.file = evt.target.files[0];
      if (!this.file) {
        return;
      }
      if (!this.storageOptions.contentType) {
        this.storageOptions.contentType = this.file.type;
      }
      const name = this.file.name;
      this.s3ImagePath = name;
      const that = this;
      const reader = new FileReader();
      reader.onload = e => {
        const target = e.target;
        const url = target.result;
        that.photoUrl = url;
      };
      reader.readAsDataURL(this.file);
    },
    async asyncSpeakers(query) {
      const response = await API.graphql(
        graphqlOperation(searchSpeakers, {
          filter: {
            name: {
              wildcard: `${query}*`
            }
          },
          limit: 3
        })
      );
      this.speakersOptions = response.data.searchSpeakers.items;
    },
    async asyncHosts(query) {
      const response = await API.graphql(
        graphqlOperation(searchOrganizations, {
          filter: {
            id: {
              ne: this.organizationID
            },
            name: {
              wildcard: `${query}*`
            }
          },
          limit: 3
        })
      );
      this.hostOptions = response.data.searchOrganizations.items;
    },
    async onSubmit() {
      // validate form
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      const eventID = uuidv4();

      // firstly, upload file
      let imageUploadResponse;
      if (this.file !== null) {
        try {
          const response = await Storage.put(
            `uploads/event/${eventID}/${this.s3ImagePath}`,
            this.file,
            this.storageOptions
          );

          this.$toast.info("Obrázek nahrán");
          imageUploadResponse = response.key;
        } catch (error) {
          this.$toast.error(
            "Jejda, nepodařilo se nahrát obrázek. Pokud se událost vytvoří, raději ji uprav."
          );
          console.error(error);
        }
      }

      let response;
      try {
        response = await API.graphql(
          graphqlOperation(createEvent, {
            input: {
              id: eventID,
              title: this.title,
              description: this.description || null,
              date: this.date || null,
              dateEnd: this.dateEnd || null,
              place: this.place || null,
              image: imageUploadResponse || null,
              tags: this.tags.length === 0 ? null : JSON.stringify(this.tags)
            }
          })
        );
      } catch (error) {
        this.$toast.error("Jejda, nepodařilo se vytvořit akci");
        console.error(error);
      }

      if (!!response) {
        // next, create new speakers and give them "speaking" connetion with this event
        if (this.newSpeakers.length > 0) {
          this.newSpeakers.forEach(async speaker => {
            try {
              const speakerID = uuidv4();

              await API.graphql(
                graphqlOperation(createSpeakerWithSpeaking, {
                  eventID: eventID,
                  speakerID: speakerID,
                  name: speaker.name,
                  bio: speaker.bio || null
                })
              );
            } catch (error) {
              this.$toast.error(
                `Jejda, přednášející ${speaker.name} se nějak nevytvořil. Pokud se událost vytvoří, raději ji uprav.`
              );
              console.error(error);
            }
          });
        }

        // give "speaking" connection other speakers
        if (this.speakersSelect.length !== 0) {
          this.speakersSelect.forEach(async speaker => {
            try {
              await API.graphql(
                graphqlOperation(createSpeaking, {
                  eventID: eventID,
                  speakerID: speaker.id
                })
              );
            } catch (error) {
              this.$toast.error(
                `Jejda, přednášející ${speaker.name} nebyl propojen. Pokud se událost vytvoří, raději ji uprav.`
              );
              console.error(error);
            }
          });
        }

        // add default hosts
        const hosts = [{ id: this.organizationID }, ...this.hosts];

        this.hosts.forEach(async host => {
          try {
            await API.graphql(
              graphqlOperation(createHost, {
                eventID: eventID,
                organizationID: host.id
              })
            );
          } catch (error) {
            this.$toast.error(
              `Jejda, organizátor ${host.name} nebyl propojen. Pokud se událost vytvoří, raději ji uprav.`
            );
            console.error(error);
          }
        });

        this.$router.push(`/event/${response.data.createEvent.id}`);
      } else {
        this.$toast.error(`Á jéje. `);
      }
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
