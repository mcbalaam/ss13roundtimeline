<template>
  <Navigbar/>
  <router-view/>
</template>

<script>
import Navigbar from './components/Navigbar.vue';

export default {
  name: 'App',
  components: {
    Navigbar
  }
}
</script>

<style>
  body {
    background-color: rgb(26, 54, 54);
  }
</style>
