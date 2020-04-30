import Auth from "@aws-amplify/auth";
import { API, graphqlOperation } from "aws-amplify";

const userOutput = `
id
cognitoId
name
followOrganization{items{organization{name,host(limit: 4){items{event{id,title,date,image,speaking{items{speaker{name}}}}}}}}}
followSpeaker{items{speaker{name,speaking(limit: 4){items{event{id,title,date,image,speaking{items{speaker{name}}}}}}}}}
attendence{
  items{
    event {
      id
      title
      date
      image
      speaking {
        items {
          speaker {
            name
          }
        }
      }
    }
  }
}
speaker{
  id
  name
  avatar
  bio
  links
  speaking{
    items{
      event {
        id
        title
        date
        speaking {
          items {
            speaker {
              name
            }
          }
        }
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

const createUserData = `mutation createUser($id: ID!, $cognitoID: String!, $name: String){
  createUser(input: {id: $id, cognitoId: $cognitoID, name: $name}){
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
    // If there is no record in database at all
    if (userData.data.getUser === null) {
      createUserDataResult = await API.graphql(
        graphqlOperation(createUserData, {
          id: user.attributes.sub,
          cognitoID: user.attributes.sub,
          name: user.attributes.name
        })
      );
    }

    store.commit(`setUserActivities`, userData.data.getUser || createUserDataResult.data.createUser)
  }
}
