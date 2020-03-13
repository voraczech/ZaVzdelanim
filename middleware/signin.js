import { Auth, Hub } from "aws-amplify";

export default async function ({ store, redirect }) {
  if (store.state.user) {
    return redirect("/");
  }

  try {
    const user = await Auth.currentAuthenticatedUser();
    store.commit(`setUser`, user.attributes)
    console.log(user.attributes)
    return redirect("/");
  } catch (err) {
    console.log("bb")
    return
  }
}
