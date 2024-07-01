<script>

import {computed, nextTick, onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from 'vue-router';
import {deleteContent, getContent, updateContent} from "@/api/contents";
import Routes from "@/router/routes";

export default {
  name: "ContentsInfoView",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const projectId = route.params.projectId;

    const projectDiviSelect = ref(null);
    const projectTitleSelect = ref(null);
    const clientDiviSelect = ref(null);
    const clientNameSelect = ref(null);
    const projectPlaceSelect = ref(null);

    const content = ref("");
    const photoDate = ref("");
    const filledSrc = ref( []);
    const deleteImageId = ref([]);
    const addImageFile = ref([]);

    const fetchContent = async () => {
      try {
        const data = await getContent(projectId);
        content.value = data;
        photoDate.value = formatDateString(content.value.releaseDate);
        filledSrc.value = content.value.image.map(img => ({
          url: img.url,
          projectId: img.projectId,
          contentSeq: img.contentSeq
        }));
        initializeFilledSrc();
      } catch (error) {
        console.error('Error fetching contents:', error);
      }
    }
    onMounted(()=> {
      fetchContent();
    })

    const formatDateString = (date) => {
      if (!date) return "";
      const [year, month, day] = date.split("-");
      return `${year}.${month}.${day}`;
    };

    const parseDateString = (date) => {
      if (!date) return "";
      const [year, month, day] = date.split(".");
      return `${year}-${month}-${day}`;
    };

    const formattedDate = computed({
      get() {
        // 날짜를 yyyy.mm.dd에서 yyyy-mm-dd 형식으로 변환
        return parseDateString(photoDate.value);
      },
      set(value) {
        // 날짜를 yyyy-mm-dd에서 yyyy.mm.dd 형식으로 변환하여 dateString을 업데이트
        photoDate.value = formatDateString(value);
      }
    });

    watch(
        () => content.value.releaseDate,
        (newReleaseDate) => {
          photoDate.value = formatDateString(newReleaseDate);
        },
        { immediate: true }
    );

    const initializeFilledSrc = () => {
      while (filledSrc.value.length < 10) {
        filledSrc.value.push({ url: "", projectId: null, contentSeq: null });
      }
      filledSrc.value = filledSrc.value.slice(0, 10);
    };
    initializeFilledSrc();

    watch(
        () => content.value.image,
        (newSrc) => {
          if (newSrc) {
            filledSrc.value = newSrc.map(img => ({
              url: img.url,
              projectId: img.projectId,
              contentSeq: img.contentSeq
            })).slice(0, 10);
          } else {
            filledSrc.value = [];
          }
          initializeFilledSrc();
        },
        { immediate: true }
    );

    const onFileChange = (event, index) => {
      const file = event.target.files[0];
      addImageFile.value[index] = file;
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          filledSrc.value[index].url = e.target.result;
          filledSrc.value[index].projectId = filledSrc.value[index].projectId || null;
          filledSrc.value[index].contentSeq = filledSrc.value[index].contentSeq || null;
        };
        reader.readAsDataURL(file);
      }
    };

    const removeImage = (index) => {
      if (filledSrc.value[index].projectId) {
        deleteImageId.value.push({
          projectId: filledSrc.value[index].projectId,
          contentSeq: filledSrc.value[index].contentSeq,
        });
      }
      filledSrc.value[index] = { url: "", projectId: null, contentSeq: null };
      addImageFile.value[index] = "";
    };

    const onClickSaveContents = async () => {
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

      try {
        const response = await updateContent(content.value, deleteImageId.value, addImageFile.value);
        if (response) {
          alert(response);
          await router.push({
            name:Routes.AdminPage,
          });
        }
      } catch (error) {
        console.error('컨텐츠 수정 실패:', error);
      }

    }
    const onClickDeleteContents = async () => {
      if (confirm("정말로 삭제하시겠습니까?")) {
        try {
          const data = await deleteContent(projectId);
          if (data) {
            alert(data);
            await router.push({
              name:Routes.AdminPage,
            });
          }
        } catch (error) {
          console.error('컨텐츠 삭제 실패:', error);
        }
      }
    }
    return {
      projectDiviSelect,
      projectTitleSelect,
      clientDiviSelect,
      clientNameSelect,
      projectPlaceSelect,
      onClickSaveContents,
      onClickDeleteContents,
      formattedDate,
      onFileChange,
      filledSrc,
      removeImage,
      content,
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
            <input type="date" class="form-control form-control-sm" v-model="formattedDate">
          </div>
        </div>
        <div class="row mb-3">
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Image</label>
          <div class="col-sm-10">
            <div v-for="(image, index) in filledSrc" :key="index" class="mb-3">
              <!-- 파일 입력 필드 -->
              <input
                  class="form-control mb-2"
                  type="file"
                  accept="image/*"
                  @change="onFileChange($event, index)"
                  v-if="!image.url"
              >
              <!-- 기존 이미지 미리보기 -->
              <div v-if="image.url" class="mt-2">
                <img :src="image.url" alt="Preview" class="img-thumbnail" style="max-width: 200px;">
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
          <button @click="onClickSaveContents" class="contentsInfo-button">저장</button>
          <button @click="onClickDeleteContents" class="contentsInfo-button">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>