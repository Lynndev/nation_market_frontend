import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate'
import store from './store'
import 'nprogress/nprogress.css'
import moment from 'moment'
//Import Froala Editor 
import 'froala-editor/js/plugins.pkgd.min.js';
// Import Froala Editor css files.
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Import and use Vue Froala lib.
import VueFroala from 'vue-froala-wysiwyg'
Vue.use(VueFroala)

Vue.use(Vuelidate)

//moment package for date format
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MMM/YYYY')
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
