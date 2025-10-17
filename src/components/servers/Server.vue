<template>
  <span class="contents" v-if="status >= 0">
    <tr :class="trClasses">
      <td>
        <CopyButton :data="fullAddress" />
      </td>
      <td :data-tooltip="infos">
        <span v-if="data.active !== undefined && data.idle !== undefined">
          <span class="inline-block--on-mobile">
            {{ data.active }}
            <img
              alt="Active users"
              class="icon"
              :src="require(`@/assets/icons/active.png`)"
            />
          </span>
          <span class="hide--on-mobile"> / </span>
          <span class="inline-block--on-mobile">
            {{ data.idle }}
            <img
              alt="Idle users"
              class="icon"
              :src="require(`@/assets/icons/idle.png`)"
            />
          </span>
        </span>
        <span v-else>
          <span>
            {{ data.online }}
            <img
              alt="Online users"
              class="icon"
              :src="require(`@/assets/icons/online.png`)"
            />
          </span>
        </span>
      </td>
      <td class="hide--on-mobile" :data-tooltip="country">
        <country-flag :code="server.flag" class="icon" />
      </td>
      <td>
        <span v-if="ping >= 0">
          {{ ping }}<span class="hide--on-mobile"> ms</span>
        </span>
        <span v-else>n/a</span>
      </td>
      <td>
        <span v-if="uptime">
          {{ uptime }}<span class="hide--on-mobile">%</span>
        </span>
        <span v-else>n/a</span>
      </td>
    </tr>
    <tr v-if="server.type === 'rust' && data.rooms.length > 0">
      <td colspan="6">
        <Room
          v-for="room in data.rooms"
          :room="room"
          :key="
            `${server.ip}:${server.port}:${room.hostPlayerName}:${room.contentId}`
          "
        />
      </td>
    </tr>
  </span>
</template>

<style scoped lang="scss">
.contents {
  display: contents;
}
</style>

<script>
import CopyButton from "@/components/CopyButton.vue";
import Room from "@/components/servers/Room.vue";
import CountryFlag from "@/components/CountryFlag.vue";
import { sanitizeData } from "@/utils/rooms";
import { getFullAddress } from "@/utils/servers";
import { fetchWithTimeout } from "@/utils/fetch";
import { gqlRequestAndPing } from "@/utils/graphql";
import { queryRoom, subscriptionGql } from "@/queries";

export default {
  components: {
    CopyButton,
    Room,
    CountryFlag
  },
  data() {
    return {
      games: this.$store.state.games,
      timerServer: undefined,
      status: undefined,
      ping: undefined,
      data: undefined
    };
  },
  props: {
    server: Object,
    monitors: Array
  },
  computed: {
    fullAddress() {
      return getFullAddress(this.server);
    },
    infos() {
      let infos = "";
      if (this.data.active !== undefined && this.data.idle !== undefined) {
        infos = `${this.data.active} active user${
          this.data.active > 1 ? "s" : ""
        } and ${this.data.idle} idle user${this.data.idle > 1 ? "s" : ""}`;
      } else {
        infos = `${this.data.online} user${this.data.online > 1 ? "s" : ""}`;
      }
      if (this.server.games?.length > 0) {
        infos += `\n${this.server.games
          .map(
            gameId =>
              this.games.find(({ id }) => id === gameId.toLowerCase()).name
          )
          .filter((v, i, l) => l.indexOf(v) === i)
          .join(", ")}`;
      }
      if (this.server.comment) {
        infos += `\n${this.server.comment}`;
      }
      return infos;
    },
    country() {
      return this.$t(`countries.${this.server.flag.toLowerCase()}`);
    },
    trClasses() {
      return this.server.highlight ? "highlight" : "";
    },
    uptime() {
      let monitor =
        this.monitors &&
        this.monitors.find(
          monitor =>
            monitor.friendly_name === `${this.server.ip}:${this.server.port}`
        );
      if (monitor && monitor.all_time_uptime_ratio) {
        return `${Number.parseInt(monitor.all_time_uptime_ratio)}`;
      }
      return undefined;
    },
    platform() {
      if (
        this.server.platform === "ps4" ||
        this.server.platform === "ps5" ||
        this.server.platform === "playstation"
      ) {
        return "PlayStation";
      } else if (this.server.platform === "switch") {
        return "Switch";
      }
      return undefined;
    }
  },
  methods: {
    async gqlRefresh() {
      let { data, ping } = await gqlRequestAndPing(
        `${this.server.ip}:${this.server.port}`,
        subscriptionGql
      );

      try {
        let roomsData;
        try {
          let response = await fetchWithTimeout(
            `${location.protocol}//${this.server.ip}:${this.server.port}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ query: queryRoom })
            }
          );
          roomsData = await response.json();
          roomsData = roomsData.data.room;
          roomsData.map(room => sanitizeData(room));
        } catch (e) {
          roomsData = [];
        }

        this.ping = ping;
        this.data = {
          active: data.serverInfo.online - data.serverInfo.idle,
          ...data.serverInfo,
          rooms: roomsData
        };

        if (this.status === undefined) {
          this.status = 0;
          clearInterval(this.timerServer);
          this.timerServer = setInterval(this.gqlRefresh, 5000);
        }
      } catch (e) {
        this.status = undefined;
        clearInterval(this.timerServer);
        this.timerServer = setInterval(this.gqlRefresh, 300000);
        this.ping = 0;
        this.data = {};
      }
    },
    async restRefresh() {
      let url = `${this.server.ip}:${this.server.port}`;
      if (this.status === -1 || this.status === 1) {
        url = `http://lanplaycuj.cluster021.hosting.ovh.net/proxy.php?address=${url}`;
      } else {
        url = `//${url}`;
      }
      if (this.server.type === "node" || this.server.type === "rust") {
        url = `${url}/info`;
      }
      let lastTime = Date.now();
      try {
        const response = await fetchWithTimeout(url);
        if (!response.ok) {
          throw new Error(response);
        }

        if (this.status === undefined || this.status === 0) {
          this.ping = Math.ceil((Date.now() - lastTime) * 0.3);
        } else {
          this.ping = undefined;
        }

        const data = await response.json();

        if (this.status === undefined) {
          this.status = 0;
          clearInterval(this.timerServer);
          this.timerServer = setInterval(this.restRefresh, 5000);
        }

        if (this.status === -1) {
          this.status = 1;
          clearInterval(this.timerServer);
          this.timerServer = setInterval(this.restRefresh, 30000);
        }

        if (this.server.type === "node") {
          this.data = {
            ...data
          };
        } else if (this.server.type === "rust") {
          this.data = {
            active: data.online - data.idle,
            ...data
          };
        } else if (this.server.type === "dotnet") {
          this.data = { online: data.clientCount };
        }
      } catch (e) {
        if (this.status === undefined) {
          // Maybe CORS issue, test with proxy
          this.status = -1;
          this.restRefresh();
        } else {
          // timeout
          this.status = undefined;
          clearInterval(this.timerServer);
          this.timerServer = setInterval(this.restRefresh, 300000);
        }
        this.ping = 0;
        this.data = {};
      }
    }
  },
  created() {
    if (this.server.type === "rust") {
      this.gqlRefresh();
    } else {
      this.restRefresh();
    }
  },
  beforeUnmount() {
    clearInterval(this.timerServer);
  }
};
</script>
