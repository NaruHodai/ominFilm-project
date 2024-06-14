<script>
import {useRouter} from "vue-router";
import { getCurrentInstance, onMounted, ref } from "vue";
import Routes from "@/router/routes"

export default {
  name:'MainView',
  setup(){
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const photos = proxy.$photos;

    const onClickMoveDetailPage = (index) => {
      router.push({
        name: Routes.DetailPage,
        params:{
          photo: index
        },
      })
    }

    const currentPhotoIndex = ref(0);
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalPhotos = photos.length;

      const newIndex = Math.floor(scrollPosition / windowHeight) % totalPhotos;
      currentPhotoIndex.value = newIndex;
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    return {
      photos,
      onClickMoveDetailPage,
      currentPhotoIndex,
    };
  }
}
</script>

<template>
  <main>
    <section>
      <div class="photo-wrap" v-for="(photo, index) in photos" :key="index">
        <div class="photo-flame" @click="onClickMoveDetailPage(index)">
          <div class="img-box">
            <img
                v-for="(imgSrc, imgIndex) in photo.src"
                :key="imgIndex"
                :src="imgSrc"
                :class="{ 'active': imgIndex === currentPhotoIndex }"
                class="image"
            />

          </div>
          <div class="text-overlay-wrap">
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
      </div>
      <img src="../assets/images/bottomLineLogo.png" style="width: 100%;">
      <div class="photo-flame">
        <img src="../assets/images/myPhoto.jpg">
      </div>
    </section>
  </main>
</template>

<style scoped>

</style>