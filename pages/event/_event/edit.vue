<template>
  <div>
    <form
      @submit.prevent="onSubmit"
      class="flex flex-col gap-2 max-w-lg"
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
      <div
        v-if="!$v.title.required && $v.title.$error"
        class="text-red-700"
      >Název je nutný</div>
      <div
        v-if="!$v.title.minLength && $v.title.$error"
        class="text-red-700"
      >Jméno musí mít aspoň {{$v.title.$params.minLength.min}} znaků.
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
        accept="image/*"
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
            <v-input
              type="text"
              placeholder="Jméno"
              v-model.trim="v.name.$model"
            />
            <div
              class="text-red-700"
              v-if="!v.name.required && v.$error"
            >Každý má nějaké jméno.</div>
            <textarea
              class="mt-2"
              placeholder="Informace o přednášejícím"
              v-model.trim="v.bio.$model"
            ></textarea>
          </div>
          <v-text-button
            @click.native.prevent="newSpeakers.pop()"
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
            @click.native.prevent="newSpeakers.push({ name: ``, bio: ``})"
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
      <span class="text-sm font-semibold text-gray-600">Spolupořadatele nelze pak upravit kvůli
        zamezení vytváření událostí s dalším organizátorem a následným odebráním vlastní organizace</span>
      <multiselect
        id="hosts"
        v-model="hosts"
        :options="hosts"
        :multiple="true"
        track-by="id"
        label="name"
        :disabled="true"
      />
      <label for="link">Link</label>
      <v-input
        type="text"
        id="link"
        placeholder="Zde může být externí link, například odkaz na materiály."
        v-model="link"
      />
      <label for="video">YouTube video</label>
      <v-input
        type="text"
        id="link"
        placeholder="Odkaz na YouTube video, třeba na livestream nebo záznam"
        v-model="video"
      />
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
        class="text-sm font-semibold text-red-700"
        v-if="$v.$error"
      >Formulář není správně vyplněn. Zkrontroluj to, prosím.</div>
    </form>
    <h2 class="mt-24">Nebezpečná zóna</h2>
    <nuxt-link to="delete">
      <v-button design="alert">Odstranit</v-button>
    </nuxt-link>
  </div>
</template>

<script>
import { API, graphqlOperation, Storage } from "aws-amplify";
import { mapState } from "vuex";
import { required, minLength } from "vuelidate/lib/validators";
import { v4 as uuidv4 } from "uuid";

import { Datetime } from "vue-datetime";

import VButton from "@/components/atoms/Button";
import VInput from "@/components/atoms/Input";
import VTextButton from "@/components/atoms/TextButton";
import VGeosearch from "@/components/molecules/Geosearch";
import Multiselect from "vue-multiselect";
import {
  searchSpeakers,
  searchOrganizations
} from "../../../src/graphql/queries";
import { updateEvent, deleteSpeaking } from "../../../src/graphql/mutations";

const getEvent = /* GraphQL */ `
  query getEvent($id: ID!, $userID: ID) {
    getEvent(id: $id) {
      id
      title
      description
      place
      image
      date
      dateEnd
      link
      video
      tags
      host {
        items {
          organization {
            id
            name
            creatorID
            admins(userID: { eq: $userID }) {
              items {
                userID
              }
            }
          }
        }
      }
      speaking {
        items {
          id
          speaker {
            id
            name
          }
        }
      }
    }
  }
`;

// must create own mutation, bc i need specific batching Amplify can't generate (but it's valid for AppSync)
const createSpeakerWithSpeaking = /* GraphQL */ `
  mutation createSpeakerWithSpeaking(
    $eventID: ID!
    $speakerID: ID!
    $name: String!
    $bio: String
  ) {
    createSpeaker(input: { id: $speakerID, name: $name, bio: $bio }) {
      id
    }
    createSpeaking(input: { eventID: $eventID, speakerID: $speakerID }) {
      id
    }
  }
`;

const createSpeaking = /* GraphQL */ `
  mutation createSpeaking($eventID: ID!, $speakerID: ID!) {
    createSpeaking(input: { eventID: $eventID, speakerID: $speakerID }) {
      id
    }
  }
`;

export default {
  async asyncData({ params, redirect, store }) {
    const eventID = params.event;

    const userID = store.state.user.sub;

    const { data } = await API.graphql(
      graphqlOperation(getEvent, { id: eventID, userID: userID })
    );

    let canAcces = false;

    data.getEvent.host.items.forEach(host => {
      if (userID === host.organization.creatorID) {
        canAcces = true;
      }

      host.organization.admins.items.forEach(admins => {
        if (admins.userID === userID) {
          canAcces = true;
        }
      });
    });

    if (!canAcces) {
      return redirect("/");
    }

    const event = data.getEvent;

    return {
      eventID: data.getEvent.id,
      title: event.title,
      description: event.description,
      place: event.place,
      date: event.date,
      dateEnd: event.dateEnd,
      link: event.link,
      video: event.video,
      initialSpeakers: event.speaking.items.map(item => {
        return { speakingID: item.id, ...item.speaker };
      }),
      speakersSelect: event.speaking.items.map(item => {
        return { speakingID: item.id, ...item.speaker };
      }),
      hosts: event.host.items.map(item => item.organization),
      tags: JSON.parse(event.tags)
    };
  },
  data() {
    return {
      speakersOptions: [],
      newSpeakers: [],
      // file
      file: null,
      s3ImagePath: "",
      photoUrl: "",
      storageOptions: {},
      error: "",
      // end file
      tags: [],
      tagsOptions: [
        "Marketing",
        "IT Development",
        "Business",
        "Osobní rozvoj",
        "Inspirace",
        "Design"
      ],
      link: "",
      video: ""
    };
  },
  head() {
    return {
      title: `Editace události`
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

    async onSubmit() {
      // validate form
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      // firstly, upload file
      let imageUploadResponse;
      if (this.file !== null) {
        try {
          const response = await Storage.put(
            `uploads/event/${this.eventID}/${this.s3ImagePath}`,
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
        let input = {
          id: this.eventID,
          title: this.title,
          description: this.description || null,
          date: this.date || null,
          dateEnd: this.dateEnd || null,
          place: this.place || null,
          link: this.link || null,
          video: this.video || null,
          tags:
            this.tags && this.tags.length === 0
              ? null
              : JSON.stringify(this.tags)
        };

        if (imageUploadResponse) {
          input = { ...input, image: imageUploadResponse };
        }

        response = await API.graphql(
          graphqlOperation(updateEvent, {
            input: input
          })
        );
      } catch (error) {
        this.$toast.error("Jejda, nepodařilo se upravit akci");
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
                  eventID: this.eventID,
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
        let speakersToDelete = this.initialSpeakers.filter(
          speaker => !this.speakersSelect.includes(speaker)
        );
        let speakersToAdd = this.speakersSelect.filter(
          speaker => !this.initialSpeakers.includes(speaker)
        );

        if (speakersToDelete.length !== 0) {
          speakersToDelete.forEach(async speaker => {
            try {
              await API.graphql(
                graphqlOperation(deleteSpeaking, {
                  input: {
                    id: speaker.speakingID
                  }
                })
              );
            } catch (error) {
              this.$toast.error(
                `Jejda, přednášející ${speaker.name} nebyl odpojen. Pokud se událost upraví, raději zkontroluj.`
              );
              console.error(error);
            }
          });
        }

        if (speakersToAdd.length !== 0) {
          speakersToAdd.forEach(async speaker => {
            try {
              await API.graphql(
                graphqlOperation(createSpeaking, {
                  eventID: this.eventID,
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

        this.$router.push(`/event/${response.data.updateEvent.id}`);
      } else {
        this.$toast.error(`Á jéje. `);
      }
    }
  }
};
</script>
