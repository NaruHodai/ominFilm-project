<template>
  <HeaderView />
  <router-view />
  <FooterView />
</template>

<script>
import HeaderView from "@/components/Header.vue";
import FooterView from "@/components/Footer.vue";
export default {
  name: 'App',
  components: {
    HeaderView,
    FooterView,
  }
}
</script>

<style>

</style>
