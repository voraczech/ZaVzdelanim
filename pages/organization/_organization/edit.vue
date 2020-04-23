<template>

</template>

<script>
import { Auth, API, graphqlOperation } from "aws-amplify";
import { mapState } from "vuex";

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
  async asyncData({ params, redirect, store }) {
    const orgId = params.organization;

    const {
      data: { getOrganization }
    } = await API.graphql(graphqlOperation(getOrg, { id: orgId }));

    const userID = store.state.user.sub;

    if (userID !== getOrganization.creatorID) {
      return redirect("/");
    }
  }
};
</script>
