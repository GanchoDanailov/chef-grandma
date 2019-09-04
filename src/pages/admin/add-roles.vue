<template>
  <div class="col-lg-6 mx-auto my-2">
    <h1>Add roles</h1>

    <form @submit.prevent>
      <div class="form-group">
        <input
          v-model="email"
          id="nuxtfire-email"
          type="email"
          class="form-control"
          placeholder="E-mail address"
        >
      </div>

      <div class="form-group">
        <input @click="addAdminRole" type="submit" class="btn btn-primary">
      </div>
      <b-alert variant="success" show v-if="isMessage">
        {{ infoMsg }}
      </b-alert>
      <div v-if="isError" class="alert alert-danger">
        <p class="mb-0">{{ errMsg }}</p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      email: '',
      isError: false,
      errMsg: "",
      isMessage: false,
      infoMsg: ""
    }
  },
  methods: {
    addAdminRole() {
      this.$store.dispatch('users/addAdminRole', this.email.trim()).then((result) => {
        if(result.data.errorInfo){
          this.isError = true;
          this.errMsg = result.data.errorInfo.message;
          setTimeout(() => { this.isError = false; }, 5000);
        } else {
          this.isMessage = true;
          this.infoMsg = result.data.messages;
          setTimeout(() => { this.isMessage = false; }, 5000);
        }
      }).catch((e) => {
        console.log('error', e)
      })
    }
  }
}
</script>