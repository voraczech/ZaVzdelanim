<template>
  <div>
    <vue-form-generator
      :schema="schema"
      :model="model"
      :options="formOptions"
    ></vue-form-generator>
  </div>
</template>

<script>
import { Auth, API, graphqlOperation } from "aws-amplify";
import { mapState } from "vuex";

import moment from "moment";
import Pikaday from "pikaday";
import "pikaday/css/pikaday.css";
window.moment = moment; // Required because vue-form-generator sucks
window.Pikaday = Pikaday; // Required before vue-form-generator sucks

import { validators } from "vue-form-generator";

import Vue from "vue";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";

import Multiselect from "vue-multiselect";

// register globally
Vue.component("multiselect", Multiselect);

Vue.use(VueFormGenerator);

const getOrg = `query getOrganization($id: ID!) {
  getOrganization(id: $id){
      id
      name
      owner
      creatorID
  }
}
`;

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
  },
  data() {
    return {
      model: {
        title: "",
        desc: "",
        date: null,
        isOnline: true,
        url: "",
        place: "",
        tags: []
      },
      schema: {
        fields: [
          {
            type: "input",
            inputType: "text",
            label: "Název akce",
            model: "title",
            placeholder: "Moje úžasná akce",
            featured: true,
            required: true
          },
          {
            type: "textArea",
            label: "Popis",
            placeholder:
              "Informace o přednášejícím, místě, organizaci, registracích…",
            model: "desc"
          },
          {
            type: "pikaday",
            label: "Datum",
            placeholder: "Začátek konání akce",
            model: "date",
            featured: true,
            required: true,
            validator: VueFormGenerator.validators.date
          },
          {
            type: "switch",
            label: "Kde se koná přednáška?",
            model: "isOnline",
            textOn: "Online",
            textOff: "Fyzicky",
            valueOn: true,
            valueOff: false
          },
          {
            type: "input",
            inputType: "url",
            label: "URL adresa",
            model: "url",
            validator: VueFormGenerator.validators.url,
            required: function(model) {
              return model && model.isOnline;
            },
            visible: function(model) {
              return model && model.isOnline;
            }
          },
          {
            type: "googleAddress",
            label: "Adresa",
            placeholder: "Místo konání",
            model: "place",
            required: function(model) {
              return model && !model.isOnline;
            },
            visible: function(model) {
              return model && !model.isOnline;
            }
          },
          {
            type: "vueMultiSelect",
            model: "tags",
            label: "Libraries",
            placeholder: "Type to search or add tag",
            required: true,
            validator: validators.required,
            selectOptions: {
              multiple: true,
              searchable: true,
              taggable: true,
              tagPlaceholder: "Add this as new tag",
              onNewTag: function(newTag, id, options, value) {
                options.push(newTag);
                value.push(newTag);
              }
            },
            values: [
              "Marketing",
              "IT Development",
              "Business",
              "Osobní rozvoj",
              "Inspirace",
              "Design"
            ]
          },
          {
            type: "input",
            inputType: "submit"
          }
        ]
      },
      formOptions: {
        validateAfterLoad: false,
        validateAsync: true
      }
    };
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
