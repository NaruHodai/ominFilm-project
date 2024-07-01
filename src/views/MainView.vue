<script>
import {useRouter} from "vue-router";
import { onMounted, ref} from "vue";
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

    onMounted(() => {
      fetchContents();
    });

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
            <img :src="item.image[0].url">
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
main {

}

section {

}

.photo-flame {
  position: relative; /* 포지션 설정 */
  max-width: 100%;
}

.photo-flame img {
  width: 100%; /* 이미지의 너비를 부모 요소에 맞게 100%로 설정합니다 */
  height: auto; /* 이미지의 가로 세로 비율을 유지합니다 */
  display: block; /* 인라인 요소에서 블록 요소로 변환하여 가로 너비를 100%로 설정합니다 */
}

.text-overlay-wrap {
  position: absolute; /* 포지션 설정 */
  height: 80%;
}

.text-overlay {
  position: sticky;
  top: 10vh;
  color: #fff; /* 텍스트 색상을 흰색으로 설정 */
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

</style>