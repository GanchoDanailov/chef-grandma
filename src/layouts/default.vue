<template>
<div>
  <b-navbar toggleable="lg" variant="dark" type="dark">
    <b-navbar-brand to="/">Баба готви</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/login">Вход</b-nav-item>
        <b-nav-item to="/register">Регистрация</b-nav-item>
        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item to="#">EN</b-dropdown-item>
          <b-dropdown-item to="#">BG</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right v-show="isAuthenticated">
          <!-- Using 'button-content' slot -->
          <template slot="button-content"><em>Потребител</em></template>
          <b-dropdown-item to="#">Профил</b-dropdown-item>
          <b-dropdown-item  @click="logout">Изход</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <section class="container">
    <nuxt/>
  </section>
</div>

</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters['users/isAuthenticated']
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('users/logout').catch(error => {
        console.log('users/logout error', error)
      })
      this.$router.push("/")
    },
  }
};
</script>

<style>
/* @import url(https://bootswatch.com/4/sandstone/bootstrap.min.css); */
</style>
