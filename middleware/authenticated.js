import Auth from "@aws-amplify/auth";

export default async function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.user) {
    // Hub.listen("auth", ({ payload: { event } }) => {
    //   if (event === `signIn`) {
    //     // const user = await Auth.currentAuthenticatedUser();
    //     // store.commit(`setUser`, user.attributes)
    //   }
    // });

    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log(user)

      store.commit(`setUser`, user.attributes)
    } catch (err) {
      console.log(err)
      return redirect("/signin");
    }
  }
  return
}
