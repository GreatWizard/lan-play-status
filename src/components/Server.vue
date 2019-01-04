<template>
  <tr :class="trClasses" v-if="checkOnline.status >= 0">
    <td>
      <span class="fullAddress">{{fullAddress}}</span>
      <button class="button margin-left" data-tooltip="Copy">
        <img alt="Copy" class="icon" src="../assets/copy.png" data-copy-selector=".fullAddress" v-on:click="copy">
      </button>
    </td>
    <td :data-tooltip="infos">
      {{checkOnline.data.online}}
      <img alt="Users" class="icon" src="../assets/users.png">
    </td>
    <td :data-tooltip="country">
      <flag :iso="server.flag" :squared="false" />
    </td>
    <CellIcon :platform="server.platform" />
    <td>
      <span v-if="ping > 0">{{ping}} ms</span>
      <span v-else>n/a</span>
    </td>
  </tr>
</template>

<script>
import CellIcon from "@/components/CellIcon.vue";

export default {
  components: {
    CellIcon
  },
  props: {
    server: Object,
    ping: Number
  },
  computed: {
    checkOnline() {
      this.$store.dispatch("checkServer", this.server.ip, this.server.port);
      return this.server;
    },
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
    }
  },
  created() {
    let ctx = this;
    ctx.ping = 0;
    let started = new Date().getTime();
    fetch(`//${this.server.ip}:${this.server.port}/info`).then(() => {
      ctx.ping = Math.ceil((new Date().getTime() - started) * 0.3);
    });
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
