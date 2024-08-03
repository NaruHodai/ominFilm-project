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
      const headerHeight = 70; // 헤더의 높이

      divWraps.forEach((divWrap, index) => {
        const images = divWrap.querySelectorAll('.img-box .images');
        const divTop = divWrap.offsetTop - headerHeight;
        const divHeight = divWrap.offsetHeight;

        if (index === 0 && scrollY === 0) {
          images[0].style.opacity = 1;
          images[1].style.opacity = 0;
          images[2].style.opacity = 0;
        } else {
          images.forEach((img) => {
            img.style.opacity = 0; // 초기 상태로 모든 이미지를 숨김
          });

          // 첫 번째 이미지가 기본적으로 보이도록 설정
          images[0].style.opacity = 1;

          // 두 번째 이미지가 보이는 조건
          if (scrollY >= divTop) {
            console.log("1");
            images[0].style.opacity = 0;
            images[1].style.opacity = 1;
          }

          // 세 번째 이미지가 보이는 조건
          if (scrollY >= divTop + divHeight / 5) {
            console.log("2");
            images[1].style.opacity = 0;
            images[2].style.opacity = 1;
          }
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
            <img :src="item.image[0].url" style="opacity: 1" class="images">
            <img :src="item.image[1].url" style="opacity: 0" class="images">
            <img :src="item.image[2].url" style="opacity: 0" class="images">
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
