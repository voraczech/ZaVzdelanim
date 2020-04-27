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
        class="text-sm font-semibold text-red-600"
        v-if="$v.$error"
      >Formulář není správně vyplněn. Zkrontroluj to, prosím.</div>
    </form>
  </div>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";
import { mapState } from "vuex";

const getOrg = `query getOrganization($id: ID!, $userID: ID!) {
  getOrganization(id: $id){
      id
      name
      owner
      creatorID
      admins(userID: {eq: $userID}){
        items {
          id
        }
      }
  }
}
`;

export default {
  async asyncData({ params, redirect, store }) {
    const orgId = params.organization;

    const userID = store.state.user.sub;

    const { data } = await API.graphql(
      graphqlOperation(getOrg, { id: orgId, userID: userID })
    );

    let canAcces = false;

    if (userID === data.getOrganization.creatorID) {
      canAcces = true;
      return;
    } else {
      data.getOrganization.admins.items.forEach(admins => {
        if (userID === admins.admin.id) {
          canAcces = true;
          return;
        }
      });
    }

    if (!canAcces) {
      return redirect("/");
    }
  }
};
</script>
