<template>
  <div>
    <amplify-connect
      :mutation="createOrganizationMutation"
      @done="onCreateFinished"
    >
      <template slot-scope="{ loading, mutate, errors }">
        <v-input
          type="text"
          placeholder="Jméno organizace"
          v-model="name"
          required
        />
        <v-button
          :disabled="name.length === 0"
          @click.native="mutate"
          class="mt-4"
        >Vytvořit organizaci</v-button>
      </template>
    </amplify-connect>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { mapState } from "vuex";

import VInput from "@/components/atoms/Input";
import VButton from "@/components/atoms/Button";

import { required } from "vuelidate/lib/validators";

const CreateOrg = /* GraphQL */ `
  mutation CreateOrganization($id: ID!, $name: String!, $creatorID: ID!) {
    createOrganization(input: { id: $id, name: $name, creatorID: $creatorID }) {
      id
    }
  }
`;

export default {
  data() {
    return {
      name: ""
    };
  },
  head() {
    return {
      title: `Nová organizace`
    };
  },
  components: { VButton, VInput },
  computed: {
    ...mapState(["user"]),
    createOrganizationMutation() {
      return this.$Amplify.graphqlOperation(CreateOrg, {
        id: this.uuidv4,
        name: this.name,
        creatorID: this.user.sub
      });
    },
    uuidv4() {
      return uuidv4();
    }
  },
  methods: {
    onCreateFinished(result) {
      this.$router.push(`/organization/${result.data.createOrganization.id}`);
    }
  }
};
</script>
