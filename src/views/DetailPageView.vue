<script>
import {useRoute} from "vue-router";
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import {getContent} from "@/api/contents";

export default {
  name:'DetailPageView',
  setup(){
    const route = useRoute();

    const iframeHeight = ref(315);
    const projectId = route.params.projectId;
    const content = ref({
      youtubeSrc: [],
      imageSrc: []
    });

    const fetchContent = async () => {
      try {
        const data = await getContent(projectId);
        content.value = data;
      } catch (error) {
        console.error('Error fetching contents:', error);
      }
    }
    onMounted(()=> {
      fetchContent();
    })

    const updateIframeHeight = () => {
      const iframe = document.querySelector('iframe');
      if (iframe) {
        const width = iframe.offsetWidth;
        iframeHeight.value = width * (9 / 16);
      }
    };

    onMounted(() => {
      window.addEventListener('resize', updateIframeHeight);
      updateIframeHeight();
      fetchContent().then(() => {
        // fetchContent 완료 후 다시 높이를 업데이트
        updateIframeHeight();
      });
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateIframeHeight);
    });

    // watch로 content의 변경을 감지
    watch(content, () => {
      updateIframeHeight();
    });

    return {
      iframeHeight,
      content,
    };
  }
}
</script>

<template>
  <div class="photo-wrap">
    <div class="photo-text">
    </div>
    <div class="iframe-container" v-if="content.youtubeSrcFirst">
      <iframe width="100%" :height="iframeHeight" :src="`https://www.youtube.com/embed/${content.youtubeSrcFirst}`" allowfullscreen />
    </div>
    <div class="iframe-container" v-if="content.youtubeSrcSecond">
      <iframe width="100%" :height="iframeHeight" :src="`https://www.youtube.com/embed/${content.youtubeSrcSecond}`" allowfullscreen />
    </div>
    <div class="iframe-container" v-if="content.youtubeSrcThird">
      <iframe width="100%" :height="iframeHeight" :src="`https://www.youtube.com/embed/${content.youtubeSrcThird}`" allowfullscreen />
    </div>
    <div class="iframe-container" v-if="content.youtubeSrcFourth">
      <iframe width="100%" :height="iframeHeight" :src="`https://www.youtube.com/embed/${content.youtubeSrcFourth}`" allowfullscreen />
    </div>
    <div class="iframe-container" v-if="content.youtubeSrcFifth">
      <iframe width="100%" :height="iframeHeight" :src="`https://www.youtube.com/embed/${content.youtubeSrcFifth}`" allowfullscreen />
    </div>
    <div class="photo-wrap" v-for="(photo, index) in content.image" :key="index">
      <div class="photo-flame">
        <img class="photo" :src="photo.url">
      </div>
    </div>
  </div>
</template>

<style scoped>
  .photo {
    width: 100%;
  }

</style>