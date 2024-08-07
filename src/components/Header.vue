<script>
import {useRouter} from "vue-router";
import Routes from "@/router/routes"
import { useAdminStore } from "@/store/admin";
import { computed, ref, onMounted, onUnmounted, watch } from "vue";

export default {
  name:'HeaderView',
  setup(){
    const router = useRouter();
    const adminStore = useAdminStore();
    const isAdmin = computed(() => adminStore.signin);
    const headerRightLogo = ref(require("@/assets/images/headerRightLogo.jpg"));
    const headerRightLogoHover = ref(require("@/assets/images/headerRightLogoMouseOver.jpg"));
    const hoverInfoVisible = ref(false);

    const toggleImageAndInfo = () => {
      // const hoverInfo = document.querySelector('.hover-info');
      if (hoverInfoVisible.value) {
        resetImage();
        hoverInfoVisible.value = false;
        // hoverInfo.style.display = 'none';
        hideHoverInfo();
      } else {
        changeImage();
        hoverInfoVisible.value = true;
        // hoverInfo.style.display = 'block';
        showHoverInfo();
      }
    }

    const changeImage = () => {
      headerRightLogo.value = headerRightLogoHover.value;
    }

    const resetImage = () => {
      headerRightLogo.value = require("@/assets/images/headerRightLogo.jpg");
    }

    const showHoverInfo = () => {
      const hoverInfo = document.querySelector('.hover-info');
      if (hoverInfo) {
        hoverInfo.style.display = 'block';
      }
    }

    const hideHoverInfo = () => {
      const hoverInfo = document.querySelector('.hover-info');
      if (hoverInfo) {
        hoverInfo.style.display = 'none';
      }
    }

    const makeCall = () => {
      const phoneNumber = '010-2082-6230';
      window.location.href = 'tel:' + phoneNumber;
    };

    const copied = ref(false);
    const sendKakaoMessage = () => {
      navigator.clipboard.writeText("als918")
          .then(() => {
            copied.value = true;
            setTimeout(() => {
              copied.value = false;
              alert("카카오톡 아이디가 복사되었습니다");
            }, 500);
          })
          .catch(err => {
            console.error('텍스트 복사 실패:', err);
          });
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

    const handleClickOutsideHoverInfo = (event) => {
      const hoverInfo = document.querySelector('.hover-info');
      const logoRight = document.querySelector('.logo.right');
      if (hoverInfo && logoRight && !logoRight.contains(event.target) && !hoverInfo.contains(event.target)) {
        resetImage();
        hoverInfoVisible.value = false;
        hideHoverInfo();
      }
    };

    onMounted(() => {
      document.addEventListener('click', handleClickOutsideHoverInfo);
    });

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutsideHoverInfo);
    });

    watch(() => router.currentRoute, () => {
      resetImage();
      hoverInfoVisible.value = false;
      hideHoverInfo();
    });

    return {
      makeCall,
      sendKakaoMessage,
      moveInstagram,
      onClickMoveMain,
      onClickLogout,
      changeImage,
      resetImage,
      toggleImageAndInfo,
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
    <div class="logo right" v-if="!isAdmin" @click="toggleImageAndInfo">
      <img :src="headerRightLogo">
    </div>
    <div class="hover-info">
      <div class="info-text" @click="moveInstagram">INSTAGRAM</div>
      <div class="info-text" @click="sendKakaoMessage">KAKAO | als918</div>
      <div class="info-text" @click="makeCall">+82)010-2082-6230</div>
    </div>
    <div class="hover-info" v-if="!isAdmin" style="background: red; width: 200px"></div>
    <div class="logo right" v-if="isAdmin">
      <button class="save-button" @click="onClickLogout">로그아웃</button>
    </div>
  </header>
</template>

<style scoped>

</style>