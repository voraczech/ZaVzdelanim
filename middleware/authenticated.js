import Auth from "@aws-amplify/auth";
import { API, graphqlOperation } from "aws-amplify";

const userOutput = `
id
cognitoId
attendence{items{id}}
speaker{
  id
  name
  avatar {
    bucket
    region
    key
  }
  bio
  speaking{
    items{
      event{
        title
      }
    }
  }
}
creator{items{id}}
admin{items{id}}
`;

const getUserData = `query getUserData($id: ID!){
  getUser(id: $id){
    ${userOutput}
  }
}`;

const createUserData = `mutation createUser($id: ID!, $cognitoID: String!){
  createUser(input: {id: $id, cognitoId: $cognitoID}){
    ${userOutput}
  }
}
`;

export default async function ({ store, redirect }) {
  let user;

  // If the user is not authenticated
  if (!store.state.user) {
    try {
      user = await Auth.currentAuthenticatedUser();

      store.commit(`setUser`, user.attributes)
    } catch (err) {
      return redirect("/signin");
    }
  }

  // If there is no record from database in vuex
  if (!store.state.user.data) {
    const userData = await API.graphql(
      graphqlOperation(getUserData, {
        id: user.attributes.sub
      })
    );

    // If there is no record in databace at all
    if (userData.data.getUser === null) {
      const createUserData = await API.graphql(
        graphqlOperation(createUserData, {
          id: user.attributes.sub,
          cognitoID: user.attributes.sub
        })
      );
    }

    store.commit(`setUserData`, userData.data.getUser || createUserData.data.createUser)
  }
}
