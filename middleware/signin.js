import Auth from "@aws-amplify/auth";
import { Hub } from "@aws-amplify/core";

export default async function ({ store, redirect }) {
  if (store.state.user) {
    return redirect("/");
  }

  Hub.listen("auth", ({ payload: { event } }) => {
    if (event === `signIn`) {
      return redirect("/");
    }
  });

  try {
    const user = await Auth.currentAuthenticatedUser();
    store.commit(`setUser`, user.attributes)
    return redirect("/");
  } catch (err) {
    return
  }
}
