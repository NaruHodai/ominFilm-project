<script>
import {computed, ref, nextTick} from "vue";
import {postContent} from "@/api/contents";
import Routes from "@/router/routes";
import {useRouter} from "vue-router";

export default {
  name: "AddContentsInfo",
  setup() {
    const router = useRouter();
    const content = ref({
      projectDivi:'',
      projectTitle:'',
      clientDivi:'',
      clientName:'',
      projectPlace:'',
      releaseDate:'',
      imageSrc:[],
      youtubeSrcFirst:'',
      youtubeSrcSecond:'',
      youtubeSrcThird:'',
      youtubeSrcFourth:'',
      youtubeSrcFifth:'',
    })
    const projectDiviSelect = ref(null);
    const projectTitleSelect = ref(null);
    const clientDiviSelect = ref(null);
    const clientNameSelect = ref(null);
    const projectPlaceSelect = ref(null);
    const imgSelect = ref([]);

    const formatDateString = (date) => {
      if (!date) return "";
      const parts = date.split("-");
      if (parts.length !== 3) return "";
      const [year, month, day] = parts;
      return `${year}.${month}.${day}`;
    };

    const filledFilledSrc = computed(() => {
      const filledSrc = content.value.imageSrc || [];
      return filledSrc.slice(0, 10).concat(Array(10 - filledSrc.length).fill(""));
    })

    const onFileChange = (event, index) => {
      const file = event.target.files[0];
      imgSelect.value[index] = file
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          // 업로드된 파일의 URL로 filledSrc의 해당 인덱스를 업데이트
          content.value.imageSrc[index] = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    const removeImage = (index) => {
      // 해당 인덱스의 이미지를 빈 문자열로 설정
      content.value.imageSrc[index] = "";
      imgSelect.value[index] = ""
    };

    const onClickAddContent = async () => {
        if (!content.value.projectDivi) {
          alert("Type을 선택해주세요.");
          nextTick(() => {
            // ref를 통해 DOM 요소에 접근
            if (projectDiviSelect.value && projectDiviSelect.value.focus) {
              projectDiviSelect.value.focus();
            }
          });
          return;
        }

      if (!content.value.projectTitle) {
        alert("Name을 선택해주세요.");
        nextTick(() => {
          // ref를 통해 DOM 요소에 접근
          if (projectTitleSelect.value && projectTitleSelect.value.focus) {
            projectTitleSelect.value.focus();
          }
        });
        return;
      }

      if (!content.value.clientDivi) {
        alert("ClientType을 선택해주세요.");
        nextTick(() => {
          // ref를 통해 DOM 요소에 접근
          if (clientDiviSelect.value && clientDiviSelect.value.focus) {
            clientDiviSelect.value.focus();
          }
        });
        return;
      }

      if (!content.value.clientName) {
        alert("Clent를 선택해주세요.");
        nextTick(() => {
          // ref를 통해 DOM 요소에 접근
          if (clientNameSelect.value && clientNameSelect.value.focus) {
            clientNameSelect.value.focus();
          }
        });
        return;
      }

      if (!content.value.projectPlace) {
        alert("Place를 선택해주세요.");
        nextTick(() => {
          // ref를 통해 DOM 요소에 접근
          if (projectPlaceSelect.value && projectPlaceSelect.value.focus) {
            projectPlaceSelect.value.focus();
          }
        });
        return;
      }

      content.value.releaseDate = formatDateString(content.value.releaseDate);

      if (imgSelect.value.length < 3) {
        alert("이미지를 3장이상 선택해주세요.");
        return;
      }

      try {
        const promise = await postContent(content.value, imgSelect.value);
        if (promise) {
          alert("추가가 완료되었습니다.");
          await router.push({
            name:Routes.AdminPage,
          });
        }
      } catch (error) {
        console.error('컨텐츠 추가 실패:', error);
      }
    }

    return {
      content,
      projectDiviSelect,
      projectTitleSelect,
      clientDiviSelect,
      clientNameSelect,
      projectPlaceSelect,
      onFileChange,
      filledFilledSrc,
      removeImage,
      onClickAddContent,
    };
  }
}
</script>

<template>
  <div class="admin-wrap">
    <div class="contentsInfo">
      <div class="contentsInfo-wrap row g-3">
        <div class="row mb-3">
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Type</label>
          <div class="col-sm-10">
            <select class="form-select form-select-sm" v-model="content.projectDivi" ref="projectDiviSelect" aria-label="Small select example">
              <option selected>Type</option>
              <option value="M/V">M/V</option>
              <option value="Live">Live</option>
              <option value="Brand">Brand</option>
              <option value="Contents">Contents</option>
              <option value="Wedding">Wedding</option>
              <option value="Interview">Interview</option>
              <option value="Interior">Interior</option>
              <option value="Product">Product</option>
              <option value="Sketch">Sketch</option>
            </select>
          </div>
        </div>
        <div class="row mb-3">
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Name</label>
          <div class="col-sm-10">
            <input class="form-control form-control-sm" v-model="content.projectTitle" ref="projectTitleSelect">
          </div>
        </div>
        <div class="row mb-3">
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">ClientType</label>
          <div class="col-sm-10">
            <select class="form-select form-select-sm" v-model="content.clientDivi" ref="clientDiviSelect" aria-label="Small select example">
              <option selected>ClientType</option>
              <option value="Artist">Artist</option>
              <option value="Band">Band</option>
              <option value="Client">Client</option>
            </select>
          </div>
        </div>
        <div class="row mb-3">
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Client</label>
          <div class="col-sm-10">
            <input class="form-control form-control-sm" v-model="content.clientName" ref="clientNameSelect">
          </div>
        </div>
        <div class="row mb-3">
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Place</label>
          <div class="col-sm-10">
            <input class="form-control form-control-sm" v-model="content.projectPlace" ref="projectPlaceSelect">
          </div>
        </div>
        <div class="row mb-3">
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Date</label>
          <div class="col-sm-10">
            <input type="date" class="form-control form-control-sm" v-model="content.releaseDate">
          </div>
        </div>
        <div class="row mb-3">
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Image</label>
          <div class="col-sm-10">
            <div v-for="(image, index) in filledFilledSrc" :key="index" class="mb-3">
              <!-- 파일 입력 필드 -->
              <input
                  class="form-control mb-2"
                  type="file"
                  accept="image/*"
                  @change="onFileChange($event, index)"
                  v-if="!image"
              >
              <!-- 기존 이미지 미리보기 -->
              <div v-if="image" class="mt-2">
                <img :src="image" alt="Preview" class="img-thumbnail" style="max-width: 200px;">
                <button @click="removeImage(index)" class="btn btn-sm btn-danger" style="margin-left: 5px;">X</button>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Youtube</label>
          <div class="col-sm-10">
            <div class="input-group col-sm-10">
              <span class="input-group-text" id="basic-addon3">https://www.youtube.com/embed/</span>
              <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4" v-model="content.youtubeSrcFirst">
            </div>
            <div class="input-group col-sm-10">
              <span class="input-group-text" id="basic-addon3">https://www.youtube.com/embed/</span>
              <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4" v-model="content.youtubeSrcSecond">
            </div>
            <div class="input-group col-sm-10">
              <span class="input-group-text" id="basic-addon3">https://www.youtube.com/embed/</span>
              <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4" v-model="content.youtubeSrcThird">
            </div>
            <div class="input-group col-sm-10">
              <span class="input-group-text" id="basic-addon3">https://www.youtube.com/embed/</span>
              <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4" v-model="content.youtubeSrcFourth">
            </div>
            <div class="input-group col-sm-10">
              <span class="input-group-text" id="basic-addon3">https://www.youtube.com/embed/</span>
              <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4" v-model="content.youtubeSrcFifth">
            </div>
          </div>
        </div>
        <div>
          <button class="contentsInfo-button" @click="onClickAddContent">추가</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>