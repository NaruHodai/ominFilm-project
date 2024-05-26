<script>
import {useRouter} from "vue-router";
import Routes from "@/router/routes"

export default {
  name:'HeaderView',
  setup(){
    const router = useRouter();

    const makeCall = () => {
      const phoneNumber = '010-2082-6230';

      window.location.href = 'tel:' + phoneNumber;
    };

    const onClickMoveMain = () => {
      router.push({
        name:Routes.Main,
      })
    };

    return {
      makeCall,
      onClickMoveMain,
    };
  }
}
</script>

<template>
  <header>
    <div class="logo left" @click="onClickMoveMain">
      <img src="@/assets/images/headerLeftLogo.png">
    </div>
    <div class="logo right" @click="makeCall">
      <img src="@/assets/images/headerRightLogo.png">
    </div>
  </header>
</template>

<style scoped>

</style>