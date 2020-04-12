import Vue from "vue";
import Vuex from "vuex";
import serversSource from "../public/data/servers.json";
import communitiesSource from "../public/data/communities.json";
import games from "../public/data/games.json";

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

const communities = communitiesSource.map(community => {
  return {
    ...community,
    highlight: community.discord === "zEMCu5n"
  };
});

export default new Vuex.Store({
  state: {
    servers,
    communities,
    games
  }
});
