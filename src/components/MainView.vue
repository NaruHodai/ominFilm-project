<script>
import {useRouter} from "vue-router";
import { getCurrentInstance } from "vue";
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

    return {
      photos,
      onClickMoveDetailPage,
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
          <div class="text-overlay-wrap">
            <div class="text-overlay">
              <div class="text-middle">{{ photo.type }}</div>
              <div class="text-big">{{ photo.name }}</div>
              <div class="text-small">
                <b class="light">{{ photo.clientType }}. </b>
                <b class="bold">{{ photo.client }}</b>
              </div>
              <div class="text-small">
                <b class="light">Place. </b>
                <b class="bold">{{photo.place}}</b>
              </div>
              <div class="text-small">
                <b class="light">{{ photo.date === "" ? "" : `Date. `}}</b>
                <b class="bold">{{ photo.date === "" ? "unreleased" : `${photo.date}`}}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img src="@/assets/images/bottomLineLogo.png" style="width: 100%;">
      <div class="photo-flame">
        <img src="../assets/images/myPhoto.jpg">
      </div>
    </section>
  </main>
</template>

<style scoped>

</style>