<script>
import {useRouter} from "vue-router";
import Routes from "@/router/routes"
import { useAdminStore } from "@/store/admin";
import { computed } from "vue";

export default {
  name:'HeaderView',
  setup(){
    const router = useRouter();
    const adminStore = useAdminStore();
    const isAdmin = computed(() => adminStore.signin);

    const makeCall = () => {
      const phoneNumber = '010-2082-6230';

      window.location.href = 'tel:' + phoneNumber;
    };

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
      onClickMoveMain,
      onClickLogout,
      isAdmin,
    };
  }
}
</script>

<template>
  <header>
    <div class="logo left" @click="onClickMoveMain">
      <img src="@/assets/images/headerLeftLogo.png">
    </div>
    <div class="logo right" v-if="!isAdmin" @click="makeCall">
      <img src="@/assets/images/headerRightLogo.png">
    </div>
    <div class="logo right" v-if="isAdmin">
      <button class="save-button" @click="onClickLogout">로그아웃</button>
    </div>
  </header>
</template>

<style scoped>

</style>