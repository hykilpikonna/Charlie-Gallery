import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

// Use Element UI
import ElementUI from 'element-ui';
Vue.use(ElementUI, {locale: 'en-us'});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
