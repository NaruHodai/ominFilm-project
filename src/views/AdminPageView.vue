<script>
import {onMounted, ref} from 'vue';
import draggable from 'vuedraggable';
import {useRouter} from "vue-router";
import Routes from "@/router/routes";
import {getContents} from "@/api/contents";

export default {
  name: "AdminPageView",
  components: {
    draggable
  },
  setup() {
    const router = useRouter();
    const items = ref("");

    const fetchContents = async () => {
      try {
        const data = await getContents();
        items.value = data;
        console.log("tems.value:", items.value);
      } catch (error) {
        console.error('Error fetching contents:', error);
      }
    };

    onMounted(() => {
      fetchContents();
    });

    const onClickMoveAddContents = () => {
      router.push({
        name: Routes.AddContentsInfoPage,
      })
    }

    const onClickMoveDetailContentsInfo = (projectId) => {
      console.log(projectId);
      router.push({
        name: Routes.ContentsInfoPage,
        params:{
          projectId: projectId
        },
      })
    }

    const saveOrder = () => {
      // 아이템의 현재 순서를 콘솔에 출력
      console.log("Current order:", items.value);
      // 여기에 변경된 순서를 서버에 저장하는 등의 추가 로직을 작성할 수 있습니다.
    };
    return {
      items,
      onClickMoveAddContents,
      onClickMoveDetailContentsInfo,
      saveOrder,
    };
  }
}
</script>

<template>
<div class="admin-wrap">
  <div class="app">
    <div class="header">
      <div class="title-container">
        <div class="title">메인 화면 순서 리스트</div>
        <div class="add-button" @click="onClickMoveAddContents">
          <img src="@/assets/images/plusButton.png">
        </div>
      </div>
    </div>
    <draggable v-model="items" class="list">
      <!-- v-slot:item을 사용하여 항목을 정의합니다. -->
      <template #item="{ element }">
        <div class="list-item" @click="onClickMoveDetailContentsInfo(element.projectId)">
          {{ element.projectSeq }} {{ element.projectTitle }}
        </div>
      </template>
    </draggable>
    <button @click="saveOrder" class="save-button">저장</button>
  </div>
</div>
</template>

<style scoped>
.save-button {
  margin-top: 20px;
}
.title-container {
  display: flex;
  align-items: center;
}

.title {
  font-size: 2rem;
  font-weight: bold;
}

.add-button {
  width: 40px;
  margin-left: 20px;
  cursor: pointer;
}
.add-button img {
  width: 100%;
}
</style>