<script>
import {useRouter} from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";
import Routes from "@/router/routes"
import {getContents} from "@/api/contents";

export default {
  name:'MainView',
  setup(){
    const router = useRouter();
    const items = ref("");

    const fetchContents = async () => {
      try {
        const data = await getContents();
        items.value = data.sort((a, b) => a.projectSeq - b.projectSeq);
      } catch (error) {
        console.error('Error fetching contents:', error);
      }
    };

    const handleScroll = () => {
      const divWraps = document.querySelectorAll('.photo-wrap');
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const headerHeight = 70; // 헤더의 높이

      divWraps.forEach((divWrap) => {
        const images = divWrap.querySelectorAll('.img-box .images');
        const divTop = divWrap.offsetTop - headerHeight;
        const divHeight = divWrap.offsetHeight;
        const divBottom = divTop + divHeight;

        // 요소가 화면의 상단에 닿았을 때만 작동
        if (divTop <= scrollY) {
          // 요소가 화면에 보이는 부분 계산
          const visibleHeight = Math.min(divBottom, scrollY + windowHeight) - Math.max(divTop, scrollY);
          const visibleRatio = visibleHeight / divHeight;

          images.forEach((img, imgIndex) => {
            if (visibleRatio >= (imgIndex + 0.5) / images.length) {
              img.style.opacity = 1;
            } else if (visibleRatio >= imgIndex / images.length) {
              const distanceFromStart = visibleRatio - imgIndex / images.length;
              const range = 1 / images.length;
              const opacity = Math.min(1, distanceFromStart / range);
              img.style.opacity = opacity;
            } else {
              const distanceFromStart = visibleRatio - imgIndex / images.length;
              const range = 1 / images.length;
              const opacity = Math.min(1, distanceFromStart / range);
              img.style.opacity = opacity;
            }
          });
        }

        // 마지막 이미지는 항상 보이도록 설정
        const lastImage = divWrap.querySelectorAll('.img-box .images')[0];
        if (scrollY + windowHeight >= divBottom) {
          lastImage.style.opacity = 1;
        }
      });
    };

    onMounted(() => {
      fetchContents();
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.addEventListener('scroll', handleScroll);
    })

    const onClickMoveDetailPage = (projectId) => {
      router.push({
        name: Routes.DetailPage,
        params:{
          projectId: projectId
        },
      })
    }

    return {
      items,
      onClickMoveDetailPage,
    };
  }
}
</script>

<template>
  <main>
    <section>
      <div class="photo-wrap" v-for="(item, index) in items" :key="index">
        <div class="photo-flame" @click="onClickMoveDetailPage(item.projectId)">
          <div class="img-box">
            <img :src="item.image[2].url" style="opacity: 0" class="images">
            <img :src="item.image[1].url" style="opacity: 0" class="images">
            <img :src="item.image[0].url" style="opacity: 1" class="images">
          </div>
          <div class="text-overlay-wrap">
            <div class="text-overlay">
              <div class="text-middle">{{ item.projectDivi }}</div>
              <div class="text-big">{{ item.projectTitle }}</div>
              <div class="text-small">
                <b class="light">{{ item.clientDivi }}. </b>
                <b class="bold">{{ item.clientName }}</b>
              </div>
              <div class="text-small">
                <b class="light">Place. </b>
                <b class="bold">{{item.projectPlace}}</b>
              </div>
              <div class="text-small">
                <b class="light">{{ item.releaseDate === null ? "" : `Date. `}}</b>
                <b class="bold">{{ item.releaseDate === null ? "unreleased" : `${item.releaseDate}`}}</b>
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
