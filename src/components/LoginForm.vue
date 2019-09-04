<template>      
  <div class="col-lg-6 mx-auto my-2">
    <h1>Login to your account</h1>
    <router-link to="/">Home</router-link>
    <router-link to="/admin">Home</router-link>
    <br/>

    <h2 class="title">Sign In with Google</h2>
      <button class="signIn mb-2"  @click="googleSignUp">Google Sign In</button>
    <br/>
    {{$store.state}}
    <form @submit.prevent>
      <div class="form-group">
        <input
          v-model="account.email"
          id="nuxtfire-email"
          type="email"
          class="form-control"
          placeholder="E-mail address"
        >
      </div>

      <div class="form-group">
        <input
          v-model="account.password"
          id="nuxtfire-password"
          type="password"
          class="form-control"
          placeholder="Password"
        >
      </div>

      <div class="form-group">
        <input @click="login" type="submit" class="btn btn-primary">
      </div>
      <div v-if="isError" class="alert alert-danger">
        <p class="mb-0">{{ errMsg }}</p>
      </div>
    </form>
  </div>
</template>

<script>
import { setTimeout } from "timers";

export default {
  data() {
    return {
      account: {
        email: "",
        password: ""
      },
      isError: false,
      errMsg: ""
    }
  },
  methods: {
    login() {
      // TODO: add parsing of data.
      this.$store.dispatch('users/login', this.account).catch(error => {
        this.isError = true;
        this.errMsg = error.code;

        setTimeout(() => {
          this.isError = false;
        }, 5000);
      });

      this.$router.push("/admin");
    },
    googleSignUp () {
      this.$store.dispatch('users/signUserInWithGoogle').then(() => {
        console.log('inside then statement on login');
      }).catch((e) => {
        console.log(e.message);
      })
    }
  }
}
</script>

<style lang="css">
</style>