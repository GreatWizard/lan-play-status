<template>
  <span class="contents" v-if="server.status >= 0">
    <tr :class="trClasses">
      <td>
        <span class="fullAddress">{{ fullAddress }}</span>
        <button class="button margin-left hide--on-mobile" data-tooltip="Copy">
          <img
            alt="Copy"
            class="icon"
            src="../assets/copy.png"
            data-copy-selector=".fullAddress"
            v-on:click="copy"
          />
        </button>
      </td>
      <td :data-tooltip="infos">
        <span v-if="server.data.active >= 0 && server.data.idle >= 0">
          <span v-if="server.data.active >= 0" class="inline-block--on-mobile">
            {{ server.data.active }}
            <img alt="Active users" class="icon" src="../assets/active.png" />
          </span>
          <span class="hide--on-mobile"> / </span>
          <span v-if="server.data.idle >= 0" class="inline-block--on-mobile">
            {{ server.data.idle }}
            <img alt="Idle users" class="icon" src="../assets/idle.png" />
          </span>
        </span>
        <span v-else>
          <span v-if="server.data.online >= 0">
            {{ server.data.online }}
            <img alt="Online users" class="icon" src="../assets/online.png" />
          </span>
        </span>
      </td>
      <td class="hide--on-mobile" :data-tooltip="country">
        <flag :iso="server.flag" :squared="false" />
      </td>
      <CellIcon class="hide--on-mobile" :platform="server.platform" />
      <td>
        <span v-if="server.ping >= 0">
          {{ server.ping }}<span class="hide--on-mobile"> ms</span>
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
    <tr v-if="server.type === 'rust' && server.data.rooms.length > 0">
      <td colspan="6">
        <Room
          v-for="room in server.data.rooms"
          :room="room"
          :key="`${room.hostPlayerName}:${room.contentId}`"
        />
      </td>
    </tr>
  </span>
</template>

<script>
import CellIcon from "@/components/CellIcon.vue";
import Room from "@/components/Room.vue";

const queryRoom = `{room{contentId hostPlayerName nodeCount nodeCountMax}}`;

const subscriptionGql = `{"id":"1","type":"start","payload":{"variables":{},"extensions":{},"operationName":null,"query":"subscription{serverInfo{online idle version}}"}}`;
const closeGql = `{"id":"1","type":"stop"}`;

const fetchWithTimeout = function(url, options, timeout = 20000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), timeout)
    )
  ]);
};

const gqlPing = (server, delay = 0, timeout = 20000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("timeout")), timeout);
    let url = `${location.protocol === "https:" ? "wss" : "ws"}://${server}`;
    const ws = new WebSocket(url, "graphql-ws");
    let timeoutId = undefined;
    let lastTime = undefined;
    const doPing = () => {
      ws.send(subscriptionGql);
      lastTime = Date.now();
    };
    ws.onmessage = e => {
      const data = JSON.parse(e.data);
      if (data.type === "data" && data.id === "1") {
        let ping = Date.now() - lastTime;
        resolve({ data: data.payload.data.serverInfo, ping });
        ws.send(closeGql);
        ws.close();
      }
    };
    ws.onclose = () => {
      timeoutId && clearTimeout(timeoutId);
    };
    ws.onerror = e => {
      reject(e);
    };
    ws.onopen = () => {
      ws.send(`{"type":"connection_init","payload":{}}`);
      timeoutId = setTimeout(doPing, delay);
    };
  });
};

export default {
  components: {
    CellIcon,
    Room
  },
  data: () => {
    return {
      timerServer: undefined
    };
  },
  props: {
    server: Object,
    monitors: Array
  },
  computed: {
    fullAddress() {
      return `${this.server.ip}:${this.server.port}`;
    },
    infos() {
      let infos = `Server type: ${this.server.type}`;
      if (this.server.data.version) {
        infos = `${infos}
(v${this.server.data.version})`;
      }
      return infos;
    },
    country() {
      return this.server.flag.toUpperCase();
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
    }
  },
  methods: {
    copy(event) {
      let el = this.$el.querySelector(
        event.target.getAttribute("data-copy-selector")
      );
      let range = document.createRange();
      range.selectNode(el);
      window.getSelection().addRange(range);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
    },
    async gqlRefresh() {
      let ctx = this;

      let { data, ping } = await gqlPing(`${ctx.server.ip}:${ctx.server.port}`);

      try {
        let roomsData;
        try {
          let response = await fetchWithTimeout(
            `${location.protocol}//${ctx.server.ip}:${ctx.server.port}`,
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
        } catch (e) {
          roomsData = [];
        }

        ctx.server.ping = ping;
        ctx.server.data = {
          active: data.online - data.idle,
          ...data,
          rooms: roomsData
        };

        if (ctx.server.status === undefined) {
          ctx.server.status = 0;
          clearInterval(ctx.timerServer);
          ctx.timerServer = setInterval(ctx.gqlRefresh, 5000);
        }
      } catch (e) {
        ctx.server.status = undefined;
        clearInterval(ctx.timerServer);
        ctx.timerServer = setInterval(ctx.gqlRefresh, 300000);
        ctx.server.ping = 0;
        ctx.server.data = {};
      }
    },
    async restRefresh() {
      let ctx = this;
      let url = `${this.server.ip}:${this.server.port}`;
      if (ctx.server.status === -1 || ctx.server.status === 1) {
        url = `/proxy.php?address=${url}`;
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

        if (ctx.server.status === undefined || ctx.server.status === 0) {
          ctx.server.ping = Math.ceil((Date.now() - lastTime) * 0.3);
        } else {
          ctx.server.ping = undefined;
        }

        const data = await response.json();

        if (ctx.server.status === undefined) {
          ctx.server.status = 0;
          clearInterval(this.timerServer);
          this.timerServer = setInterval(this.restRefresh, 5000);
        }

        if (ctx.server.status === -1) {
          ctx.server.status = 1;
          clearInterval(this.timerServer);
          this.timerServer = setInterval(this.restRefresh, 30000);
        }

        if (this.server.type === "node") {
          ctx.server.data = {
            ...data
          };
        } else if (this.server.type === "rust") {
          ctx.server.data = {
            active: data.online - data.idle,
            ...data
          };
        } else if (this.server.type === "dotnet") {
          ctx.server.data = { online: data.clientCount };
        }
      } catch (e) {
        if (ctx.server.status === undefined) {
          // Maybe CORS issue, test with proxy
          ctx.server.status = -1;
          this.restRefresh();
        } else {
          // timeout
          ctx.server.status = undefined;
          clearInterval(this.timerServer);
          this.timerServer = setInterval(this.restRefresh, 300000);
        }
        ctx.server.ping = 0;
        ctx.server.data = {};
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
  beforeDestroy() {
    clearInterval(this.timerServer);
  }
};
</script>

<style lang="scss">
.contents {
  display: contents;
}
.margin-left {
  margin-left: 4px;
}
.button {
  padding: 4px;
  cursor: pointer;
  outline: none;
  border: none;
  background-color: #ffffff00;
  border-radius: 4px;

  &:hover {
    background-color: #52525220;
  }

  &:active {
    background-color: #52525240;
    transform: translateY(1px);
  }
}
@media screen and (max-width: 768px) {
  .inline-block--on-mobile {
    display: block;
  }
}
</style>
