<template>
  <HeaderNav title="FLIGHT" />
  <router-view></router-view>
</template>

<script>

import HeaderNav from './components/Header.vue'
export default {
  name: 'App',
  components: {
    HeaderNav
  }
}
</script>

<style></style>
