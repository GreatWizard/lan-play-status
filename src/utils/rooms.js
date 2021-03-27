import { getGameId } from "./games";

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
  return _room.nodes.map(({ playerName }) => playerName);
};

const AdvertiseDataMap = _gameId => {
  switch (_gameId) {
    // Animal Crossing: New Horizons
    case "01006f8002326000":
      return data => {
        const islandBin = fromHex(data).slice(28);
        const code = data.charAt(557) === "1";
        return {
          island: decodeUtf16(islandBin),
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
            : "";
        return {
          code
        };
      };
    default:
      return () => undefined;
  }
};

const decodeUtf16 = data => {
  const decoder = new TextDecoder("utf-16");
  const u16 = new Uint16Array(data);
  const cut = u16.findIndex(i => i === 0);
  return decoder.decode(data.slice(0, cut * 2));
};

const fromHex = hex => {
  const buf = hex.match(/[0-9a-fA-F]{2}/gi);
  if (!buf) {
    throw new Error("Wrong hex");
  }
  return new Uint8Array(buf.map(h => parseInt(h, 16))).buffer;
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
        const hostPlayer = data[1].split("0000")[0] + "0000";
        const hostPlayerName = decodeUtf16(
          fromHex(hostPlayer.slice(2, hostPlayer.length - 2) + "0000")
        );
        _room.hostPlayerName = `${hostPlayerName} (${_room.hostPlayerName})`;
      }
    }
  }
  return _room;
};

export { getHostPlayerName, getPlayers, getAdvertiseData, sanitizeData };
