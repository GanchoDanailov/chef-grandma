<template>
  <section>
    <h1>Admin route</h1>
    <a @click="logout">Logout</a>
    {{$store.state}}
  </section>
</template>

<script>
import { auth } from "@/services/firebase";
import Cookie from "js-cookie";

export default {
  layout: "admin",
  methods: {
    async logout() {
      await auth.signOut();
      await Cookie.remove("__session");

      location.href = "/";
    }
  }
};
</script>

