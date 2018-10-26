import Vue from "vue";
import Vuex from "vuex";
import servers from "@/servers";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    servers
  }
});
