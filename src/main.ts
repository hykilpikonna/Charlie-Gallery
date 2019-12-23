import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

// Use Element UI
import ElementUI from 'element-ui';
Vue.use(ElementUI, {locale: 'en-us'});

// Use picture-swipe
const VuePictureSwipe = require('vue-picture-swipe');
Vue.component('vue-picture-swipe', VuePictureSwipe);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
