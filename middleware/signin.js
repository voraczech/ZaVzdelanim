import Auth from "@aws-amplify/auth";
import { Hub } from "@aws-amplify/core";

export default async function ({ store, redirect }) {
  if (Object.keys(store.state.user).length !== 0) {
    return redirect("/");
  }

  Hub.listen("auth", async () => {
    return redirect("/");
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
