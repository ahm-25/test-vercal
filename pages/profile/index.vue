<script>
export default {
  name: "ProfileIndex",
  middleware({ redirect }) {
    return redirect("/profile/reservations?status=upcoming");
  },
};
</script>
