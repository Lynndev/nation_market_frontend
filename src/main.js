import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";
import store from "./store";
import "nprogress/nprogress.css";
import moment from "moment";

//Import Froala Editor
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import VueFroala from "vue-froala-wysiwyg";
Vue.use(VueFroala);

//import vue auto scroll
import VueChatScroll from "vue-chat-scroll";
Vue.use(VueChatScroll);

Vue.use(Vuelidate);

//moment package for date format
Vue.filter("formatDateTime", function(value) {
  if (value) {
    return moment(value)
      .add(24, "hours")
      .format("LLL");
  }
});

//moment package for date format
Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("DD/MMM/YYYY");
  }
});

//thousand separator filter
Vue.filter("separateNum", function(value) {
  if (value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
