import Vue from "vue";
import Vuex from "vuex";
import servers from "@/servers";

Vue.use(Vuex);

const fetchWithTimeout = function(url, options, timeout = 20000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), timeout)
    )
  ]);
};

export default new Vuex.Store({
  state: {
    servers
  },
  mutations: {
    updateServer(state, { ip, status, data }) {
      let index = state.servers.findIndex(server => server.ip === ip);
      state.servers[index].status = status;
      state.servers[index].data = data;
    }
  },
  actions: {
    checkServer(context, serverIP) {
      var proxyUrl = "https://cors-anywhere.herokuapp.com/",
        targetUrl = `http://${serverIP}/info`;
      let url = `${proxyUrl}${targetUrl}`;
      return fetchWithTimeout(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("bad api");
          }
        })
        .then(data => {
          context.commit("updateServer", {
            ip: serverIP,
            status: 1,
            data
          });
        })
        .catch(() => {
          context.commit("updateServer", {
            ip: serverIP,
            status: -1,
            data: undefined
          });
        });
    }
  }
});
