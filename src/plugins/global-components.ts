import Vue from 'vue'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import AppSectionLoader from "@/components/global/AppSectionLoader.vue";
import DeleteConfirmationDialog from "@/components/global/DeleteConfirmationDialog.vue";
import SectionTooltip from "@/components/global/SectionTooltip.vue"

Vue.component('app-section-loader', AppSectionLoader);
Vue.component('delete-confirmation-dialog', DeleteConfirmationDialog);
Vue.use(PerfectScrollbar);
Vue.component('section-tooltip', SectionTooltip);