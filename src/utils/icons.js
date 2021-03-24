const IconsMap = _gameId => {
  switch (_gameId) {
    // Animal Crossing
    case "01006f8002326000":
      return [
        "blathers",
        "isabelle",
        "kk-slider",
        "timmy",
        "tom-nook",
        "tommy"
      ];
    // Mario Kart
    case "0100152000022000":
      return [
        "bowser-kart",
        "donkey-kart",
        "luigi-kart",
        "mario-kart",
        "peach-kart",
        "rosalina-kart",
        "toad-kart",
        "wario-kart",
        "yoshi-kart"
      ];
    // Monster Hunter
    case "0100c3800049c000":
    case "0100770008dd8000":
    case "0100e6400b1ea000":
    case "0100b04011742000":
      return ["felyne", "melynx"];
    // Pokémon
    case "010003f003a34000":
    case "0100187003a36000":
    case "0100abf008968000":
    case "01008db008c2C000":
      return ["red-cap"];
    default:
      return undefined;
  }
};

const getPlayerIcon = (_gameId, _playerName) => {
  let icons = IconsMap(_gameId);
  return icons && icons[_playerName.length % icons.length];
};

export { getPlayerIcon };
