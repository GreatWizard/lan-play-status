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
    case "0100559011740000":
      return ["felyne", "melynx"];
    // Pokémon
    case "010003f003a34000":
    case "0100187003a36000":
    case "0100abf008968000":
    case "01008db008c2C000":
      return ["red-cap"];
    // Super Smash Bros. Ultimate
    case "01006a800016e000":
      return [
        "banjokazooie-ssbu",
        "bayonetta-ssbu",
        "bowser-ssbu",
        "bowserjr-ssbu",
        "byleth-ssbu",
        "captainfalcon-ssbu",
        // "charizard-ssbu",
        "chrom-ssbu",
        "cloud-ssbu",
        "corrin-ssbu",
        "daisy-ssbu",
        "darkpit-ssbu",
        "darksamus-ssbu",
        "diddykong-ssbu",
        "donkeykong-ssbu",
        "drmario-ssbu",
        "duckhunt-ssbu",
        "falco-ssbu",
        "fox-ssbu",
        "ganondorf-ssbu",
        "greninja-ssbu",
        "hero-ssbu",
        "iceclimbers-ssbu",
        "ike-ssbu",
        "incineroar-ssbu",
        "inkling-ssbu",
        "isabelle-ssbu",
        // "ivysaur-ssbu",
        "jigglypuff-ssbu",
        "joker-ssbu",
        "ken-ssbu",
        "kingdedede-ssbu",
        "kingkrool-ssbu",
        "kirby-ssbu",
        "link-ssbu",
        "littlemac-ssbu",
        "lucario-ssbu",
        "lucas-ssbu",
        "lucina-ssbu",
        "luigi-ssbu",
        "mario-ssbu",
        "marth-ssbu",
        "megaman-ssbu",
        "metaknight-ssbu",
        "mewtwo-ssbu",
        "miifighter-ssbu",
        // "miigunner-ssbu",
        // "miiswordfighter-ssbu",
        "minmin-ssbu",
        "mrgamewatch-ssbu",
        // "mythra-ssbu",
        "ness-ssbu",
        "olimar-ssbu",
        "pac-man-ssbu",
        "palutena-ssbu",
        "peach-ssbu",
        "pichu-ssbu",
        "pikachu-ssbu",
        "piranhaplant-ssbu",
        "pit-ssbu",
        "pokemontrainer-ssbu",
        "pyra-ssbu",
        "richter-ssbu",
        "ridley-ssbu",
        "rob-ssbu",
        "robin-ssbu",
        "rosalina-ssbu",
        "roy-ssbu",
        "ryu-ssbu",
        "samus-ssbu",
        "sephiroth-ssbu",
        "sheik-ssbu",
        "shulk-ssbu",
        "simon-ssbu",
        "snake-ssbu",
        "sonic-ssbu",
        // "squirtle-ssbu",
        "steve-ssbu",
        "terry-ssbu",
        "toonlink-ssbu",
        "villager-ssbu",
        "wario-ssbu",
        "wiifittrainer-ssbu",
        "wolf-ssbu",
        "yoshi-ssbu",
        "younglink-ssbu",
        "zelda-ssbu",
        "zerosuitsamus-ssbu"
      ];
    // Luigi's Mansion
    case "0100dca0064a6000":
      return ["luigi-mansion", "boo"];
    // Super Mario
    case "010028600ebda000":
      return ["mario", "luigi", "peach", "rosalina", "toad", "yoshi", "bowser"];
    // Splatoon
    case "0100f8f0000a2000":
    case "01003c700009c000":
    case "01003bc0000a0000":
      return [
        "inkling-boy",
        "inkling-girl",
        "inkling-squid",
        "marie",
        "callie"
      ];
    default:
      return undefined;
  }
};

const getPlayerIcon = (_gameId, _playerName) => {
  let icons = IconsMap(_gameId);
  return icons && icons[_playerName.length % icons.length];
};

export { getPlayerIcon };
