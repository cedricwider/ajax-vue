<template>
  <div id="app">
    <c-navbar/>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'app',
  components: {
    cNavbar: Navbar
  }
}
</script>

<style scoped>
  .content {
    margin-top: 20px;
    height: 100vh;
  }
</style>
