<script>
import {getCurrentInstance, ref} from 'vue';
import draggable from 'vuedraggable';
import {useRouter} from "vue-router";
import Routes from "@/router/routes";

export default {
  name: "AdminPageView",
  components: {
    draggable
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const photos = proxy.$photos;
    const router = useRouter();
    // 초기 아이템 리스트
    const items = ref(photos);

    const saveOrder = () => {
      // 아이템의 현재 순서를 콘솔에 출력
      console.log("Current order:", items.value);
      // 여기에 변경된 순서를 서버에 저장하는 등의 추가 로직을 작성할 수 있습니다.
    };
    const onClickDetailContents = (index) => {
      console.log(index);
      router.push({
        name: Routes.ContentsInfoPage,
        params:{
          photo: index
        },
      })
    }
    return {
      items,
      photos,
      saveOrder,
      onClickDetailContents,
    };
  }
}
</script>

<template>
<div class="admin-wrap">
  <!--  <div>
      <div>추가</div>
      <div>삭제</div>
    </div>-->
  <div class="app">
    <h1>메인 화면 순서 리스트</h1>
    <draggable v-model="items" class="list">
      <!-- v-slot:item을 사용하여 항목을 정의합니다. -->
      <template #item="{ element, index }">
        <div class="list-item" @click="onClickDetailContents(index)">
          {{ index + 1 }} {{ element.name }}
        </div>
      </template>
    </draggable>
    <button @click="saveOrder" class="save-button">저장</button>
  </div>
</div>
</template>

<style scoped>

</style>