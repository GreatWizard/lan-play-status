<template>
  <div class="cards">
    <LobbyRoom
      v-for="room in data.rooms"
      :server="server"
      :room="room"
      :key="
        `${server.ip}:${server.port}:${room.hostPlayerName}:${room.contentId}`
      "
    />
  </div>
</template>

<script>
import LobbyRoom from "@/components/lobby/Room.vue";

const queryRoom = `{room{contentId hostPlayerName nodeCount nodeCountMax advertiseData nodes{playerName}}}`;

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
    LobbyRoom
  },
  data: () => {
    return {
      timerServer: undefined,
      data: {}
    };
  },
  props: {
    server: Object,
    gameIds: String
  },
  methods: {
    async gqlRefresh() {
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
          roomsData = roomsData.data.room.filter(room =>
            this.gameIds.includes(room.contentId)
          );
        } catch (e) {
          roomsData = [];
        }

        this.data = {
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
        this.data = {};
      }
    }
  },
  created() {
    if (this.server.type === "rust") {
      this.gqlRefresh();
    }
  },
  beforeDestroy() {
    clearInterval(this.timerServer);
  }
};
</script>
