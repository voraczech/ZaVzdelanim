import Auth from "@aws-amplify/auth";
import { API, graphqlOperation } from "aws-amplify";

const userOutput = `
id
cognitoId
attendence{items{event{id,title}}}
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
creator{items{id, name}}
admin{items{organization{id,name}}}
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
  if (Object.keys(store.state.user).length === 0) {
    try {
      user = await Auth.currentAuthenticatedUser();

      store.commit(`setUser`, user.attributes)
    } catch (err) {
      return redirect("/signin");
    }
  }

  // If there is no record from database in vuex
  if (!store.state.userActivities.isSet) {
    const userData = await API.graphql(
      graphqlOperation(getUserData, {
        id: user.attributes.sub
      })
    );

    let createUserDataResult;
    // If there is no record in databace at all
    if (userData.data.getUser === null) {
      createUserDataResult = await API.graphql(
        graphqlOperation(createUserData, {
          id: user.attributes.sub,
          cognitoID: user.attributes.sub
        })
      );
    }

    store.commit(`setUserActivities`, userData.data.getUser || createUserDataResult.data.createUser)
  }
}
