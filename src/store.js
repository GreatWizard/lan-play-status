import Vue from "vue";
import Vuex from "vuex";
import serversSource from "../public/data/servers.json";

Vue.use(Vuex);

const servers = serversSource.map(
  ({ ip, flag, port = 11451, platform = "switch", type = "node" }) => {
    return {
      ip,
      port,
      flag,
      platform,
      type,
      status: undefined,
      ping: undefined,
      data: undefined,
      highlight: ip === "switch.lan-play.com"
    };
  }
);

export default new Vuex.Store({
  state: {
    servers
  }
});
