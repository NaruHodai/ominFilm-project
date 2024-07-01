<script>
export default {
  name: "NotFoundView",
  setup() {
    return {

    };
  }
}
</script>

<template>
  <div class="admin-wrap">
    <div class="not-found">
      <h1>404 - Page Not Found</h1>
      <p>죄송합니다, 요청하신 페이지를 찾을 수 없습니다.</p>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
}
</style>