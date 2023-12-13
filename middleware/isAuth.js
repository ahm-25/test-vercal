export default ({ redirect, app: { $auth, localePath } }) => {
  if ($auth.loggedIn) {
    redirect(localePath("/"));
  }
};
