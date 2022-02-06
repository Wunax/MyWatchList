<template>
  <div></div>
</template>

<script>
export default {
  name: 'Logout',
  async mounted() {
    await this.$axios.post('/auth/logout');
    await this.$store.commit('user/setMovies', []);
    await this.$router.push('/login');
  },
};
</script>
