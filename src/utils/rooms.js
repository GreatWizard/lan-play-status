import { getGameId } from "./games";
import { hexToUtf8, hexToUtf16, hexToInt } from "./hex";

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
    _room.contentId === "0100a250097f0000"
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
    // MONSTER HUNTER RISE
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
    } else {
      let data = _room.advertiseData.split("00000004");
      if (data[0].includes("4f2818b9000")) {
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
      }
    }
  }
  return _room;
};

export { getHostPlayerName, getPlayers, getAdvertiseData, sanitizeData };
