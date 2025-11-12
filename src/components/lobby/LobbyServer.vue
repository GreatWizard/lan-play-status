<template>
  <LobbyRoom
    v-for="room in data.rooms"
    :server="server"
    :room="room"
    :key="`${server.ip}:${server.port}:${room.hostPlayerName}:${room.contentId}`"
  />
</template>

<script>
import LobbyRoom from '@/components/lobby/LobbyRoom.vue'
import { sanitizeData } from '@/utils/rooms'
import { fetchWithTimeout } from '@/utils/fetch'
import { queryRoom } from '@/queries'

export default {
  components: {
    LobbyRoom,
  },
  data() {
    return {
      timerServer: undefined,
      data: {},
    }
  },
  props: {
    server: Object,
    gameIds: Array,
  },
  methods: {
    async gqlRefresh() {
      try {
        let roomsData
        try {
          let response = await fetchWithTimeout(
            `${location.protocol}//${this.server.ip}:${this.server.port}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ query: queryRoom }),
            },
          )
          roomsData = await response.json()
          roomsData = roomsData.data.room.filter((room) => {
            room = sanitizeData(room)
            return this.gameIds.includes(room.contentId)
          })
        } catch (e) {
          roomsData = []
        }

        this.data = {
          rooms: roomsData,
        }

        if (this.status === undefined) {
          this.status = 0
          clearInterval(this.timerServer)
          this.timerServer = setInterval(this.gqlRefresh, 5000)
        }
      } catch (e) {
        this.status = undefined
        clearInterval(this.timerServer)
        this.timerServer = setInterval(this.gqlRefresh, 300000)
        this.data = {}
      }
    },
  },
  created() {
    if (this.server.type === 'rust') {
      this.gqlRefresh()
    }
  },
  beforeUnmount() {
    clearInterval(this.timerServer)
  },
}
</script>
