<template>
  <v-container fill-height style="height: calc(100vh - 58px);">
    <v-layout>
      <v-flex md12>
        <v-card>
          <v-card-title>{{$t('help.title')}}</v-card-title>
          <v-container grid-list-xl>
            <v-layout wrap>
              <v-flex xs12 md12>
                <span>{{$t('help.subtitle')}}</span>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex xs12 md6>
                <v-text-field
                  id="email"
                  :rules="helpRules.email"
                  v-model="contactForm.email"
                  name="email"
                  :label="$t('help.email')"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  id="company"
                  v-model="contactForm.company"
                  name="company"
                  :label="$t('help.company')"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex xs12 md12>
                <v-text-field
                  id="subject"
                  v-model="contactForm.subject"
                  :rules="helpRules.subject"
                  name="subject"
                  :label="$t('help.subject')"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex xs12 md12>
                <v-textarea
                  :rules="helpRules.message"
                  v-model="contactForm.message"
                  :label="$t('help.message')"
                  :row-height="24"
                  :rows="8"
                ></v-textarea>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout wrap>
              <v-spacer></v-spacer>
              <v-flex xs12 md1>
                <v-btn width="100%" color="primary">{{$t('help.send')}}</v-btn>
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
import { sendMessage } from "@/apis/login";

@Component
export default class Help extends Vue {
  contactForm = {
    email: "",
    company: "",
    subject: "",
    message: ""
  };

  get helpRules() {
    return {
      email: [(v: any) => !!v || this.$root.$i18n.t("help.emailReq")],
      subject: [(v: any) => !!v || this.$root.$i18n.t("help.subjReq")],
      message: [(v: any) => !!v || this.$root.$i18n.t("help.messReq")]
    };
  }

  send() {
    sendMessage(this.contactForm)
      .then((o: any) => {
        if (o.status === 200) {
        }
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
