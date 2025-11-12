<template>
  <div class="card">
    <img :src="getIcon(`/assets/icons/${icon}.png`)" class="card__image" alt="" />
    <div class="card__content">
      <strong>{{ hostPlayerName }} ({{ room.nodeCount }}/{{ room.nodeCountMax }})</strong>
      <p>
        <component
          v-if="advertiseData !== undefined"
          v-bind:is="`room${room.contentId}`"
          :advertiseData="advertiseData"
        />
      </p>
      <p>
        <CopyButton :data="fullAddress" />
      </p>
      <p v-if="players.length > 0">Players: {{ players.join(', ') }}</p>
    </div>
  </div>
</template>

<script>
import CopyButton from '@/components/CopyButton.vue'
import room0100a3d008c5c000 from '@/components/rooms/room-0100a3d008c5c000.vue'
import room0100b04011742000 from '@/components/rooms/room-0100b04011742000.vue'
import room0100d71004694000 from '@/components/rooms/room-0100d71004694000.vue'
import room01005ee0036ec000 from '@/components/rooms/room-01005ee0036ec000.vue'
import room01006f8002326000 from '@/components/rooms/room-01006f8002326000.vue'
import room01008f6008c5e000 from '@/components/rooms/room-01008f6008c5e000.vue'
import { getFullAddress } from '@/utils/servers'
import { getHostPlayerName, getPlayers, getAdvertiseData } from '@/utils/rooms'
import { getPlayerIcon } from '@/utils/icons'

const icons = Object.entries(import.meta.glob('@/assets/icons/*.png', { eager: true }))

export default {
  components: {
    CopyButton,
    room0100a3d008c5c000,
    room0100b04011742000,
    room0100d71004694000,
    room01005ee0036ec000,
    room01006f8002326000,
    room01008f6008c5e000,
  },
  props: {
    server: Object,
    room: Object,
  },
  setup() {
    return {
      getIcon(path) {
        const imageEntry = icons.find(([key]) => key.endsWith(path))

        if (imageEntry) {
          return imageEntry[1].default
        }
      },
    }
  },
  computed: {
    fullAddress() {
      return getFullAddress(this.server)
    },
    hostPlayerName() {
      return getHostPlayerName(this.room)
    },
    players() {
      let players = getPlayers(this.room)
      players.shift(this.hostPlayerName)
      return players
    },
    icon() {
      return getPlayerIcon(this.room.contentId, this.room.hostPlayerName) || 'switch'
    },
    advertiseData() {
      return getAdvertiseData(this.room)
    },
  },
}
</script>
