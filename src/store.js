import Vue from "vue";
import Vuex from "vuex";
import serversSource from "../public/data/servers.json";
import communitiesSource from "./data/communities.json";
import games from "./data/games.json";

Vue.use(Vuex);

const typeIsRust = o => o.type === "rust";
const typeIsNotRust = o => o.type !== "rust";

const serverMapping = ({
  ip,
  flag,
  port = 11451,
  platform = "switch",
  type = "node"
}) => {
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
};

const communityMapping = community => {
  return {
    ...community,
    highlight: community.discord === "zEMCu5n"
  };
};

export default new Vuex.Store({
  state: {
    servers: serversSource.filter(typeIsRust).map(serverMapping),
    communities: communitiesSource.map(communityMapping),
    games,
    monitors: undefined
  },

  actions: {
    fetchMonitors({ commit }) {
      return fetch("https://api.uptimerobot.com/v2/getMonitors", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body:
          "api_key=ur905839-35c881f5b6efeb47afd5bff9&format=json&all_time_uptime_ratio=1"
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          return commit("setMonitors", data.monitors);
        });
    }
  },

  mutations: {
    setMonitors(state, data) {
      return (state.monitors = data);
    },
    loadMoreServers(state) {
      serversSource
        .filter(typeIsNotRust)
        .map(serverMapping)
        .forEach(server => state.servers.push(server));
    }
  }
});
