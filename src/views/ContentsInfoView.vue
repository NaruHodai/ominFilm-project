<script>

export default {
  name: "ContentsInfoView",
  setup() {
    const onClickSaveContents = () => {
      console.log("저장");
    }
    return {
      onClickSaveContents,
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
            <select class="form-select form-select-sm" aria-label="Small select example">
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
            <input type="email" class="form-control form-control-sm" id="colFormLabelSm" placeholder="">
          </div>
        </div>
        <div class="row mb-3">
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">ClientType</label>
          <div class="col-sm-10">
            <select class="form-select form-select-sm" aria-label="Small select example">
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
            <input type="email" class="form-control form-control-sm" id="colFormLabelSm" placeholder="">
          </div>
        </div>
        <div class="row mb-3">
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Place</label>
          <div class="col-sm-10">
            <input type="email" class="form-control form-control-sm" id="colFormLabelSm" placeholder="">
          </div>
        </div>
        <div class="row mb-3">
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Date</label>
          <div class="col-sm-10">
            <input type="date" class="form-control form-control-sm" id="colFormLabelSm" placeholder="">
          </div>
        </div>
        <div class="row mb-3">
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Image</label>
          <div class="col-sm-10">
            <input class="form-control" type="file" id="formFile" accept="image/*">
            <input class="form-control" type="file" id="formFile" accept="image/*">
            <input class="form-control" type="file" id="formFile" accept="image/*">
            <input class="form-control" type="file" id="formFile" accept="image/*">
            <input class="form-control" type="file" id="formFile" accept="image/*">
            <input class="form-control" type="file" id="formFile" accept="image/*">
            <input class="form-control" type="file" id="formFile" accept="image/*">
            <input class="form-control" type="file" id="formFile" accept="image/*">
            <input class="form-control" type="file" id="formFile" accept="image/*">
            <input class="form-control" type="file" id="formFile" accept="image/*">
          </div>
        </div>
        <div class="row mb-3">
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Youtube</label>
          <div class="col-sm-10">
            <div class="input-group col-sm-10">
              <span class="input-group-text" id="basic-addon3">https://www.youtube.com/embed/</span>
              <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4">
            </div>
            <div class="input-group col-sm-10">
              <span class="input-group-text" id="basic-addon3">https://www.youtube.com/embed/</span>
              <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4">
            </div>
            <div class="input-group col-sm-10">
              <span class="input-group-text" id="basic-addon3">https://www.youtube.com/embed/</span>
              <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4">
            </div>
            <div class="input-group col-sm-10">
              <span class="input-group-text" id="basic-addon3">https://www.youtube.com/embed/</span>
              <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4">
            </div>
            <div class="input-group col-sm-10">
              <span class="input-group-text" id="basic-addon3">https://www.youtube.com/embed/</span>
              <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4">
            </div>
          </div>
        </div>
        <button @click="onClickSaveContents" class="save-button">저장</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>