import Auth from "@aws-amplify/auth";

export default async function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.user) {
    try {
      const user = await Auth.currentAuthenticatedUser();
      store.commit(`setUser`, user.attributes)
    } catch (err) {
      return redirect("/signin");
    }
  }
  return
}
