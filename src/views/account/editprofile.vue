<template>
  <v-container fluid fill-height>
    <v-layout>
      <v-flex md12>
        <v-card>
          <v-card-title>{{$t('editProfile.title')}}</v-card-title>
          <v-container grid-list-xl>
            <v-layout wrap>
              <v-flex xs12 md6>
                <!-- <v-avatar color="grey lighten-4" size="50px">
                  <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar" />
                </v-avatar>-->
                <div class="avatar">
                  
                  <img :src="avatar_img == '' ? user.profile.avatar : avatar_img" style="width: 100%;height: 100%;border-radius: 50%;"/>
                  <div style="position : fixed; width: 100%, height:100%">
                    <input type="file" class="file-input" @change="onFileChanged"/>
                  </div>
                  
                </div>

                <b>{{ $t('editProfile.name') }}</b>
                <v-text-field
                  v-model="user.profile.name"
                  :placeholder="$t('editProfile.name')"
                  required
                ></v-text-field>
                <b>{{ $t('editProfile.lastname') }}</b>
                <v-text-field
                  v-model="user.profile.lastname"
                  :placeholder="$t('editProfile.lastname')"
                  required
                ></v-text-field>
                <b>{{ $t('editProfile.country') }}</b>
                <v-text-field
                  v-model="user.profile.country"
                  :placeholder="$t('editProfile.country')"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <b>{{ $t('editProfile.email') }}</b>
                <v-text-field
                  v-model="user.profile.email"
                  :placeholder="$t('editProfile.email')"
                  required
                ></v-text-field>
                <b>{{ $t('editProfile.website') }}</b>
                <v-text-field
                  v-model="user.profile.webAddress"
                  :placeholder="$t('editProfile.website')"
                  required
                ></v-text-field>
                <b>{{ $t('editProfile.birthday') }}</b>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="user.profile.birthDay"
                      :placeholder="$t('editProfile.birthday')"
                      readonly
                      required
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="user.profile.birthDay" type="date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">{{$t('common.cancel')}}</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">{{$t('common.ok')}}</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout wrap>
              <v-flex xs12 md11></v-flex>
              <v-flex xs12 md1>
                <v-btn width="100%" color="primary" @click="editProfileSave()">{{$t('common.save')}}</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import { updateUser, getUser , uploadAvatar} from "@/apis/datastore/user";
import { prototype } from "events";
import { parseJwt } from "@/utils/parse-jwt";


const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];

@Component({
  layout: "default",
  middleware: "authenticated",
  async asyncData(context) {
    let a = parseJwt(context.store.state.login.auth);
    if (typeof a.id === "string" && a.id !== "") {
      const { data } = await getUser(a.id);
      if (data.profile === null) data.profile = {};
      return { user: data };
    } else {
      return { user: {} };
    }
  }
})
export default class EditProfile extends Vue {
  profile = {
    isEdit: false
  };

  oldProfile = {};
  avatar_img = ''
  editProfile() {
    Object.assign(this.oldProfile, this.profile);
    this.profile.isEdit = true;
  }

  editProfileCancel() {
    Object.assign(this.profile, this.oldProfile);
    this.oldProfile = {};
    this.profile.isEdit = false;
  }
  onFileChanged (event) {
    var file = event.target.files[0]

    let data = new FormData()
    var avatar_name = 'avatar_' + new Date().getTime().toString()
    data.append('file',file);

    var obj = {
      file : data,
      documentId : new Date().getTime().toString(),
      folder : this.$store.state.login.userId,
      mask : 10
    }

    // data.append('documentId' , new Date().getTime().toString())
    // data.append('folder', this.$store.state.login.userId)
    // data.append('mask', '10')

      console.log(file)

      uploadAvatar(obj, this.$store.state.login.auth).then(result => {
        console.log(result)
      }).catch(error => {
        console.log(error)
      })

    let reader = new FileReader();
    var vm = this
    reader.onload = (event:any) => {
      this.avatar_img = event.target.result;
      
      

      // this._uploadService.upload(data).then(result => {
      //    if (result.status == 200) {
      //       this.setState({upload_url : result.data.url})
      //    }
      // }).catch(error => {
      //    console.log(error)
      // })
      //this.photos.push(this.img_file);
    }
    reader.readAsDataURL(file)
   
  }
  editProfileSave() {
    this.oldProfile = {};
    this.profile.isEdit = false;
    updateUser((<any>this).user)
      .then((o: any) => {
        //this.loading = false;
        //this.$router.push("/");
      })
      .catch((e: any) => {
        console.log(e.response.data);
        // this.$store.dispatch(StoreActions.StoreTopMessage, {
        //   visible: true,
        //   text: e.message,
        //   color: "error"
        // });
      });
  }
}
</script>
