const getGameId = _gameId => {
  let gameId = _gameId.toLowerCase();
  if (
    // Fix for DRAGON BALL FighterZ
    gameId === "ffffffffffffffff"
  ) {
    gameId = "0100a250097f0000";
  }
  return gameId;
};

const getGame = (_games, _gameId) => {
  return _games.find(({ id }) => id === _gameId);
};

const getGameName = _game => {
  return _game
    ? _game.region === undefined ||
      _game.region === "" ||
      _game.region === "WLD"
      ? _game.name
      : `${_game.name} (${_game.region})`
    : _game.id;
};

export { getGameId, getGame, getGameName };
