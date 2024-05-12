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
    const zz = ref("");

    const handleScroll = () => {
      console.log(zz.value);
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
            <p>{{ photo.type }}</p>
            <p>{{ photo.name }}</p>
            <p>{{ photo.clientType }}.{{ photo.client }}</p>
            <p>Place.{{photo.place}}</p>
            <p>{{ photo.date === "" ? "unreleased" : `Date.${photo.date}`}}</p>
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