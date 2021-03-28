import { getGameId } from "./games";
import { hexToUtf16 } from "./hex";

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
    // Fix for DRAGON BALL FighterZ
    _room.contentId === "0100a250097f0000"
  ) {
    return [];
  }
  return _room.nodes.map(({ playerName, userName }) =>
    userName && playerName !== userName
      ? `${playerName} (${userName})`
      : playerName
  );
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
        const header = data.split("0000000400")[0];
        const code =
          header?.length > 44 // 44: unlocked ; 60: locked
            ? `${header.charAt(45)}${header.charAt(49)}${header.charAt(
                53
              )}${header.charAt(57)}`
            : undefined;
        if (code) {
          return { code };
        }
        return undefined;
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
      let data = _room.advertiseData.split("0000000400");
      if (data.length === 4) {
        // MONSTER HUNTER RISE
        _room.contentId = "0100b04011742000";
        const players = data[1];
        const newNodes = [];
        let index = 0;
        let cursor = 0;
        do {
          const readingSize = parseInt(players.substr(cursor, 2), "16") * 2;
          if (!Number.isNaN(readingSize) && readingSize > 0) {
            cursor += 2;
            const playerName = hexToUtf16(
              `${players.substr(cursor, readingSize)}0000`
            );
            cursor += readingSize + 2;
            newNodes.push({
              playerName,
              userName: _room.nodes[index].playerName
            });
          } else {
            cursor = -1;
          }
          index++;
        } while (cursor !== -1);
        _room.nodes = newNodes;
        const hostPlayerName = newNodes[0].playerName;
        if (hostPlayerName !== _room.hostPlayerName) {
          _room.hostPlayerName = `${hostPlayerName} (${_room.hostPlayerName})`;
        }
      }
    }
  }
  return _room;
};

export { getHostPlayerName, getPlayers, getAdvertiseData, sanitizeData };
