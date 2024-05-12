<script>
import {useRouter} from "vue-router";
import { getCurrentInstance, onMounted, onBeforeUnmount, ref } from "vue";
import Route from "@/router/route"

export default {
  name:'MainView',
  setup(){
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const photos = proxy.$photos;

    const onClickMoveDetailPage = (index) => {
      router.push({
        name: Route.detailPage,
        params:{
          photo: index
        },
      })
    }

    let idx = ref(0);

    const handleScroll = () => {
      let position = 50;
      const photoFlames = document.querySelectorAll('.photo-flame');
      const textOverlays = document.querySelectorAll('.text-overlay');

      const photoFlameRect = photoFlames[idx.value].getBoundingClientRect();
      const textOverlaysRect = textOverlays[idx.value].getBoundingClientRect();
      console.log(textOverlaysRect.bottom)
      // console.log(photoFlameRect.bottom);
      if (photoFlameRect.top <= 0) {
        position = window.scrollY;
      }

      textOverlays[idx.value].style.top = `${position}px`;


    };

    onMounted(() => {
      // 스크롤 이벤트 리스너 추가
      window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      // 컴포넌트가 제거되기 전에 스크롤 이벤트 리스너 제거
      window.removeEventListener('scroll', handleScroll);
    });
    return {
      photos,
      onClickMoveDetailPage,
    };
  }
}
</script>

<template>
  <main>
    <section>
      <div class="photo-wrap" v-for="(photo, index) in photos" :key="index">
        <div class="photo-flame" @click="onClickMoveDetailPage(index)">
          <img :src="photo.src[0]">
          <div class="text-overlay">
            <div class="text-middle">{{ photo.type }}</div>
            <div class="text-big">{{ photo.name }}</div>
            <div class="text-small">
              <b class="light">{{ photo.clientType }}. </b>
              <b class="bold">{{ photo.client }}</b>
            </div>
            <div class="text-small">
              <b class="light">Place. </b>
              <b class="bold">{{photo.place}}</b>
            </div>
            <div class="text-small">
              <b class="light">{{ photo.date === "" ? "" : `Date. `}}</b>
              <b class="bold">{{ photo.date === "" ? "unreleased" : `${photo.date}`}}</b>
            </div>
          </div>
        </div>
      </div>
      <div class="photo-line">
        <img src="@/assets/images/bottomLineLogo.png">
      </div>
      <div class="photo-flame">
        <img src="../assets/images/myPhoto.jpg">
      </div>
    </section>
  </main>
</template>

<style scoped>

</style>