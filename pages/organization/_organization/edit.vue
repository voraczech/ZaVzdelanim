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
  }
};
</script>
