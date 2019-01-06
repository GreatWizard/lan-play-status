<template>
  <tr :class="trClasses" v-if="server.status >= 0">
    <td>
      <span class="fullAddress">{{ fullAddress }}</span>
      <button class="button margin-left" data-tooltip="Copy">
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
      {{ server.data.online }}
      <img alt="Users" class="icon" src="../assets/users.png" />
    </td>
    <td :data-tooltip="country">
      <flag :iso="server.flag" :squared="false" />
    </td>
    <CellIcon :platform="server.platform" />
    <td>
      <span v-if="server.ping >= 0">{{ server.ping }} ms</span
      ><span v-else>n/a</span>
    </td>
  </tr>
</template>

<script>
import CellIcon from "@/components/CellIcon.vue";

const fetchWithTimeout = function(url, options, timeout = 20000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), timeout)
    )
  ]);
};

export default {
  components: {
    CellIcon
  },
  props: {
    server: Object,
    timerServer: Object,
    timerPing: Object
  },
  computed: {
    fullAddress() {
      return `${this.server.ip}:${this.server.port}`;
    },
    infos() {
      return `Version: ${this.server.data.version}`;
    },
    country() {
      return this.server.flag.toUpperCase();
    },
    trClasses() {
      return this.server.highlight ? "highlight" : "";
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
    refreshServer() {
      let ctx = this;
      let url = `/proxy.php?address=${this.server.ip}&port=${this.server.port}`;
      return fetchWithTimeout(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("bad api");
          }
        })
        .then(data => {
          if (ctx.server.status !== 1) {
            clearInterval(this.timerServer);
            this.timerServer = setInterval(this.refreshServer, 120000);
            clearInterval(this.timerPing);
            this.timerPing = setInterval(this.refreshPing, 5000);
          }
          ctx.server.status = 1;
          ctx.server.data = data;
        })
        .catch(() => {
          if (ctx.server.status !== -1) {
            clearInterval(this.timerServer);
            this.timerServer = setInterval(this.refreshServer, 300000);
          }
          ctx.server.status = -1;
          ctx.server.data = undefined;
        });
    },
    refreshPing() {
      let ctx = this;
      let started = new Date().getTime();
      fetchWithTimeout(`//${this.server.ip}:${this.server.port}/info`)
        .then(response => {
          if (response.ok) {
            ctx.server.ping = Math.ceil((new Date().getTime() - started) * 0.3);
            return response.json();
          } else {
            throw new Error("bad api");
          }
        })
        .then(data => {
          if (ctx.server.status === 1) {
            clearInterval(this.timerServer);
          }
          ctx.server.status = 2;
          ctx.server.data = data;
        })
        .catch(() => {
          if (ctx.server.status === 2) {
            clearInterval(this.timerServer);
            this.timerServer = setInterval(this.refreshServer, 300000);
          }
          ctx.server.ping = -1;
          clearInterval(ctx.timerPing);
        });
    }
  },
  created() {
    this.refreshServer();
  },
  beforeDestroy() {
    clearInterval(this.timerServer);
    clearInterval(this.timerPing);
  }
};
</script>

<style lang="scss">
tr.highlight {
  td {
    font-weight: bold;
  }
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
</style>
