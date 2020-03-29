<template>
  <div>
    <amplify-connect
      :mutation="createOrganizationMutation"
      @done="onCreateFinished"
    >
      <template slot-scope="{ loading, mutate, errors }">
        <input
          type="text"
          placeholder="Jméno organizace"
          v-model="name"
        >
        <button
          :disabled="loading"
          @click="mutate"
        >Vytvořit organizaci</button>
      </template>
    </amplify-connect>
  </div>
</template>

<script>

const CreateEvent = `mutation CreateOrganization($name: String!) {
createEvent(name: $name, when: $when, where: $where, description: $description) {
  id
  name
  where
  when
  description
}
}`;

// Mutation
const eventDetails = {
  name: "Party tonight!",
  when: "8:00pm",
  where: "Ballroom",
  description: "Coming together as a team!"
};

export default {
  computed: {
    ListTodosQuery() {
      this.$Amplify.graphqlOperation(CreateEvent, eventDetails)
      //return this.$Amplify.graphqlOperation(CreateEvent, eventDetails);
    }
  }
};
</script>
