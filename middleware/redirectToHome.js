export default ({ redirect, app: { localePath } }) => {
  redirect(localePath('/home'))
}
