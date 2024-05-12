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

    const textOverlayPosition = (index) => {
      return index === photos.length - 1 ? "100px" : "40px";
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
      textOverlayPosition,
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
          <div class="text-overlay" :style="{ bottom: textOverlayPosition(index) }">
            <div class="text-middle">{{ photo.type }}</div>
            <div class="text-big">{{ photo.name }}</div>
            <div class="text-small">
              <b class="light">{{ photo.clientType }}.</b>
              <b class="bold">{{ photo.client }}</b>
            </div>
            <div class="text-small">
              <b class="light">Place.</b>
              <b class="bold">{{photo.place}}</b>
            </div>
            <div class="text-small">
              <b class="light">{{ photo.date === "" ? "" : `Date.`}}</b>
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
/* 메인 콘텐츠 스타일링 */
main {

}

section {

}

.photo-flame {
  position: relative; /* 포지션 설정 */
  max-width: 100%;
  overflow: hidden; /* 이미지가 부모 요소를 넘어가지 않도록 합니다 */
}

.photo-flame img {
  width: 100%; /* 이미지의 너비를 부모 요소에 맞게 100%로 설정합니다 */
  height: auto; /* 이미지의 가로 세로 비율을 유지합니다 */
  display: block; /* 인라인 요소에서 블록 요소로 변환하여 가로 너비를 100%로 설정합니다 */
}

.text-overlay {
  position: absolute; /* 포지션 설정 */
  color: #fff; /* 텍스트 색상을 흰색으로 설정 */
  transition: bottom 0.3s ease; /* 스크롤 시 bottom 속성을 부드럽게 변경 */
}
.text-overlay .text-middle {
  font-family: GmarketSansTTFBold;
}

.text-overlay .text-big {
  font-family: Sandoll CinemaTheater;
  font-weight: 400;
}

.text-overlay .text-small .light{
  font-family: GmarketSansTTFLight;
}

.text-overlay .text-small .bold{
  font-family: GmarketSansTTFBold;
}

.photo-line {
  display: flex; /* Flexbox 사용 */
  justify-content: center; /* 가로 방향으로 가운데 정렬 */
  align-items: center; /* 세로 방향으로 가운데 정렬 */
  height: 100%; /* 높이 설정 */
}

.photo-line img {
  max-width: 100%; /* 이미지 너비 최대 크기로 설정 */
  height: auto; /* 이미지의 가로 세로 비율 유지 */
}
</style>