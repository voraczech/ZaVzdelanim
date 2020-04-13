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

import { v4 as uuidv4 } from "uuid";

import moment from "moment";
import Pikaday from "pikaday";
import "pikaday/css/pikaday.css";
window.moment = moment; // Required because of vue-form-generator
window.Pikaday = Pikaday; // Required before of vue-form-generator

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
      event: null,
      model: {
        title: "",
        description: "",
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
            required: true,
            featured: true
          },
          {
            type: "textArea",
            label: "Popis",
            placeholder:
              "Informace o přednášejícím, místě, organizaci, registracích…",
            model: "description"
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
            label: "Tagy",
            placeholder: "Přidej tag z nabídky, nebo vytvoř vlastní",
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
  computed: {
    eventUuid() {
      return uuidv4();
    },
    // https://medium.com/@andrew.s.trigg/using-appsync-and-amplify-with-vue-f45ebef7276e
    // GraphQL doesn't seem to like null values or empty strings, so
    // here we remove any properties that weren't given values, before
    // passing it to the query/mutation
    nonNullDetails() {
      return Object.entries(this.model).reduce((acc, curr) => {
        if (curr[1] && curr[1] !== 0) {
          acc[curr[0]] = curr[1];
        }
        return acc;
      }, {});
    }
  },
  methods: {
    async handleSubmit() {
      const { title, description } = this.model;

      const response = await await API.graphql(
        graphqlOperation(CreateEvent, {
          organizationID: this.organizationID,
          eventID: this.eventUuid,
          title,
          description
        })
      );

      this.$router.push(`/event/${response.data.createEvent.id}`);
      //return response
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
