import { defineStore } from 'pinia'

import lobbiesSource from '@/data/lobbies.json'
import gamesSource from '@/data/games.json'
import gamesSwitchOfwSource from '@/data/games-switch-ofw.json'
import gamesSwitchCfwSource from '@/data/games-switch-cfw.json'
import gamesPS4Source from '@/data/games-ps4.json'

import { getGameId, getGame, getGameName } from '@/utils/games'
import { sortByString } from '@/utils/sorts'

const lobbyMapping = (lobby) => {
  lobby.title = lobby.games
    .map((_gameId) => {
      let gameId = getGameId(_gameId)
      let game = getGame(gamesSource, gameId)
      return getGameName(game)
    })
    .sort()
    .join(', ')
  return lobby
}

let gamesSwitchCfw = gamesSwitchCfwSource.sort(sortByString('title'))
gamesSwitchCfw.push({ title: 'And so on...', asset: 'etc.jpg' })

let gamesPS4 = gamesPS4Source.sort(sortByString('title'))
gamesPS4.push({ title: 'And so on...', asset: 'etc.jpg' })

export const useGamesStore = defineStore('games', {
  state: () => ({
    games: gamesSource,
    gamesSwitchOfw: gamesSwitchOfwSource.sort(sortByString('title')),
    gamesSwitchCfw,
    gamesPS4,
    lobbies: lobbiesSource.map(lobbyMapping),
  }),
})
