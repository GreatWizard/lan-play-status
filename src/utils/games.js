const getGameId = (_gameId) => {
  return _gameId.toLowerCase()
}

const getGame = (_games, _gameId) => {
  return _games.find(({ id }) => id === _gameId)
}

const getGameName = (_game) => {
  return _game
    ? _game.region === undefined || _game.region === '' || _game.region === 'WLD'
      ? _game.name
      : `${_game.name} (${_game.region})`
    : _game.id
}

export { getGameId, getGame, getGameName }
