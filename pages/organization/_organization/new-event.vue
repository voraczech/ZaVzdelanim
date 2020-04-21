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
      <v-geosearch
        id="place"
        @select="e => this.place = e"
      />
      <label for="photo">Fotka</label>
      <v-input
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
            v-model="speaking"
            :options="speakers"
            :multiple="true"
            @search-change="asyncSpeakers"
            placeholder="Vyber si přednášejícího"
            select-label="Stiskni k vybrání"
            selected-label="Vybráno"
            deselect-label="Stiskni k odebrání"
          >
            <template slot="noResult">Bohužel žádný takový 🙈 Nevadí, stačí ho přidat!</template>
            <template slot="noOptions">Zadej alespoň 3 písmena a hledej přednášejícího 🔍</template>
          </multiselect>
          <div
            v-for="(n, key) in newSpeakersNumber"
            :key="key"
            class="flex flex-col"
          >
            <input
              type="text"
              placeholder="Jméno"
            />
            <textarea placeholder="Informace o přednášejícím"></textarea>
          </div>
          <v-text-button
            @click.native="newSpeakersNumber++"
            class="ml-auto"
          >Přidat přednášejícího
            <unicon name="plus" />
          </v-text-button>
          <v-text-button
            @click.native="newSpeakersNumber--"
            class="ml-auto"
            v-if="newSpeakersNumber > 0"
          >Odebrat přednášejícího
            <unicon name="plus" />
          </v-text-button>
        </div>
      </div>
      <label for="hosts">Spolupořadatelé</label>
      <multiselect
        id="hosts"
        v-model="hosts"
        :options="hostOptions"
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
    </form>
    <!-- <vue-form-generator
      :schema="schema"
      :model="model"
      :options="formOptions"
    ></vue-form-generator> -->
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

const getOrg = `query getOrganization($id: ID!) {
  getOrganization(id: $id){
      id
      name
      owner
      creatorID
  }
}
`;

const CreateEvent = `
mutation CreateEvent(
  $organizationID: ID!
  $eventID: ID!
  $title: String!
  $description: String
  $date: AWSTimestamp
  $place: String
  $tags: String
  ) {
    createEvent(input: {
      id: $eventID
      title: $title
      description: $description
      date: $date
      place: $place
      tags: $tags}) {
      id
    }
    createHost(input: {
      organizationID: $organizationID
      eventID: $eventID
    }){
      id
    }
}`;

export default {
  async asyncData({ params, redirect }) {
    const orgId = params.organization;

    const {
      data: { getOrganization }
    } = await API.graphql(graphqlOperation(getOrg, { id: orgId }));

    let userCred;

    const user = await Auth.currentAuthenticatedUser();
    userCred = user.attributes;

    if (userCred.sub !== getOrganization.creatorID) {
      return redirect("/");
    }

    return { organizationID: getOrganization.id };
  },
  data() {
    return {
      title: "",
      description: "",
      hosts: null,
      place: null,
      date: null,
      dateEnd: null,
      speaking: null,
      speakers: [],
      // file
      file: null,
      s3ImagePath: "",
      photoUrl: "",
      storageOptions: {},
      error: "",
      // end file
      newSpeakersNumber: 0,
      hostOptions: [],
      tags: null,
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
  computed: {
    eventUuid() {
      return uuidv4();
    }
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
      this.s3ImagePath = `test/${name}`;
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
      if (query.length > 2) {
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
        this.speakers = response.data.searchSpeakers.items.map(
          item => item.name
        );
      }
    },
    async asyncHosts(query) {
      if (query.length > 2) {
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
        this.hostOptions = response.data.searchOrganizations.items.map(
          item => item.name
        );
      }
    },
    async onSubmit() {
      // validate form
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      if (this.file !== null) {
        try {
          const imageUpload = await Storage.put(
            this.s3ImagePath,
            this.file,
            this.storageOptions
          );

          this.$toast.info("Obrázek nahrán");
        } catch (err) {
          this.$toast.error("Jejda, nepodařilo se nahrát obrázek");
          console.error(err);
        }
      }

      try {
        const response = await API.graphql(
          graphqlOperation(CreateEvent, {
            organizationID: this.organizationID,
            eventID: this.eventUuid,
            title: this.title,
            description: this.description
          })
        );

        this.$router.push(`/event/${response.data.createEvent.id}`);
      } catch (err) {
        this.$toast.error("Jejda, nepodařilo se vytvořit akci");
        console.error(err);
      }
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
