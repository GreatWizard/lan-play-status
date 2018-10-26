import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import FlagIcon from "vue-flag-icon";

Vue.config.productionTip = false;

Vue.use(FlagIcon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
