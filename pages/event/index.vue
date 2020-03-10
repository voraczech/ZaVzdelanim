<template>
  <div>
    <amplify-connect :query="ListTodosQuery">
      <template slot-scope="{loading, data, errors}">
        {{ errors }}
        <div v-if="loading">Loading...</div>
        <div v-if="errors > 0">
          Chyba, to mě mrzí.
        </div>
        <div v-else-if="data">
          {{ data }}
        </div>
      </template>
    </amplify-connect>
  </div>
</template>

<script>
import { components } from "aws-amplify-vue";
const ListTodoQuery = `query ListPosts {
  listPosts{
    items {
      id
      title
    }
  }
}
`;

export default {
  components: {
    ...components
  },
  computed: {
    ListTodosQuery() {
      return this.$Amplify.graphqlOperation(ListTodoQuery);
    }
  }
};
</script>
