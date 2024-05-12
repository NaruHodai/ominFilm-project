<script>
import {onBeforeUnmount, onMounted, ref} from "vue";

export default {
  name:'FooterView',
  setup(){
    const screenWidth = ref(window.innerWidth);

    const handleResize = () => {
      screenWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener('resize', handleResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
    });

    return {
      screenWidth,
    };
  }
}
</script>

<template>
  <footer>
    <div class="footer-content" v-if="screenWidth > 499">
      <p>대표 : 허영민 | 사업자번호 : 399-16-02379 | TEL : 010.2082.6230 | 이메일 : als91800@naver.com</p>
    </div>
    <div class="footer-content" v-else>
      <p>대표 : 허영민 | 사업자번호 : 399-16-02379 </p>
      <p>TEL : 010.2082.6230 | 이메일 : als91800@naver.com</p>
    </div>
  </footer>
</template>

<style scoped>

</style>