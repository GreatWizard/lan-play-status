import { getGameId } from "./games";
import { hexToUtf8, hexToUtf16, hexToAscii, hexToInt } from "./hex";

const getHostPlayerName = _room => {
  let hostPlayerName = _room.hostPlayerName;
  if (
    // Fix for DRAGON BALL FighterZ
    _room.contentId === "0100a250097f0000" &&
    hostPlayerName === "DBFighter"
  ) {
    return undefined;
  }
  return hostPlayerName;
};

const getPlayers = _room => {
  if (
    // DRAGON BALL FighterZ
    _room.contentId === "0100a250097f0000" ||
    // Rocket League
    _room.contentId === "01005ee0036ec000"
  ) {
    return [];
  }
  if (
    // MONSTER HUNTER RISE
    _room.contentId === "0100b04011742000"
  ) {
    return _room.nodes.map(
      ({ characterName, rank }) => `${characterName} (HR${rank})`
    );
  }
  return _room.nodes.map(({ playerName }) => playerName);
};

const AdvertiseDataMap = _gameId => {
  switch (_gameId) {
    // Animal Crossing: New Horizons
    case "01006f8002326000":
      return data => {
        const island = hexToUtf16(data.slice(28 * 2));
        const code = data.charAt(557) === "1";
        return {
          island,
          code
        };
      };
    // Minecraft
    case "0100d71004694000":
      return data => {
        const world = hexToUtf8(data.slice(96));
        const version = hexToUtf8(data.slice(320));
        return {
          world,
          version
        };
      };
    // Rocket League
    case "01005ee0036ec000":
      return data => {
        let json = JSON.parse(hexToAscii(data));
        let map = json.ServerMap.toLowerCase();
        if (map.startsWith("park_")) {
          json.ServerMap = "Beckwith Park";
        } else if (map.startsWith("eurostadium_")) {
          json.ServerMap = "Mannfield";
        } else if (map.startsWith("stadium_")) {
          json.ServerMap = "DFH Stadium";
        } else if (map.startsWith("trainstation_")) {
          json.ServerMap = "Urban Central";
        } else if (map.startsWith("utopiastadium_")) {
          json.ServerMap = "Utopia Coliseum";
        } else if (map.startsWith("wasteland_")) {
          json.ServerMap = "Wasteland";
        } else if (map.startsWith("neotokyo_")) {
          json.ServerMap = "Neo Tokyo";
        } else if (map.startsWith("hoopsstadium_")) {
          json.ServerMap = "Dunk House";
        } else if (map.startsWith("labs_circlepillars_")) {
          json.ServerMap = "Pillars (Rocket Labs)";
        } else if (map.startsWith("labs_cosmic_")) {
          json.ServerMap = "Cosmic (Rocket Labs)";
        } else if (map.startsWith("labs_doublegoal_")) {
          json.ServerMap = "Double Goal (Rocket Labs)";
        } else if (map.startsWith("labs_underpass_v0_")) {
          json.ServerMap = "Underpass (Rocket Labs)";
        } else if (map.startsWith("labs_underpass_")) {
          json.ServerMap = "Underpass V0 (Rocket Labs)";
        } else if (map.startsWith("labs_utopia_")) {
          json.ServerMap = "Utopia Retro (Rocket Labs)";
        } else if (map.startsWith("test_volleyball")) {
          json.ServerMap = "Test Volleyball";
        } else if (map.startsWith("tutorialtest")) {
          json.ServerMap = "Basic Tutorial";
        } else if (map.startsWith("tutorialadvanced")) {
          json.ServerMap = "Advanced Tutorial";
        } else if (map.startsWith("underwater_")) {
          json.ServerMap = "Aquadome";
        } else if (map.startsWith("arc_")) {
          json.ServerMap = "Starbase ARC";
        }
        if (map.startsWith("park_") && map.endsWith("_night_p")) {
          json.ServerMap += " (Midnight)";
        } else if (map.endsWith("_night_p")) {
          json.ServerMap += " (Night)";
        } else if (map.endsWith("_rainy_p") || map.endsWith("_foggy_p")) {
          json.ServerMap += " (Stormy)";
        } else if (map.endsWith("_winter_p") || map.endsWith("_snowy_p")) {
          json.ServerMap += " (Snowy)";
        } else if (map.endsWith("_dawn_p")) {
          json.ServerMap += " (Dawn)";
        }
        //
        return json;
      };
    case "0100b04011742000":
      return data => {
        const [header, , ranks, user] = data.split("00000004");
        let result = { rank: hexToInt(ranks.substr(0, 4)) };
        if (header?.length > 44) {
          // 44: unlocked ; 60: locked
          result.code = `${header.charAt(45)}${header.charAt(
            49
          )}${header.charAt(53)}${header.charAt(57)}`;
        }
        let userData = user.split("0d");
        if (userData.length === 2) {
          result.userId = hexToUtf8(userData[1]);
        }
        return result;
      };
    default:
      return () => undefined;
  }
};

const getAdvertiseData = _room => {
  let { contentId, advertiseData } = _room;
  let gameId = getGameId(contentId);
  return AdvertiseDataMap(gameId)(advertiseData);
};

const sanitizeData = _room => {
  if (_room.contentId === "ffffffffffffffff") {
    if (_room.advertiseData === "ffff0000") {
      // DRAGON BALL FighterZ
      _room.contentId = "0100a250097f0000";
    } else if (
      _room.advertiseData.startsWith("7b") &&
      _room.advertiseData.endsWith("7d")
    ) {
      // Rocket League
      _room.contentId = "01005ee0036ec000";
      const json = JSON.parse(hexToAscii(_room.advertiseData));
      _room.hostPlayerName = json.OwnerName;
    } else if (
      _room.advertiseData.split("00000004")[0].includes("0000000008100000") &&
      _room.advertiseData.split("00000004")[0].includes("8b9000")
    ) {
      let data = _room.advertiseData.split("00000004");
      // MONSTER HUNTER RISE
      _room.contentId = "0100b04011742000";
      const players = data[1];
      const ranks = data[2];
      const newNodes = [];
      let index = 0;
      let cursor = 0;
      do {
        const readingSize = hexToInt(players.substr(cursor, 4)) * 2;
        if (!Number.isNaN(readingSize) && readingSize > 0) {
          cursor += 4;
          const characterName = hexToUtf16(
            `${players.substr(cursor, readingSize)}0000`
          );
          cursor += readingSize;
          newNodes.push({
            playerName: _room.nodes[index].playerName,
            characterName,
            rank: hexToInt(ranks.substr(index * 4, 4))
          });
        } else {
          cursor = -1;
        }
        index++;
      } while (cursor !== -1);
      _room.nodes = newNodes;
      const hostCharacterName = newNodes[0].characterName;
      if (hostCharacterName !== _room.hostPlayerName) {
        _room.hostPlayerName = `${hostCharacterName} (${_room.hostPlayerName})`;
      }
    } else if (
      _room.advertiseData.split("00000004")[0].includes("0000000008100000") &&
      _room.advertiseData.split("00000004")[0].includes("0a0000")
    ) {
      // Monster Hunter Stories 2: Wings of Ruin
      _room.contentId = "0100e21011446000";
    } else {
      // Minecraft
      let name = undefined;
      try {
        name = hexToUtf8(_room.advertiseData.slice(32));
      } catch (e) {
        name = undefined;
      }
      if (name === _room.hostPlayerName) {
        _room.contentId = "0100d71004694000";
      }
    }
  }
  return _room;
};

export { getHostPlayerName, getPlayers, getAdvertiseData, sanitizeData };
