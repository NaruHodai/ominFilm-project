<script>
import {useRoute} from "vue-router";
import {getCurrentInstance,ref, onMounted, onBeforeUnmount } from "vue";

export default {
  name:'DetailPageView',
  setup(){
    const { proxy } = getCurrentInstance();
    const route = useRoute();

    const detailPhoto = ref({});
    const iframeHeight = ref(315);
    const photoIndex = route.params.photo;

    detailPhoto.value = proxy.$photos[photoIndex];

    const updateIframeHeight = () => {
      const iframe = document.querySelector('iframe');
      if (iframe) {
        const width = document.querySelector('iframe').offsetWidth;
        iframeHeight.value = width * (9 / 16);
      }
    };

    onMounted(() => {
      window.addEventListener('resize', updateIframeHeight);
      updateIframeHeight();
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateIframeHeight);
    });

    return {
      detailPhoto,
      iframeHeight,
    };
  }
}
</script>

<template>
  <div class="photo-wrap">
    <div class="photo-text">
    </div>
    <div class="iframe-container" v-for="(youtube, index) in detailPhoto.youtubeSrc" :key="index">
      <iframe width="100%" :height="iframeHeight" :src="`https://www.youtube.com/embed/${youtube}`" allowfullscreen />
    </div>
    <div class="photo-wrap" v-for="(photo, index) in detailPhoto.src" :key="index">
      <div class="photo-flame">
        <img :src="photo">
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>