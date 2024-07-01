<template>
  <HeaderView />
  <router-view />
  <FooterView />
  <LoadingOverlayView />
</template>

<script>
import HeaderView from "@/components/Header.vue";
import FooterView from "@/components/Footer.vue";
import LoadingOverlayView from '@/components/LoadingOverlay.vue';
export default {
  name: 'App',
  components: {
    HeaderView,
    FooterView,
    LoadingOverlayView,
  }
}
</script>

<style>

</style>
