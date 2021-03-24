const getGameId = _gameId => {
  return _gameId.toLowerCase();
};

const getGame = (_games, _gameId, _advertiseData = "") => {
  let gameId = _gameId;
  if (gameId === "ffffffffffffffff") {
    let data = _advertiseData.split("000000000400");
    if (data.length === 3 || data.length === 4) {
      // MONSTER HUNTER RISE
      gameId = "0100b04011742000";
    } else {
      // DRAGON BALL FighterZ
      gameId = "0100a250097f0000";
    }
  }
  return _games.find(({ id }) => id === gameId);
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
