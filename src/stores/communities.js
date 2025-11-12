import { defineStore } from 'pinia'

import communitiesSource from '@/data/communities.json'

const communityMapping = (community) => {
  return {
    ...community,
    highlight: community.discord === 'zEMCu5n',
  }
}

export const useCommunitiesStore = defineStore('communities', {
  state: () => ({
    communities: communitiesSource.map(communityMapping),
  }),
})
