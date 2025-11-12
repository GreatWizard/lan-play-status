<template>
  <h2>{{ $t('communities.title') }}</h2>
  <table>
    <thead>
      <tr>
        <th>{{ $t('communities.table.name') }}</th>
        <th>{{ $t('communities.table.games') }}</th>
        <th>{{ $t('communities.table.languages') }}</th>
        <th>{{ $t('communities.table.links') }}</th>
      </tr>
    </thead>
    <tbody>
      <CommunityItem
        v-for="community in this.communitiesStore.communities"
        :community="community"
        :key="`${community.discord}${community.whatsapp}`"
      />
    </tbody>
  </table>
  <em class="hide--on-mobile">
    {{ $t('communities.message') }}
  </em>
</template>

<script>
import CommunityItem from '@/components/communities/CommunityItem.vue'
import { useCommunitiesStore } from '@/stores/communities'

export default {
  setup() {
    return { communitiesStore: useCommunitiesStore() }
  },
  components: {
    CommunityItem,
  },
}
</script>
