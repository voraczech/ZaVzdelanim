import Auth from "@aws-amplify/auth";
import { Hub } from "@aws-amplify/core";

export default async function ({ store, redirect }) {
  if (store.state.user) {
    return redirect("/");
  }

  Hub.listen("auth", async () => {
    return redirect("/settings");
  });

  try {
    const user = await Auth.currentAuthenticatedUser();

    if (!!user.attributes) {
      return redirect("/");
    }
  } catch (err) {
    return
  }
}
