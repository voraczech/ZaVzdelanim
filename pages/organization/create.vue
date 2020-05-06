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
        />
        <v-button
          :disabled="loading"
          @click.native="mutate"
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

const CreateOrg = `
mutation CreateOrganization($id: ID!, $name: String!, $creatorID: ID!) {
createOrganization(input: {id: $id, name: $name, creatorID: $creatorID}) {
  id
}
}`;

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
