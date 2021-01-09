const getGameId = _gameId => {
  return _gameId.toLowerCase();
};

const getGame = (_games, _gameId) => {
  if (_gameId === "ffffffffffffffff") {
    // DRAGON BALL FighterZ: 0100a250097f0000
    return {
      id: _gameId,
      name: "DBFighterZ or MH:Rise Demo"
    };
  }
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
