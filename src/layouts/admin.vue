
<template>
  <section class="container">
    <h1>ADMIN PAGE</h1>
    <nuxt/>
  </section>
</template>

<script>
export default {
  middleware: ['auth', 'isAdmin'],
}
</script>


<style>

</style>
