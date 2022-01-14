<template>
  <v-container fluid fill-height>
    <v-layout>
      <v-flex>
        <v-card class="elevation-0">
          <v-card-title>Home</v-card-title>
          <v-card-text>
            <p>Home</p>
            <p>
              Link demo =>
              <nuxt-link
                :to="{ name: 'restaurant', params: { lang: $router.currentRoute.params.lang, id: '92a31b45-8b2a-4593-abcc-9f4a3ad11899'}}"
              >Edge of</nuxt-link>
            </p>
            <no-ssr>
              <div
                id="my-strictly-unique-vue-upload-multiple-image"
                style="display: flex; justify-content: center;"
              >
                <vue-upload-multiple-image
                  @upload-success="uploadImageSuccess"
                  @before-remove="beforeRemove"
                  @edit-image="editImage"
                  :data-images="images"
                  idUpload="myIdUpload"
                  editUpload="myIdEdit"
                ></vue-upload-multiple-image>
              </div>
            </no-ssr>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import axios from "axios";

@Component({
  layout: "default"
})
export default class Main extends Vue {
  images = [];
  uploadImageSuccess(formData, index, fileList) {
    console.log("data", formData, index, fileList);
    // Upload image api
    // axios.post('http://your-url-upload', formData).then(response => {
    //   console.log(response)
    // })
  }
  beforeRemove(index, done, fileList) {
    console.log("index", index, fileList);
    var r = confirm("remove image");
    if (r == true) {
      done();
    } else {
    }
  }
  editImage(formData, index, fileList) {
    console.log("edit data", formData, index, fileList);
  }
}
</script>
