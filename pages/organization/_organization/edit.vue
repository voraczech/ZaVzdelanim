<template>
  <div>
    <form
      @submit.prevent="onSubmit"
      class="flex flex-col gap-2 max-w-lg"
    >
      <label
        for="name"
        class="font-bold"
      >Název*</label>
      <v-input
        type="text"
        id="name"
        v-model.trim="$v.name.$model"
        placeholder="Moje úžasná organizace"
      />
      <div v-if="!$v.name.required && $v.name.$error">Název je nutný</div>
      <label for="description">Popis</label>
      <textarea
        id="description"
        cols="30"
        rows="10"
        placeholder="Informace o organizaci"
        v-model="description"
      ></textarea>
      <label for="photo">Logo</label>
      <input
        ref="file_input"
        type="file"
        id="photo"
        @change="pick"
        accept="image/*"
      />
      <div class="flex justify-between">
        <label for="admins">Administrátoři</label>
        <div class="w-1/2 max-w-3xl flex flex-col">
          <multiselect
            id="admins"
            v-model="adminsSelect"
            :options="adminsOptions"
            :multiple="true"
            @search-change="asyncAdmins"
            track-by="id"
            label="name"
            placeholder="Vyber si admina"
            select-label="Stiskni k vybrání"
            selected-label="Vybráno"
            deselect-label="Stiskni k odebrání"
          >
            <template slot="noResult">Bohužel žádný takový 🙈 Zeptej se ho, jaké má nastaveno jméno (najde to v
              nastavení)</template>
            <template slot="noOptions">Zadej alespoň 3 písmena a hledej nového admina 🔍</template>
          </multiselect>
        </div>
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
      <v-button type="submit">Odeslat</v-button>
      <div
        class="text-sm font-semibold text-red-600"
        v-if="$v.$error"
      >Formulář není správně vyplněn. Zkrontroluj to, prosím.</div>
    </form>
    <div v-if="isOwner(creatorID)">
      <h2 class="mt-24">Nebezpečná zóna</h2>
      <nuxt-link to="archive">
        <v-button design="alert">Archivovat organizaci</v-button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { API, graphqlOperation, Storage } from "aws-amplify";
import { mapState } from "vuex";
import { required, url } from "vuelidate/lib/validators";
import { v4 as uuidv4 } from "uuid";

import VButton from "@/components/atoms/Button";
import VInput from "@/components/atoms/Input";
import VTextButton from "@/components/atoms/TextButton";

import Multiselect from "vue-multiselect";
import { searchUsers } from "../../../src/graphql/queries";
import {
  updateOrganization,
  deleteAdmin,
  createAdmin
} from "../../../src/graphql/mutations";

const getOrg = /* GraphQL */ `
  query getOrganization($id: ID!) {
    getOrganization(id: $id) {
      id
      name
      description
      logo
      links
      creatorID
      admins {
        items {
          id
          userID
          user {
            id
            name
          }
        }
      }
    }
  }
`;

export default {
  async asyncData({ params, redirect, store }) {
    const orgId = params.organization;

    const userID = store.state.user.sub;

    const { data } = await API.graphql(graphqlOperation(getOrg, { id: orgId }));

    let canAcces = false;

    if (userID === data.getOrganization.creatorID) {
      canAcces = true;
    } else {
      data.getOrganization.admins.items.forEach(admin => {
        if (userID === admin.userID) {
          canAcces = true;
        }
      });
    }

    if (!canAcces) {
      return redirect("/");
    }

    const organization = data.getOrganization;

    return {
      organizationId: organization.id,
      name: organization.name,
      description: organization.description,
      logo: organization.logo,
      creatorID: organization.creatorID,
      initialAdmins: organization.admins.items.map(item => {
        return { adminId: item.id, ...item.user };
      }),
      adminsSelect: organization.admins.items.map(item => {
        return { adminId: item.id, ...item.user };
      }),
      links: JSON.parse(organization.links) || []
    };
  },
  data() {
    return {
      adminsOptions: [],
      // file
      file: null,
      s3ImagePath: "",
      photoUrl: "",
      storageOptions: {},
      error: ""
      // end file
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
  components: {
    VButton,
    VInput,
    VTextButton,
    Multiselect
  },
  computed: {
    ...mapState(["user"])
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
    isOwner(owner) {
      return this.user.sub === owner;
    },
    async asyncAdmins(query) {
      const response = await API.graphql(
        graphqlOperation(searchUsers, {
          filter: {
            name: {
              wildcard: `${query}*`
            },
            id: {
              ne: this.user.sub
            }
          },
          limit: 3
        })
      );
      this.adminsOptions = response.data.searchUsers.items;
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
            `uploads/organization/${this.organizationId}/${this.s3ImagePath}`,
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
          id: this.organizationId,
          name: this.name,
          description: this.description || null,
          links:
            this.links && this.links.length === 0
              ? null
              : JSON.stringify(this.links)
        };

        if (imageUploadResponse) {
          input = { ...input, logo: imageUploadResponse };
        }

        response = await API.graphql(
          graphqlOperation(updateOrganization, {
            input: input
          })
        );
      } catch (error) {
        this.$toast.error("Jejda, nepodařilo se upravit organizaci");
        console.error(error);
      }

      if (!!response) {
        // give "admin" connections
        let adminsToDelete = this.initialAdmins.filter(
          admin => !this.adminsSelect.includes(admin)
        );
        let adminsToAdd = this.adminsSelect.filter(
          admin => !this.initialAdmins.includes(admin)
        );

        if (adminsToDelete.length !== 0) {
          adminsToDelete.forEach(async admin => {
            try {
              await API.graphql(
                graphqlOperation(deleteAdmin, {
                  input: {
                    id: admin.adminId
                  }
                })
              );
            } catch (error) {
              this.$toast.error(
                `Jejda, admin ${admin.name} nebyl odpojen. Pokud se organizace upraví, raději zkontroluj.`
              );
              console.error(error);
            }
          });
        }

        if (adminsToAdd.length !== 0) {
          adminsToAdd.forEach(async admin => {
            try {
              await API.graphql(
                graphqlOperation(createAdmin, {
                  input: {
                    organizationID: this.organizationId,
                    userID: admin.id
                  }
                })
              );
            } catch (error) {
              this.$toast.error(
                `Jejda, přednášející ${admin.name} nebyl propojen. Pokud se událost vytvoří, raději ji uprav.`
              );
              console.error(error);
            }
          });
        }

        this.$router.push(
          `/organization/${response.data.updateOrganization.id}`
        );
      } else {
        this.$toast.error(`Á jéje. `);
      }
    }
  }
};
</script>
