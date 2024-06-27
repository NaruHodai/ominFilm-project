<script>
import {useRouter} from "vue-router";
import Routes from "@/router/routes"
import { useAdminStore } from "@/store/admin";
import { computed, ref } from "vue";

export default {
  name:'HeaderView',
  setup(){
    const router = useRouter();
    const adminStore = useAdminStore();
    const isAdmin = computed(() => adminStore.signin);
    const headerRightLogo = ref(require("@/assets/images/headerRightLogo.jpg"));
    const headerRightLogoHover = ref(require("@/assets/images/headerRightLogoMouseOver.jpg"));

    const changeImage = () => {
      headerRightLogo.value = headerRightLogoHover.value;
    }

    const resetImage = () => {
      headerRightLogo.value = require("@/assets/images/headerRightLogo.jpg");
    }

    const makeCall = () => {
      const phoneNumber = '010-2082-6230';
      window.location.href = 'tel:' + phoneNumber;
    };

    const sendKakaoMessage = () => {
      window.location.href = "kakaotalk://plusfriend/friend/01020826230";
    };

    const moveInstagram = () => {
      window.location.href = "https://www.instagram.com/0min.film/";
    }

    const onClickMoveMain = () => {
      router.push({
        name:Routes.Main,
      })
    };

    const onClickLogout = () => {
      console.log(isAdmin.value);
      if (confirm("정말로 로그아웃하시겠습니까?")) {
        adminStore.logout();
        router.push({
          name:Routes.Main,
        })
      }
    }

    return {
      makeCall,
      sendKakaoMessage,
      moveInstagram,
      onClickMoveMain,
      onClickLogout,
      changeImage,
      resetImage,
      headerRightLogo,
      isAdmin,
    };
  }
}
</script>

<template>
  <header>
    <div class="logo left" @click="onClickMoveMain">
      <img src="@/assets/images/headerLeftLogo.jpg">
    </div>
    <div class="logo right" v-if="!isAdmin" @mouseover="changeImage" @mouseleave="resetImage">
      <div class="logo-img">
        <img :src="headerRightLogo">
      </div>
      <div class="hover-info">
        <div class="info-text" @click="sendKakaoMessage">KAKAOTALK</div>
        <div class="info-text" @click="moveInstagram">INSTAGRAM</div>
        <div class="info-text" @click="makeCall">+82)010-2082-6230</div>
      </div>
    </div>
    <div class="hover-info" v-if="!isAdmin" style="background: red; width: 200px"></div>
    <div class="logo right" v-if="isAdmin">
      <button class="save-button" @click="onClickLogout">로그아웃</button>
    </div>
  </header>
</template>

<style scoped>
header {
  background-color: #fff;
  color: #333;
  padding: 35px;
  text-align: center;
  display: flex;
  justify-content: space-between; /* 요소들을 최대한 넓게 배치합니다 */
  align-items: center; /* 요소들을 수직으로 중앙에 배치합니다 */
  transition: transform 0.3s ease; /* 스크롤 효과 부드럽게 만듦 */
}

.logo {
  position: fixed; /* 로고를 고정 위치로 설정합니다 */
  width: 150px;
  flex: 0 0 auto; /* 유연한 너비를 사용하지 않고 고정 너비를 설정합니다 */
  cursor: pointer;
  z-index: 1000;
}

.logo.left {
  left: 0; /* 왼쪽 로고를 헤더 왼쪽에 고정합니다 */
}

.logo.right {
  right: 0; /* 오른쪽 로고를 헤더 오른쪽에 고정합니다 */
}

.logo img {
  max-width: 100%; /* 이미지가 부모 요소를 넘어가지 않도록 설정합니다 */
  height: auto;
}

.logo .hover-info {
  position: absolute; /* 절대 위치로 설정하여 .logo right 요소 내부에서 위치 조정 */
  top: 100%; /* 이미지 바로 아래에 위치하도록 설정 */
  left: 0; /* 부모 요소의 왼쪽에 맞춤 */
  background: rgb(245,27,20);
  width: 150px;
  height: 153px;
  display: none;
}

.logo.right:hover .hover-info {
  display: block;
}

.logo .hover-info .info-text {
  font-family: GmarketSansTTFMedium;
  color: white;
  height: 51px;
  font-size: 10pt;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>